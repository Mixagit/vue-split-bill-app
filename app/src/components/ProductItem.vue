<template>
  <div class="product">
    <div>
      <div><strong>Название продукта: </strong>{{ product.name }}</div>
      <my-input v-model="product.name" type="text" placeholder="Имя" />
    </div>
    <div>
      <div><strong>Цена продукта: </strong>{{ product.price }}</div>
      <my-input
        v-model.number="product.price"
        type="number"
        placeholder="Цена"
      />
    </div>

    <div class="payer">
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="product.payer"
      >
        <option v-for="person in persons" :key="person.id">
          {{ person.name }}
        </option>
      </select>
      <h1>payer: {{ product.payer }}</h1>
    </div>

    <div class="consumers">
      <div class="form-check">
        <input
          v-model="selectAll"
          @change="toggleAllCheckboxes"
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          checked
        />
        <label class="form-check-label" for="flexCheckDefault"> All </label>
      </div>
      <div class="form-check" v-for="person in persons" :key="person.id">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
        />
        <label class="form-check-label" for="flexCheckChecked">
          {{ person.name }}
        </label>
      </div>
    </div>

    <div class="product__btns">
      <button
        type="button"
        class="btn btn-outline-danger remove__btn"
        @click="$emit('remove', remove)"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      selectedPayer: null,
      selectAllConsumers: false,
      selectedConsumers: []
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleAllCheckboxes() {
      if (this.selectAll) {
        this.selectedConsumers = this.product.consumers.map(c => c.id);
      } else {
        this.selectedConsumers = [];
      }
    }
  },
  mounted() {
    if (this.persons.length > 0) {
      this.selectedPayer = this.persons[0].name;
    }
  },
  computed: {
    ...mapState({
      persons: state => state.person.persons
    })
  }
};
</script>

<style scoped lang="sass">
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
