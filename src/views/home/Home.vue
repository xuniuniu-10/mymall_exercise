<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" 
    ref="tabControl1" class="tab-control1" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 组件不能直接进行点击 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import  HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'


export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
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
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  mixins:[itemListenerMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)
    // 取消全局事件的监听
    // this.$bus.$off('itemImageLoad', )
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    // 请求商品
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  // mounted() {
  //   // const refresh = this.debounce(this.$refs.scroll.refresh, 200)
  //   const refresh = debounce(this.$refs.scroll.refresh, 200)
  //   // 监听item中的图片加载
  //   this.$bus.$on('homeitemImageLoad', () => {
  //     refresh()
  //   })
  //  console.log('123')  //只执行了一次
  // },
  mounted() {},
  methods: {
    /**事件监听相关方法 */
    // 防抖
    // debounce(func, delay) {
    //   let timer = null
    //   return function (...args) {
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },
    tabClick(index) {
      // console.log(index)
      switch(index) {
        case 0: this.currentType = 'pop'
                break;
        case 1: this.currentType = 'new'
                break;
        case 2: this.currentType = 'sell'
                break;
      }
      // console.log(this.currentType)
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      // 判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      // this.scroll.scroll.refresh()
    },
    swiperImageLoad() {// 组件没有offsetTop
      // 所有的组件都有一个属性$el, 用于获取组件的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // 轮播图加载完成之后的offsetTop是比较正确的,且只需要发送一次
    },
    /**网络请求相关方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* position: relative; */
    height: 100vh;
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
  .content {
    /* overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }
  /* .fiexd {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } 行不通*/
  .tab-control1 {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 10;
  }
</style>
