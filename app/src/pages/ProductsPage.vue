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
              @input="
                editProductName({ id: product.id, name: $event.target.value })
              "
              type="text"
              placeholder="Имя"
            />
          </div>
          <div>
            <div><strong>Цена продукта: </strong>{{ product.price }}</div>
            <input
              :value="product.price"
              @input="
                editProductPrice({ id: product.id, price: $event.target.value })
              "
              type="number"
              placeholder="Цена"
            />
          </div>

          <div class="payer">
            <select
              name="payer"
              class="form-select"
              @change="
                e =>
                  editProductPayer({
                    id: product.id,
                    payer: +e.target.value
                  })
              "
              :value="product.payer"
            >
              <option
                v-for="person in persons"
                :key="person.id"
                :value="person.id"
              >
                {{ person.name }}
              </option>
            </select>

            <strong>payer: {{ product.payer }}</strong>
          </div>

          <div class="consumers">
            <div
              class="not_selected"
              :class="{ selected: product.consumers.length === persons.length }"
              @click="
                toggleAllConsumers({
                  id: product.id,
                  persons: persons
                })
              "
              checked
            >
              ALL
            </div>
            <div v-for="person in persons" :key="person.id">
              <div
                class="not_selected"
                :class="{
                  selected: product.consumers.includes(person.id)
                }"
                @click="toggleConsumer({ id: product.id, person: person.id })"
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
import { mapState, mapMutations, mapActions } from 'vuex';
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
    ...mapMutations({
      editPayer: 'product/editPayer'
    }),
    goToResultsPage(event) {
      this.$router.push('/results');
    }
  },
  computed: {
    ...mapState({
      products: state => state.product.products,
      persons: state => state.person.persons
    })
  },
  mounted() {
    this.products.forEach(product => {
      this.editPayer({
        id: product.id,
        payer: this.persons[0].id
      });
    });
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
.not_selected
  background-color: pink
.selected
  background-color: teal
</style>
