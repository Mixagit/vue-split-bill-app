<template>
  
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      
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
