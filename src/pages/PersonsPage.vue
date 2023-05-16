<template>
    <div>
      <person-form
        @create="createPerson"
      >
      </person-form>
      <person-list 
        :persons="persons"
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
      }
    },
    methods: {
      createPerson(person) {
        this.persons.push(person);
      }
    }
  }
  </script>
  
  <style>

  </style>
  