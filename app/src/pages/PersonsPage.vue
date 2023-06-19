<template>
    <div class="container">
        <h1 class="header">Добавление людей</h1>
        <button
            type="button"
            class="btn btn-outline-primary add__btn"
            @click="createPerson"
        >
            <i class="bi bi-person-fill-add"></i>
            Добавить человека
        </button>

        <div v-if="persons.length > 0" class="list">
            <h3>Список людей</h3>
            <list-component>
                <div class="item" v-for="person in persons" :key="person.id">
                    <div class="name">
                        <input
                            :value="person.name"
                            @input="handleNameChange($event, person)"
                            type="text"
                            placeholder="Введите имя..."
                            class="input"
                        />
                        <i
                            class="bi bi-pencil-fill edit_icon hidden__btn"
                            @click.native="focusInput"
                        ></i>
                        <error-hint :errors="nameErrors" :itemId="person.id"
                            >Введите имя этому человеку!</error-hint
                        >
                    </div>
                    <button
                        type="button"
                        class="btn btn-outline-danger remove__btn hidden__btn"
                        @click="removePerson(person)"
                    >
                        Удалить
                    </button>
                </div>
            </list-component>
        </div>
        <h4 v-else class="empty__list">Список людей пуст</h4>

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
import { mapState, mapActions } from 'vuex';
import ListComponent from '@/components/ListComponent.vue';
import ErrorHint from '@/components/ErrorHint.vue';

export default {
    components: { ListComponent, ErrorHint },
    data() {
        return {
            nameErrors: [],
            isDisabledNextBtn: false,
            nextButtonText: 'Перейти к добавлению позиций в меню'
        };
    },
    computed: {
        ...mapState({
            persons: state => state.person.persons
        })
    },
    methods: {
        ...mapActions({
            createPerson: 'person/createPerson',
            editPerson: 'person/editPerson',
            removePerson: 'person/removePerson'
        }),
        focusInput() {
            this.$nextTick(() => {
                this.$refs.myInput.focus();
            });
        },
        handleNameChange(event, person) {
            this.editPerson({
                id: person.id,
                name: event.target.value
            });
            let index = person.id;
            if (person.name === '') {
                if (!this.nameErrors.includes(index)) {
                    this.nameErrors.push(index); // добавляем индекс клиента в массив ошибок
                }
            } else {
                this.nameErrors = this.nameErrors.filter(
                    errorIndex => errorIndex !== index
                ); // удаляем индекс клиента из массива ошибок
            }
        },
        goToProductsPages() {
            if (this.persons.some(person => person.name === '')) {
                this.persons.forEach(person => {
                    if (person.name === '') {
                        this.nameErrors.push(person.id);
                    }
                });
            }
            if (this.persons.length < 2) {
                this.isDisabledNextBtn = true;
                this.nextButtonText = this.persons.length
                    ? 'Добавьте еще кого-нибудь'
                    : 'Но тут же никого нет!';
                setTimeout(() => {
                    this.isDisabledNextBtn = false;
                    this.nextButtonText = 'Перейти к добавлению позиций в меню';
                }, 2000);
            } else if (this.nameErrors.length > 0) {
                setTimeout(() => {
                    this.nameErrors = [];
                }, 2000);
            } else {
                this.$router.push('/products');
            }
        }
    }
};
</script>

<style scoped lang="sass">
@import "@/styles/variables.sass"
.container
    background-color: $color-secondary
    width: 90%
    height: 80vh
    overflow: hidden
    margin: auto
    border: 2px solid $color-text
    border-radius: 10px
    box-shadow: 0 2px 4px 5px rgba(0, 0, 0, 0.3)
    padding: 20px
    display: flex
    flex-direction: column
.header
    margin: 10px auto
.add__btn
    margin: 10px auto
    color: $color-text
    border: 1px solid $color-text
    &:hover
        background-color: $color-active
        color: white
    i
        margin-top: 0px
        margin-right: 10px
.input
    border: 2px solid $color-text
    border-radius: 10px
    padding: 10px 15px
.empty__list
    color: $color-alarm
.next__btn
    margin: auto
    margin-top: 15px
    background-color: $color-main
    color: $color-text
    border: 1px solid $color-text
    &:hover
        background-color: $color-active
        color: white
.edit_icon
    margin-left: 5px
.disabledNextBtn
    background-color: $color-alarm
    color: white
    animation: shake 0.3s infinite
    &:hover
        background-color: $color-alarm

@keyframes shake
    0%
        transform: translateX(0)
    25%
        transform: translateX(-5px)
    50%
        transform: translateX(5px)
    75%
        transform: translateX(-5px)
    100%
        transform: translateX(0)
.list
    flex: 1
    overflow: auto
    overflow-x: hidden
    padding-right: 10px
    scrollbar-width: thin
    scrollbar-color: #999999 #f5f5f5
.list::-webkit-scrollbar
    width: 10px
.list::-webkit-scrollbar-track
    background: transparent
.list::-webkit-scrollbar-thumb
    background: $color-main
    border: 2px solid transparent
    background-clip: padding-box
    border-radius: 6px
    &:hover
        background: $color-main
        border: none
    &:active
        background: $color-main

.item
    padding: 15px
    border: 2px solid $color-text
    border-radius: 10px
    margin-top: 15px
    display: flex
    align-items: center
    justify-content: space-between

    &:hover .hidden__btn
        opacity: 1
.hidden__btn
    opacity: 0
    transition: opacity 0.3s ease
.remove__btn
    margin-right: 15px
    border: 1px solid $color-alarm
    color: $color-alarm
    &:hover
        background-color: $color-alarm
</style>
