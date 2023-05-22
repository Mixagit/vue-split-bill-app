<template>
    <div>
        <h1>Страница с персонами</h1>
        <my-button
            class="add__btn" 
            @click="dialogVisible = true"
            >
            Добавить пользователя
        </my-button>
        <my-dialog 
            v-model:show="dialogVisible"
        >
            <person-form
                @create="createPerson"
            >
            </person-form>
        </my-dialog>
      
      <person-list 
        :persons="persons"
        @remove="removePerson"
      >
      </person-list>
      
    </div>
</template>
  
<script>
import PersonForm from "@/components/PersonForm.vue";
import PersonList from "@/components/PersonList.vue";

export default {
components: {
    PersonForm, PersonList
},
data() {
    return {
    persons: [
        {id: 1, name: 'Vasya'},
        {id: 2, name: 'Ivan'},
        {id: 3, name: 'Sanya'}
    ],
    dialogVisible: false,
    }
},
methods: {
    createPerson(person) {
    this.persons.push(person);
    this.dialogVisible = false;
    },
    removePerson(person) {
    this.persons = this.persons.filter(p => p.id !== person.id)
    }
}
}
</script>

<style>
.add__btn {
    margin: 15px 0;
}
</style>
