<template>
    <div class="container">
        <h1 class="header">Добавление позиций меню</h1>
        <button type="button" class="btn add__btn" @click="createProduct">
            <i class="bi bi-bag-plus-fill"></i>
            Добавить позицию
        </button>

        <div v-if="products.length > 0" class="list">
            <h3>Список продуктов</h3>
            <list-component>
                <div class="item" v-for="product in products" :key="product.id">
                    <div class="top__params">
                        <div class="name">
                            <input
                                v-focus
                                :value="product.name"
                                @input="handleNameChange($event, product)"
                                type="text"
                                placeholder="Введите название..."
                                class="input"
                            />
                            <i
                                class="bi bi-pencil-fill edit_icon hidden__btn"
                                @click.native="focusInput"
                            ></i>
                            <error-hint
                                :errors="nameErrors"
                                :itemId="product.id"
                                >Введите название этого продукта!</error-hint
                            >
                        </div>
                        <div class="price">
                            <input
                                :value="product.price"
                                @input="handlePriceChange($event, product)"
                                type="number"
                                placeholder="Введите цену..."
                                class="input"
                            />
                            <i
                                class="bi bi-pencil-fill edit_icon hidden__btn"
                                @click.native="focusInput"
                            ></i>
                            <error-hint
                                :errors="priceErrors"
                                :itemId="product.id"
                                >Введите цену этого продукта!</error-hint
                            >
                        </div>

                        <div class="payer">
                            <select
                                name="payer"
                                class="form-select select"
                                @change="
                                    (e) =>
                                        editProductPayer({
                                            id: product.id,
                                            payer: +e.target.value,
                                        })
                                "
                                :value="product.payer"
                            >
                                <i class="bi bi-credit-card-fill"></i>
                                <option
                                    v-for="person in persons"
                                    :key="person.id"
                                    :value="person.id"
                                >
                                    {{ person.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="consumers">
                        <div
                            class="all__circle not_selected"
                            :class="{
                                selected:
                                    product.consumers.length === persons.length,
                            }"
                            @click="
                                toggleAllConsumers({
                                    id: product.id,
                                    persons: persons,
                                })
                            "
                            checked
                        >
                            All
                        </div>
                        <div v-for="person in persons" :key="person.id">
                            <Avatar
                                :name="person.name"
                                class="avatar not_selected"
                                :class="{
                                    selected: product.consumers.includes(
                                        person.id
                                    ),
                                }"
                                @click="
                                    toggleConsumer({
                                        id: product.id,
                                        person: person.id,
                                    })
                                "
                            />
                            <div class="avatar__label">
                                {{ person.name }}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="btn remove__btn hidden__btn"
                        @click="removeProduct(product)"
                    >
                        Удалить
                    </button>
                </div>
            </list-component>
        </div>
        <h4 v-else class="empty__list">Список продуктов пуст</h4>

        <button
            type="button"
            class="btn next__btn"
            :class="{ disabledNextBtn: isDisabledNextBtn }"
            @click="goToResultsPage"
        >
            {{ nextButtonText }}
        </button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ListComponent from "@/components/ListComponent.vue";
import Avatar from "@/components/Avatar.vue";
import ErrorHint from "@/components/ErrorHint.vue";

export default {
    components: { ListComponent, Avatar, ErrorHint },
    data() {
        return {
            nameErrors: [],
            priceErrors: [],
            isDisabledNextBtn: false,
            nextButtonText: "Перейти к результатам",
        };
    },
    computed: {
        ...mapState({
            products: (state) => state.product.products,
            persons: (state) => state.person.persons,
        }),
    },
    methods: {
        ...mapActions({
            createProduct: "product/createProduct",
            editProductName: "product/editProductName",
            editProductPrice: "product/editProductPrice",
            editProductPayer: "product/editProductPayer",
            toggleConsumer: "product/toggleConsumer",
            toggleAllConsumers: "product/toggleAllConsumers",
            removeProduct: "product/removeProduct",
        }),
        ...mapMutations({
            editPayer: "product/editPayer",
        }),
        focusInput() {
            this.$nextTick(() => {
                this.$refs.myInput.focus();
            });
        },
        handleNameChange(event, product) {
            this.editProductName({
                id: product.id,
                name: event.target.value,
            });
            let index = product.id;
            if (product.name === "") {
                if (!this.nameErrors.includes(index)) {
                    this.nameErrors.push(index); // добавляем индекс клиента в массив ошибок
                }
            } else {
                this.nameErrors = this.nameErrors.filter(
                    (errorIndex) => errorIndex !== index
                ); // удаляем индекс клиента из массива ошибок
            }
        },
        handlePriceChange(event, product) {
            this.editProductPrice({
                id: product.id,
                price: +event.target.value,
            });
            let index = product.id;
            if (product.price === "") {
                if (!this.priceErrors.includes(index)) {
                    this.priceErrors.push(index); // добавляем индекс клиента в массив ошибок
                }
            } else {
                this.priceErrors = this.priceErrors.filter(
                    (errorIndex) => errorIndex !== index
                ); // удаляем индекс клиента из массива ошибок
            }
        },
        goToResultsPage() {
            if (this.products.some((product) => product.name === "")) {
                this.products.forEach((product) => {
                    if (product.name === "") {
                        this.nameErrors.push(product.id);
                    }
                });
            }
            if (this.products.some((product) => product.price === "")) {
                this.products.forEach((product) => {
                    if (product.price === "") {
                        this.priceErrors.push(product.id);
                    }
                });
            }
            if (this.products.length < 1) {
                this.isDisabledNextBtn = true;
                this.nextButtonText = "Добавьте хотя бы один продукт";
                setTimeout(() => {
                    this.isDisabledNextBtn = false;
                    this.nextButtonText = "Перейти к результатам";
                }, 2000);
            } else if (this.nameErrors.length > 0) {
                setTimeout(() => {
                    this.nameErrors = [];
                }, 2000);
            }
            if (this.priceErrors.length > 0) {
                setTimeout(() => {
                    this.priceErrors = [];
                }, 2000);
            } else {
                this.$router.push("/results");
            }
        },
    },
    mounted() {
        this.products.forEach((product) => {
            this.editPayer({
                id: product.id,
                payer: this.products[0].id,
            });
        });
    },
};
</script>

<style scoped lang="sass">
@import "@/styles/variables.sass"

.item
    display: block
.top__params
    display: flex
    background-color: #fff
.consumers
    padding: 10px
    display: flex
    justify-content: flex-start
    background-color: #000
    .all__circle
        width: 50px
        aspect-ratio: 1
        border-radius: 50%
        overflow: hidden
        display: flex
        align-items: center
        justify-content: center
        color: white
    .avatar
        margin-left: 10px
        width: 50px
    .avatar__label
        text-align: center
.not_selected
    background: $color-main
.selected
  background-color: $color-active
</style>
