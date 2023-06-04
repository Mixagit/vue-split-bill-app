<template>
  <div class="products">
    <h1>Добавление позиций меню</h1>
    <button
      type="button"
      class="btn btn-outline-primary add__btn"
      @click="createProduct"
    >
      Добавить позицию
    </button>
    <product-list :products="products" @remove="removeProduct"> </product-list>
    <button
      type="button"
      class="btn btn-outline-success"
      :class="{
        next__btn: products.length >= 1,
        'stop-next__btn': products.length < 1
      }"
      @click="goToResultsPage"
    >
      {{ nextBtnText }}
    </button>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    ProductList
  },
  data() {
    return {
      nextBtnText: 'Перейти к результатам'
    };
  },
  methods: {
    ...mapActions({
      createProduct: 'product/createProduct',
      removeProduct: 'product/removeProduct'
    }),
    goToResultsPage(event) {
      this.$router.push('/results');
    }
  },
  computed: {
    ...mapState({
      products: state => state.product.products
    })
  }
};
</script>

<style lang="sass">
.products
    display: flex
    flex-direction: column
.add__btn
    align-self: flex-start
    margin: 15px 0
.next__btn
    align-self: flex-center
    margin-top: 15px
.stop-next__btn
    align-self: flex-center
    margin-top: 15px
    color: red
</style>
