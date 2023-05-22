<template>
    <button class="my-btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped lang="sass">
.my-btn
    padding: 10px 15px
    background: none
    color: teal
    border: 2px solid teal
    border-radius: 15px
</style>