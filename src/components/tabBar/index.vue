<template>
  <div class="">
    <mt-tabbar v-model="tabBarSelect" fixed @input="menuChoose">
      <mt-tab-item v-for="(item,index) in menusList" :key="item.id" :id="index">
        <img slot="icon" :src="item.img">
        {{item.title}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  var homeImg = require('../../assets/images/home.png');
  var myImg = require('../../assets/images/my.png');
  var setImg = require('../../assets/images/set.png');
  var wifiImg = require('../../assets/images/wifi.png');
  var homeActiveImg = require('../../assets/images/homeActive.png');
  var myActiveImg = require('../../assets/images/myActive.png');
  var setActiveImg = require('../../assets/images/setActive.png');
  var wifiActiveImg = require('../../assets/images/wifiActive.png');
  export default {
    name: '',
    components: {},
    data() {
      return {
        tabBarSelect: 0,
        imgList: [
          {
            selected: homeActiveImg,
            notSelected: homeImg
          },
          {
            selected: myActiveImg,
            notSelected: myImg
          },
          {
            selected: setActiveImg,
            notSelected: setImg
          },
          {
            selected: wifiActiveImg,
            notSelected: wifiImg
          }
        ],
        menusList: [
          {
            img: homeActiveImg,
            title: '首页',
            id: 'home'
          },
          {
            img: myImg,
            title: '我的',
            id: 'my'
          },
          {
            img: setImg,
            title: '设置',
            id: 'set'
          },
          {
            img: wifiImg,
            title: 'wifi',
            id: 'wifi'
          }
        ]
      }
    },
    created() {
      let name = this.$route.name;
      this.menuChoose(name)
    },
    methods: {
      menuChoose(payload) {
        let indexTab
        console.log(payload)
        this.menusList.map((item, i) => {
          if (i === payload || payload === item.id) {
            item.img = this.imgList[i].selected
            indexTab = i
            this.tabBarSelect = i
          } else {
            item.img = this.imgList[i].notSelected
          }
        })
        console.log(indexTab)
        if(!!indexTab || indexTab === 0){
          this.$router.push(this.menusList[indexTab].id)
        }else {
          this.tabBarSelect = null
        }

      }
    }
  }
</script>
<style lang="sass" scoped>
</style>
