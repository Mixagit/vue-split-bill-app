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
    <div>
      <div v-if="persons.length > 0">
        <h3>Список людей</h3>
        <transition-group name="person-list">
          <div class="person" v-for="person in persons" :key="person.id">
            <div>
              <div><strong>Имя человека: </strong>{{ person.name }}</div>
              <my-input v-model="person.name" type="text" placeholder="Имя" />
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
        </transition-group>
      </div>
      <h2 v-else style="color: red">Список пользователей пуст</h2>
    </div>
    <button
      type="button"
      class="btn btn-outline-success"
      :class="{
        next__btn: persons.length >= 2,
        'stop-next__btn': persons.length < 2
      }"
      @click="goToProductsPage"
    >
      {{ nextBtnText }}
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {},
  data() {
    return {
      nextBtnText: 'Перейти к добавлению позиций в меню'
    };
  },
  methods: {
    ...mapActions({
      createPerson: 'person/createPerson',
      removePerson: 'person/removePerson'
    }),
    goToProductsPage(event) {
      if (this.persons.length >= 2) {
        this.$router.push('/products');
      } else if (this.persons.length === 0) {
        this.nextBtnText = 'Но тут же никого нет!';
        const msgCounter = setTimeout(() => {
          this.nextBtnText = 'Перейти к добавлению позиций в меню';
          clearTimeout(msgCounter);
        }, 2500);
      } else {
        this.nextBtnText = 'Добавьте еще кого-нибудь';
        const msgCounter = setTimeout(() => {
          this.nextBtnText = 'Перейти к добавлению позиций в меню';
          clearTimeout(msgCounter);
        }, 2500);
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
.stop-next__btn
    align-self: flex-center
    margin-top: 15px
    color: red
.person-list-item
    display: inline-block
    margin-right: 10px
.person-list-enter-active,
.person-list-leave-active
    transition: all 0.4s ease
.person-list-enter-from,
.person-list-leave-to
    opacity: 0
    transform: translateX(130px)
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
