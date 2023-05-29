<template>
    <div class="product">
        <div>
            <div><strong>Название продукта: </strong>{{ product.name }}</div>
            <my-input 
                v-model="product.name" 
                type="text" 
                placeholder="Имя"
            />
        </div>
        <div>
            <div><strong>Цена продукта: </strong>{{ product.price }}</div>
            <my-input 
                v-model="product.price" 
                type="text" 
                placeholder="Цена"
            />
        </div>
        <div class="product__btns">
            <button 
                type="button" 
                class="btn btn-outline-danger remove__btn"
                @click="$emit('remove', remove)"
            >
                Удалить
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="sass">
.product
    padding: 15px
    border: 2px solid teal
    border-radius: 15px
    margin-top: 15px
    display: flex
    align-items: center
    justify-content: space-between
.remove__btn
    margin-right: 15px
</style>