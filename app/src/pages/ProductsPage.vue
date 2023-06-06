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

    <div v-if="products.length > 0">
      <h3>Список продуктов</h3>
      <list-component>
        <div class="product" v-for="product in products" :key="product.id">
          <div>
            <div><strong>Название продукта: </strong>{{ product.name }}</div>
            <input 
              :value="product.name"
              @input="editProductName({id: product.id, name: $event.target.value})" 
              type="text" 
              placeholder="Имя" 
            />
          </div>
          <div>
            <div><strong>Цена продукта: </strong>{{ product.price }}</div>
            <input 
              :value.trim="product.price"
              @input="editProductPrice({id: product.id, price: $event.target.value})"
              type="number"
              placeholder="Цена"
            />
          </div>
      
          <div class="payer">
            <select
              :value="product.payer"
              @change="editProductPayer({id: product.id, payer: $event.target.value})"
              class="form-select"
              aria-label="Default select example"
            >
              <option v-for="person in persons" :key="person.id">
                {{ person.name }}
              </option>
            </select>
            <strong>payer: {{ product.payer }}</strong>
          </div>
      
          <div class="consumers">
            
            <div
              style="background-color: pink"
              :class="{selected: consumers.length === clients.length}"
              @click="toggleAllConsumers({id: product.id, personNames: getPersonsNames})"
              checked
            >
              ALL
            </div>
            <div v-for="person in persons" :key="person.id">
              <div
                style="background-color: teal"
                @click="toggleConsumer({id: product.id, personName: person.name})"
              >
              {{ person.name }}
              </div>
            </div>
          </div>
          <div class="product__btns">
            <button
              type="button"
              class="btn btn-outline-danger remove__btn"
              @click="removeProduct(product)"
            >
              Удалить
            </button>
          </div>
        </div>
      </list-component>

      

    </div>
    <h4 v-else style="color: red">Список людей пуст</h4>

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
import { mapState, mapActions, mapGetters } from 'vuex';
import ListComponent from '@/components/ListComponent.vue';

export default {
  components: { ListComponent },
  data() {
    return {
      nextBtnText: 'Перейти к результатам'
    };
  },
  methods: {
    ...mapActions({
      createProduct: 'product/createProduct',
      editProductName: 'product/editProductName',
      editProductPrice: 'product/editProductPrice',
      editProductPayer: 'product/editProductPayer',
      toggleConsumer: 'product/toggleConsumer',
      toggleAllConsumers: 'product/toggleAllConsumers',
      removeProduct: 'product/removeProduct'
    }),
    // toggleAllConsumers() {
    //   if (this.selectAllConsumers) {
    //     this.selectedConsumers = this.product.consumers.map(c => c.id);
    //   } else {
    //     this.selectedConsumers = [];
    //   }
    // },
    goToResultsPage(event) {
      this.$router.push('/results');
    }
  },
  computed: {
    ...mapState({
      products: state => state.product.products,
      persons: state => state.person.persons
    }),
    ...mapGetters({
      getPersonsNames: 'person/getPersonsNames'
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
  
.product
    padding: 15px
    border: 2px solid teal
    border-radius: 15px
    margin-top: 15px
    display: flex
    align-items: center
    justify-content: space-between
.remove__btn
    margin-right: 15px
</style>
