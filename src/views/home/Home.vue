<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
    <goods-list :goods="goods[currentType].list"/>
    <ul>
      <li>1</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li>5</li>
      <li>1</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li>5</li>
      <li>1</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li>5</li>
      <li>1</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li>5</li>
      <li>1</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li>5</li>
      <li>1</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li>5</li>
    </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import  HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: ''
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    // 请求商品
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**事件监听相关方法 */
    tabClick(index) {
      console.log(index)
      switch(index) {
        case 0: this.currentType = 'pop';
                break;
        case 1: this.currentType = 'new';
                Sbreak;
        case 2: this.currentType = 'sell';
                break;
      }
    },
    /**网络请求相关方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type] + 1
      getHomeGoods(type, 1).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: rgb(94, 177, 148);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
  }
</style>
