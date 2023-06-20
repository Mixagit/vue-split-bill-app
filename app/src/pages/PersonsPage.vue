<template>
    <div class="container">
        <h1 class="header">Добавление людей</h1>
        <button type="button" class="btn add__btn" @click="add">
            <i class="bi bi-person-fill-add"></i>
            Добавить человека
        </button>

        <div v-if="persons.length > 0" class="list">
            <h3>Список людей</h3>
            <list-component>
                <div class="item" v-for="person in persons" :key="person.id">
                    <div class="name">
                        <Avatar :name="person.name" class="avatar" />
                        <input
                            v-focus
                            :value="person.name"
                            @input="handleNameChange($event, person)"
                            type="text"
                            placeholder="Введите имя..."
                            class="input"
                            id="input"
                        />
                        <i class="bi bi-pencil-fill hidden__btn"></i>
                        <error-hint
                            :errors="nameErrors"
                            :itemId="person.id"
                            class="error__hint"
                            >Введите имя этому человеку!</error-hint
                        >
                    </div>
                    <button
                        type="button"
                        class="btn remove__btn hidden__btn"
                        @click="removePerson(person)"
                    >
                        Удалить
                    </button>
                </div>
            </list-component>
        </div>
        <div v-else class="empty__list">
            <h4>Список людей пуст</h4>
            <p>
                Вы можете добавить людей, которые есть в вашем чеке по кнопке
                выше
            </p>
        </div>

        <button
            type="button"
            class="btn next__btn"
            :class="{ disabledNextBtn: isDisabledNextBtn }"
            @click="goToProductsPages"
        >
            {{ nextButtonText }}
        </button>
    </div>
</template>

<script>
import { nextTick } from "vue";
import { mapState, mapActions } from "vuex";
import ListComponent from "@/components/ListComponent.vue";
import Avatar from "@/components/Avatar.vue";
import ErrorHint from "@/components/ErrorHint.vue";

export default {
    components: { ListComponent, Avatar, ErrorHint },
    data() {
        return {
            nameErrors: [],
            isDisabledNextBtn: false,
            nextButtonText: "Перейти к добавлению позиций в меню",
        };
    },
    computed: {
        ...mapState({
            persons: (state) => state.person.persons,
        }),
    },
    methods: {
        ...mapActions({
            createPerson: "person/createPerson",
            editPerson: "person/editPerson",
            removePerson: "person/removePerson",
        }),
        add() {
            this.createPerson();
            nextTick(() => {
                const list = this.$el.querySelector(".list");
                list.scrollTop = 0;
            });
        },
        handleNameChange(event, person) {
            this.editPerson({
                id: person.id,
                name: event.target.value,
            });
            let index = person.id;
            if (person.name === "") {
                if (!this.nameErrors.includes(index)) {
                    this.nameErrors.push(index); // добавляем индекс клиента в массив ошибок
                }
            } else {
                this.nameErrors = this.nameErrors.filter(
                    (errorIndex) => errorIndex !== index
                ); // удаляем индекс клиента из массива ошибок
            }
        },
        goToProductsPages() {
            if (this.persons.some((person) => person.name === "")) {
                this.isDisabledNextBtn = true;
                this.nextButtonText = "Заполните пустые имена";
                setTimeout(() => {
                    this.isDisabledNextBtn = false;
                    this.nextButtonText = "Перейти к добавлению позиций в меню";
                }, 2000);
                this.persons.forEach((person) => {
                    if (person.name === "") {
                        this.nameErrors.push(person.id);
                    }
                });
            }
            if (this.persons.length < 2) {
                this.isDisabledNextBtn = true;
                this.nextButtonText = this.persons.length
                    ? "Добавьте еще кого-нибудь"
                    : "Но тут же никого нет!";
                setTimeout(() => {
                    this.isDisabledNextBtn = false;
                    this.nextButtonText = "Перейти к добавлению позиций в меню";
                }, 2000);
            } else if (this.nameErrors.length > 0) {
                setTimeout(() => {
                    this.nameErrors = [];
                }, 2000);
            } else {
                this.$router.push("/products");
            }
        },
    },
    mounted() {
        nextTick(() => {
            const list = this.$el.querySelector(".list");
            if (list) list.scrollTop = 0;
        });
    },
};
</script>

<style scoped lang="sass">
@import "@/styles/variables.sass"

.item
    display: flex
    align-items: center
    .input
        margin: auto
        margin-left: 15px
        flex: 1
    .remove__btn
        margin: auto
.name
    display: flex
    justify-content: space-between
    .avatar
        margin: auto
        width: 70px
    .error__hint
        margin: auto
        margin-left: 15px
</style>
