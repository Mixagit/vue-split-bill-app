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
        <person-list 
            :persons="persons"
            @remove="removePerson"
        >
        </person-list>
        <button
        type="button" 
            class="btn btn-outline-success"
            :class="{ 
                'next__btn': persons.length >= 2,
                'stop-next__btn': persons.length < 2
            }"
            @click="goToProductsPage"
        >
            {{ nextBtnText }}
        </button>
    </div>
</template>
  
<script>
    import PersonList from "@/components/PersonList.vue";

    export default {
    components: {
        PersonList
    },
    data() {
        return {
            persons: [
                    {id: 1, name: 'Vasya'},
                    {id: 2, name: 'Ivan'},
                    {id: 3, name: 'Sanya'}
            ],
            nextBtnText: 'Перейти к добавлению позиций в меню'
        }
    },
    methods: {
        createPerson() {
            const person = {
                id: Date.now(),
                name: ''
            }
            this.persons.push(person);
        },
        removePerson(person) {
            this.persons = this.persons.filter(p => p.id !== person.id)
        },
        goToProductsPage(event) {
            if (this.persons.length >= 2) {
                this.$router.push('/products')
            } else if (this.persons.length === 0){ 
                this.nextBtnText = 'Но тут же никого нет!';
                const msgCounter = setTimeout(() => {
                    this.nextBtnText = 'Перейти к добавлению позиций в меню';
                    clearTimeout(msgCounter)
                }, 2500);
            } else {
                this.nextBtnText = 'Добавьте еще кого-нибудь';
                const msgCounter = setTimeout(() => {
                    this.nextBtnText = 'Перейти к добавлению позиций в меню';
                    clearTimeout(msgCounter)
                }, 2500);
            }
            
        }
    }
}
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
</style>
