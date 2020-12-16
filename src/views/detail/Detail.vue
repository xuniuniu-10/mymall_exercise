
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll" :probe-type="3"  @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramsInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends" class="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
  name: 'Detail',
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: null,
      isShowBackTop: false,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends:[]
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    BackTop,
    GoodsList
  },
  created() {
    this.iid = this.$route.params.id
    // 根据iid请求数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 获取参数信息
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  // mounted() {
  //   // const refresh = this.debounce(this.$refs.scroll.refresh, 200)
  //   const refresh = debounce(this.$refs.scroll.refresh, 200)
  //   // 监听item中的图片加载
  //   this.$bus.$on('detailitemImageLoad', () => {
  //     refresh()
  //   })
  // },
  mounted() {
  },
  methods: {
    imageLoad() {
      // this.$refs.scroll.refresh()
      // 在以上的基础上作防抖操作
      this.newRefresh()
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      // 判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
    },
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;  /**100%的视口高度 */
  }
  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
  .recommend {
    margin-top: 10px;
  }
</style>