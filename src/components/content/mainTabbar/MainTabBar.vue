<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="skyblue">
        <img slot="item-icon" src="~assets/img/tabbar/shouye.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shouye1.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="skyblue">
        <img slot="item-icon" src="~assets/img/tabbar/huodong.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/huodong1.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="skyblue">
        <img slot="item-icon" src="~assets/img/tabbar/car.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/car1.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="skyblue">
        <img slot="item-icon" src="~assets/img/tabbar/wode.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/wode1.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
