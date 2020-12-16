<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="left"  class="back" @click="backClick">
        <img src="~assets/img/fanhui.png" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" @click="titleClick(index)" :class="{active: currentIndex === index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
    },
    backClick () {
      this.$router.back()
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
 .title {
   display: flex;
 }
 .title-item {
   flex: 1;
 }
 .title-item.active {
   color: greenyellow;
 }
 .back img{
   width: 35px;
   height: 35px;
   margin-top: 5px;
 }
</style>