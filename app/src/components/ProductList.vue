<template>
  
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  components: {
    ProductItem
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped lang="sass">
.product-list-item
    display: inline-block
    margin-right: 10px
.product-list-enter-active,
.product-list-leave-active
    transition: all 0.4s ease
.product-list-enter-from,
.product-list-leave-to
    opacity: 0
    transform: translateX(130px)
</style>
