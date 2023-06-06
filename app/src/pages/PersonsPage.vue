<template>
  <div class="persons">
    <h1>Добавление людей</h1>
    <button
      type="button"
      class="btn btn-outline-primary add__btn"
      @click="createPerson"
    >
      Добавить человека
    </button>

    <div v-if="persons.length > 0">
      <h3>Список людей</h3>
      <list-component>
        <div class="person" v-for="person in persons" :key="person.id">
          <div>
            <div><strong>Имя человека: </strong>{{ person.name }}</div>
            <input
              :value="person.name"
              @input="editPerson({id: person.id, name: $event.target.value})"
              type="text" 
              placeholder="Введите имя..." 
              />
          </div>
          <div class="person__btns">
            <button
              type="button"
              class="btn btn-outline-danger remove__btn"
              @click="removePerson(person)"
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
        class="btn btn-outline-success next__btn"
        :class="{ disabledNextBtn: isDisabledNextBtn }"
        @click="goToProductsPages"
      >
        {{ nextButtonText }}
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
      personName: '',
      personId: null,
      isDisabledNextBtn: false,
      nextButtonText: 'Перейти к добавлению позиций в меню'
    };
  },
  methods: {
    ...mapMutations({
      setPersonName: 'person/setPersonName'
    }),
    ...mapActions({
      createPerson: 'person/createPerson',
      editPerson: 'person/editPerson',
      removePerson: 'person/removePerson'
    }),
    goToProductsPages() {
      if (this.persons.length < 2){
        this.isDisabledNextBtn = true
        this.nextButtonText = this.persons.length 
                ? 'Добавьте еще кого-нибудь' : 'Но тут же никого нет!';
        setTimeout(() => {
          this.isDisabledNextBtn = false
          this.nextButtonText = 'Перейти к добавлению позиций в меню'
        }, 2000);
      } else {
        this.$router.push('/products');
      }
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
.persons
    display: flex
    flex-direction: column
.add__btn
    align-self: flex-start
    margin: 15px 0
.next__btn
    align-self: flex-center
    margin-top: 15px
.disabledNextBtn
    color: red
.person
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
