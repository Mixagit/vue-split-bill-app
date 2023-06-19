<template>
    <div class="container">
        <h1 class="header">Добавление позиций меню</h1>
        <button
            type="button"
            class="btn btn-outline-primary add__btn"
            @click="createProduct"
        >
            <i class="bi bi-bag-plus-fill"></i>
            Добавить позицию
        </button>

        <div v-if="products.length > 0" class="list">
            <h3>Список продуктов</h3>
            <list-component>
                <div class="item" v-for="product in products" :key="product.id">
                    <div class="name">
                        <input
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
                        <error-hint :errors="nameErrors" :itemId="product.id"
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
                        <error-hint :errors="priceErrors" :itemId="product.id"
                            >Введите цену этого продукта!</error-hint
                        >
                    </div>

                    <div class="payer">
                        <select
                            name="payer"
                            class="form-select select"
                            @change="
                                e =>
                                    editProductPayer({
                                        id: product.id,
                                        payer: +e.target.value
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

                    <div class="consumers">
                        <div
                            class="not_selected"
                            :class="{
                                selected:
                                    product.consumers.length === persons.length
                            }"
                            @click="
                                toggleAllConsumers({
                                    id: product.id,
                                    persons: persons
                                })
                            "
                            checked
                        >
                            ALL
                        </div>
                        <div v-for="person in persons" :key="person.id">
                            <div
                                class="not_selected"
                                :class="{
                                    selected: product.consumers.includes(
                                        person.id
                                    )
                                }"
                                @click="
                                    toggleConsumer({
                                        id: product.id,
                                        person: person.id
                                    })
                                "
                            >
                                {{ person.name }}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="btn btn-outline-danger remove__btn hidden__btn"
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
            class="btn btn-outline-success next__btn"
            :class="{ disabledNextBtn: isDisabledNextBtn }"
            @click="goToResultsPage"
        >
            {{ nextButtonText }}
        </button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import ListComponent from '@/components/ListComponent.vue';
import ErrorHint from '@/components/ErrorHint.vue';

export default {
    components: { ListComponent, ErrorHint },
    data() {
        return {
            nameErrors: [],
            priceErrors: [],
            isDisabledNextBtn: false,
            nextButtonText: 'Перейти к результатам'
        };
    },
    computed: {
        ...mapState({
            products: state => state.product.products,
            persons: state => state.person.persons
        })
    },
    methods: {
        ...mapActions({
            createProduct: 'product/createProduct',
            editProductName: 'product/editProductName',
            editProductPrice: 'product/editProductPrice',
            editProductPayer: 'product/editProductPayer',
            toggleConsumer: 'product/toggleConsumer',
            toggleAllConsumers: 'product/toggleAllConsumers',
            removeProduct: 'product/removeProduct'
        }),
        ...mapMutations({
            editPayer: 'product/editPayer'
        }),
        focusInput() {
            this.$nextTick(() => {
                this.$refs.myInput.focus();
            });
        },
        handleNameChange(event, product) {
            this.editProductName({
                id: product.id,
                name: event.target.value
            });
            let index = product.id;
            if (product.name === '') {
                if (!this.nameErrors.includes(index)) {
                    this.nameErrors.push(index); // добавляем индекс клиента в массив ошибок
                }
            } else {
                this.nameErrors = this.nameErrors.filter(
                    errorIndex => errorIndex !== index
                ); // удаляем индекс клиента из массива ошибок
            }
        },
        handlePriceChange(event, product) {
            this.editProductPrice({
                id: product.id,
                price: +event.target.value
            });
            let index = product.id;
            if (product.price === '') {
                if (!this.priceErrors.includes(index)) {
                    this.priceErrors.push(index); // добавляем индекс клиента в массив ошибок
                }
            } else {
                this.priceErrors = this.priceErrors.filter(
                    errorIndex => errorIndex !== index
                ); // удаляем индекс клиента из массива ошибок
            }
        },
        goToResultsPage() {
            if (this.products.some(product => product.name === '')) {
                this.products.forEach(product => {
                    if (product.name === '') {
                        this.nameErrors.push(product.id);
                    }
                });
            }
            if (this.products.some(product => product.price === '')) {
                this.products.forEach(product => {
                    if (product.price === '') {
                        this.priceErrors.push(product.id);
                    }
                });
            }
            if (this.products.length < 1) {
                this.isDisabledNextBtn = true;
                this.nextButtonText = 'Добавьте хотя бы один продукт';
                setTimeout(() => {
                    this.isDisabledNextBtn = false;
                    this.nextButtonText = 'Перейти к результатам';
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
                this.$router.push('/results');
            }
        }
    },
    mounted() {
        this.products.forEach(product => {
            this.editPayer({
                id: product.id,
                payer: this.products[0].id
            });
        });
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

    .invalid__name
        color: $color-alarm
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
.not_selected
  background-color: teal
.selected
  background-color: $color-alarm
</style>
