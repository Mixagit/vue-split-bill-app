<template>
  <div class="container">
    <h1 class="header">Результаты</h1>
    <div>
      <h2>Суммарные расходы на еду:</h2>
      <ul>
        <li v-for="person in persons" :key="person.id">
          {{ person.name }}: Наел:
          {{ calculateTotalPersonEaten(person.id) }} Потратил:
          {{ calculateTotalPersonExpenses(person.id) }}
        </li>
      </ul>
      <button @click="calcWhoOwesWhom">oru</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
        const totalExpenses = this.calculateTotalPersonExpenses(person.id);
        const totalEaten = this.calculateTotalPersonEaten(person.id);
        if (totalExpenses > totalEaten) {
          debtorList.push({
            id: person.name,
            balance: totalExpenses - totalEaten
          });
        } else if (totalEaten > totalExpenses) {
          owedList.push({
            id: person.name,
            balance: totalEaten - totalExpenses
          });
        }
      });

      return { debtorList, owedList };
    },
    calcWhoOwesWhom() {
      const debtorList = [];
      const owedList = [];
      this.persons.forEach(person => {
        const totalExpenses = this.calculateTotalPersonExpenses(person.id);
        const totalEaten = this.calculateTotalPersonEaten(person.id);
        if (totalExpenses > totalEaten) {
          debtorList.push({
            id: person.name,
            balance: totalExpenses - totalEaten
          });
        } else if (totalEaten > totalExpenses) {
          owedList.push({
            id: person.name,
            balance: totalEaten - totalExpenses
          });
        }
      });

      while (debtorList.length > 0 || owedList.length > 0) {
        const owed = owedList[0];
        const debtor = debtorList[0];
        if (owed.balance < debtor.balance) {
          console.log(owed.id, 'должен', debtor.id, ' - ', owed.balance);
          debtor.balance -= owed.balance;
          owedList.shift();
        } else if (owed.balance > debtor.balance) {
          console.log(owed.id, 'должен', debtor.id, ' - ', debtor.balance);
          owed.balance -= debtor.balance;
          debtorList.shift();
        } else if (owed.balance === debtor.balance) {
          console.log(owed.id, 'должен', debtor.id, ' - ', debtor.balance);
          owedList.shift();
          debtorList.shift();
        }
      }
    }
  }
};
</script>

<style lang="sass"></style>
