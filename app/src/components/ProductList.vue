<template>
    <div v-if="products.length > 0">
        <h3>Список продуктов</h3>
        <transition-group name="product-list">
            <product-item  
                v-for="product in products"
                :key="product.id"
                :product="product"
                @remove="$emit('remove', product)"
            />
        </transition-group>
    </div>
    <h2 v-else style="color: red">
        Список продуктов пуст
    </h2>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
    components: {
        ProductItem
    },
    props: {
        products: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped lang="sass">
.product-list-item
    display: inline-block
    margin-right: 10px
.product-list-enter-active,
.product-list-leave-active
    transition: all 0.4s ease
.product-list-enter-from,
.product-list-leave-to
    opacity: 0
    transform: translateX(130px)
</style>