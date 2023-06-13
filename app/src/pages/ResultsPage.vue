<template>
  <div class="results">
    <h1>Результаты</h1>
    <div>
      <h2>Суммарные расходы на еду:</h2>
      <ul>
        <li v-for="person in persons" :key="person.id">
          {{ person.name }}: Наел:
          {{ calculateTotalPersonEaten(person.id) }} Потратил:
          {{ calculateTotalPersonExpenses(person.id) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState({
      products: state => state.product.products,
      persons: state => state.person.persons
    })
  },
  methods: {
    calculateTotalPersonEaten(personId) {
      let totalPersonCost = 0;
      this.products.forEach(product => {
        if (product.consumers.includes(personId)) {
          totalPersonCost += product.price / product.consumers.length;
        }
      });
      return totalPersonCost;
    },
    calculateTotalPersonExpenses(personId) {
      let sum = 0;
      this.products.forEach(product => {
        if (product.payer === personId) {
          sum += product.price;
        }
      });
      return sum;
    },
    createQueues() {
      const debtorList = [];
      const owedList = [];

      this.persons.forEach(person => {
        const totalExpenses = calculateTotalPersonExpenses(person.id);
        const totalEaten = calculateTotalPersonEaten(person.id);
        if (totalExpenses > totalEaten) {
          debtorList.push({
            id: person.id,
            balance: totalExpenses - totalEaten
          });
        } else {
          owedList.push({
            id: person.id,
            balance: totalExpenses - totalEaten
          });
        }
      });

      return { debtorList, owedList };
    },
    calcWhoOwesWhom(debtorList, owedList) {
      const owed = owedList.pop();
      owedList.forEach(owed => {});
    }
  }
};
</script>

<style lang="sass"></style>
