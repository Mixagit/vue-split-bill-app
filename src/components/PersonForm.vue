<template>
    <form @submit.prevent>
        <h4>Добавить пользователя</h4>
        <my-input 
          v-focus
          v-model="person.name" 
          type="text" 
          placeholder="Имя"
        />
        <my-button 
          class="btn__create"
          @click="createPerson" 
        >
          Создать
        </my-button>
      </form>
</template>

<script>
export default {
    data() {
        return {
            person: {
                name: ''
            }, 
        }
    },
    methods: {
        createPerson() {
            this.person.id = Date.now();
            this.$emit('create', this.person);
            this.person = {
                name: ''
            }
        }
    }
}
</script>

<style scoped lang="sass">
form
    display: flex
    flex-direction: column
.btn__create
    align-self: flex-end
    margin-top: 15px
</style>