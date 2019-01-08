<template>
  <div class="side-bar-box-outer" v-if="sideBarOuter">
    <div class="mask-modal" @click.stop.prevent="maskHandle" v-show="sideBarOuter"></div>
    <div :class="{'side-bar-box':true, 'side-bar-box-action':showSideBar, 'side-box-close':!showSideBar}"
         :style="'width:'+(width/100)+'rem;'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "sideBar",
    props: {

    },
    data() {
      return {
        slideTimer: null,
        width: 0,
        animateOver: true
      }
    },
    computed: {
      ...mapGetters(['showSideBar']),
      sideBarOuter() {
        if(this.animateOver && !this.showSideBar){
          return false
        }else {
          return true
        }
      }
    },
    watch: {
      showSideBar(value) {
        this.animateShow(value)
      }
    },
    mounted(){
      this.$store.dispatch('showSideBar',false)
    },
    methods: {
      maskHandle() {
        let showSideBar = this.showSideBar;
        if(showSideBar){
          this.$store.dispatch('showSideBar');
          this.animateShow(this.showSideBar)
        }else {

        }
      },
      animateShow(value) {
        this.animateOver = false;
        let isOpen = value ? true : false;
        clearInterval(this.slideTimer);
        var width = this.width;
        this.slideTimer = setInterval(()=>{
          if(isOpen){
            width += 15
          }else {
            width -= 15
          }
          this.width = width;
          if(width <= 0 ){
            this.width = 0;
            this.animateOver = true;
            clearInterval(this.slideTimer)
          }
          if(width >= 200){
            this.width = 200;
            this.animateOver = true;
            clearInterval(this.slideTimer)
          }
        },10)
      }
    }
  }
</script>

<style lang="scss" src="./sideBar.scss" scoped>

</style>
