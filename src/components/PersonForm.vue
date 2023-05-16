<template>
    <form @submit.prevent>
        <h4>Добавить пользователя</h4>
        <input 
          v-model="person.name" 
          class="input__name" 
          type="text" 
          placeholder="Имя"
        >
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
            }
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

<style scoped>
form {
    display: flex;
    flex-direction: column;
  }
.input__name {
    width: 100%;
    border: 2px solid teal;
    border-radius: 15px;
    padding: 10px 15px;
    margin-top: 15px;
}
.btn__create {
    align-self: flex-end;
}
</style>