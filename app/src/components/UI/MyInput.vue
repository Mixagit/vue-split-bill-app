<template>
    <input 
        :value="modelValue"
        @input="updateInput"
        class="input" 
        type="text"
    >
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped lang="sass">
.input
    width: 100%
    border: 2px solid teal
    border-radius: 15px
    padding: 10px 15px
    margin-top: 15px
</style>