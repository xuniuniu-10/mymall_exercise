
<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    // 要将图片加载的状态告诉home.vue组件让其refresh
    // 方式一：vuex  this.$store
    // 方式二：事件总线  this.$bus  这个不存在，使用原型让其存在
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
      // if (this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeitemImageLoad')
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailitemImageLoad')
      // }
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
      // this.$router.push({
      //   path: '/detail',
      //   query: {}
      // })
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 47%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background:url("~assets/img/detail/icon03.png") 0 0/14px 14px;
  }
</style>
