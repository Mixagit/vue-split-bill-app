<template>
    <div class="products">
        <h1>Добавление позиций меню</h1>
        <button 
            type="button" 
            class="btn btn-outline-primary add__btn"
            @click="createProduct"
        >
            Добавить позицию
        </button>
        <product-list 
            :products="products"
            @remove="removeProduct"
        >
        </product-list>
        <button
        type="button" 
            class="btn btn-outline-success"
            :class="{ 
                'next__btn': products.length >= 1,
                'stop-next__btn': products.length < 1
            }"
            @click="goToResultsPage"
        >
            {{ nextBtnText }}
        </button>
    </div>
</template>

<script>
    import ProductList from "@/components/ProductList.vue";

    export default {
    components: {
        ProductList
    },
    data() {
        return {
            products: [
                    {id: 1, name: 'Огурец', price: 100, payer: 'lol', consumers: []},
                    {id: 2, name: 'Помидор', price: 200, payer: 'kek', consumers: []},
                    {id: 3, name: 'Баклажан', price: 300, payer: 'oru', consumers: []}
            ],
            nextBtnText: 'Перейти к результатам'
        }
    },
    methods: {
        createProduct() {
            const product = {
                id: Date.now(),
                name: '',
                price: 0,
                payer: null,
                consumers: []
            }
            this.products.push(product);
        },
        removeProduct(product) {
            this.products = this.products.filter(p => p.id !== product.id)
        },
        goToResultsPage(event) {
            this.$router.push('/results');
        }
    }
}
</script>

<style lang="sass">
.products
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