//
//
// export default {
//   bind: function (el, binding, vnode) {
//     console.log(el)
//   },
//   unbind: function (el, binding, vnode) {
//
//   }
// }
import Vue from 'vue';
// el: data
const ctx = '@@InfiniteScroll';

//节流
var throttle = function(fn, delay) {
  var now, lastExec, timer, context, args; //eslint-disable-line

  var execute = function() {
    fn.apply(context, args);
    lastExec = now;
  };

  return function() {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (lastExec) {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};

// 获取scrollTop
var getScrollTop = function(element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
  }

  return element.scrollTop;
};

// 获取属性
var getComputedStyle = Vue.prototype.$isServer ? {} : document.defaultView.getComputedStyle;

// 获取事件 el target
var getScrollEventTarget = function(element) {
  var currentNode = element;
  // 元素节点存在 且 不为html或body
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    var overflowY = getComputedStyle(currentNode).overflowY;
    // 是否纵向滑动
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
};

// 获取元素高度
var getVisibleHeight = function(element) {
  // 若为window则为文档高度
  if (element === window) {
    return document.documentElement.clientHeight;
  }

  return element.clientHeight;
};

// 获取元素视图的滚动的总高度
var getElementTop = function(element) {
  if (element === window) {
    return getScrollTop(window);
  }
  return element.getBoundingClientRect().top + getScrollTop(window);
};

//
var isAttached = function(element) {
  var currentNode = element.parentNode;
  while (currentNode) {
    if (currentNode.tagName === 'HTML') {
      return true;
    }
    if (currentNode.nodeType === 11) {
      return false;
    }
    currentNode = currentNode.parentNode;
  }
  return false;
};

// bind 事件
var doBind = function() {
  // 阻止重复绑定
  if (this.binded) return; // eslint-disable-line
  this.binded = true;

  var directive = this;
  var element = directive.el;

  // 事件源
  directive.scrollEventTarget = getScrollEventTarget(element);
  directive.scrollListener = throttle(doCheck.bind(directive), 200);
  directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

  // 是否开启无限加载
  var disabledExpr = element.getAttribute('infinite-scroll-disabled');
  var disabled = false;


  if (disabledExpr) {
    // 监听是否开启无限加载
    this.vm.$watch(disabledExpr, function(value) {
      directive.disabled = value;
      if (!value && directive.immediateCheck) {
        doCheck.call(directive);
      }
    });
    // 实例中disabledExpr的值
    disabled = Boolean(directive.vm[disabledExpr]);
  }
  directive.disabled = disabled;

  // 加载距离
  var distanceExpr = element.getAttribute('infinite-scroll-distance');
  var distance = 0;
  if (distanceExpr) {
    distance = Number(directive.vm[distanceExpr] || distanceExpr);
    if (isNaN(distance)) {
      distance = 0;
    }
  }
  directive.distance = distance;

  // 检测触发加载事件
  var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
  var immediateCheck = true;
  if (immediateCheckExpr) {
    immediateCheck = Boolean(directive.vm[immediateCheckExpr]);
  }
  directive.immediateCheck = immediateCheck;

  if (immediateCheck) {
    doCheck.call(directive);
  }
  // 触发加载事件
  var eventName = element.getAttribute('infinite-scroll-listen-for-event');
  if (eventName) {
    directive.vm.$on(eventName, function() {
      doCheck.call(directive);
    });
  }
};

var doCheck = function(force) {
  // 事件元素
  var scrollEventTarget = this.scrollEventTarget;
  // 指令绑定元素
  var element = this.el;
  // 检测距离
  var distance = this.distance;
  // 检测距离
// 取消无限加载
  if (force !== true && this.disabled) return;
  // 获取scrollTop高度
  var viewportScrollTop = getScrollTop(scrollEventTarget);
  // 滚动高度加视图高度
  var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

  // 是否触发
  var shouldTrigger = false;

  if (scrollEventTarget === element) {
    //              视图滚动的总高度                 滚动高度加视图高度
    // 判断是否加载
    shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
  } else {
    var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

    shouldTrigger = viewportBottom + distance >= elementBottom;
  }

  if (shouldTrigger && this.expression) {
    this.expression();
  }
};

export default {
  bind(el, binding, vnode) {
    el[ctx] = {
      el,
      vm: vnode.context,
      expression: binding.value
    };

    const args = arguments;
    var cb = function() {
      el[ctx].vm.$nextTick(function() {
        if (isAttached(el)) {
          // 传参
          doBind.call(el[ctx], args);
        }

        el[ctx].bindTryCount = 0;

        var tryBind = function() {
          if (el[ctx].bindTryCount > 10) return; //eslint-disable-line
          el[ctx].bindTryCount++;
          if (isAttached(el)) {
            doBind.call(el[ctx], args);
          } else {
            setTimeout(tryBind, 50);
          }
        };

        tryBind();
      });
    };
    if (el[ctx].vm._isMounted) {
      cb();
      return;
    }
    el[ctx].vm.$on('hook:mounted', cb);
  },

  unbind(el) {
    if (el[ctx] && el[ctx].scrollEventTarget) {
      el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
    }
  }
};
