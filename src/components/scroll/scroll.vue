<template>
    <ul v-i-scroll="loadMore">
      <li v-for="item in list">
        {{item.name}}
      </li>
    </ul>
</template>

<script>
  import IScoll from './directive/index';
  import Vue from 'vue'
  Vue.use(IScoll)
    export default {
        name: "scroll",
        data(){
          return {
            list: [
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
              {name:'666'},
            ]
          }
        },
      directives: {

      },
      methods: {
        loadMore(){
          console.log(66666666666)
        }
      }
    }
</script>

<style scoped>
  ul{
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    height:300px;
    overflow: auto;
    background: #4caf50;
  }
  li{
    width:100%;
    list-style: none;
    border-bottom: 1px solid #000;
    margin: 0;
    padding:0;
    height:50px;
  }
  li:first-child{
    border-top:1px solid #000;
  }
</style>
