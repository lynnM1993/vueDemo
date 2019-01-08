<template>
  <mt-header :fixed="true" :title="title">
    <mt-button icon="more" @click="leftHandle" slot="left"></mt-button>
    <mt-button icon="search" slot="right">
    </mt-button>
  </mt-header>
</template>
<script>
  export default {
    name: "headerBar",
    props: {
      title: {
        type: String
      }
    },
    methods: {
      leftHandle() {
        this.$emit('leftHandle')
      }
    }
  }
</script>

<style scoped>
  .header-box {
    z-index: 9999;
    height: fit-content;
  }

</style>
