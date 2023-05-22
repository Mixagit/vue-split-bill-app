<template>
    <div>
        <input 
            :value="modelValue"
            @input="updateInput" 
            type="text" 
            class="input"
            :placeholder="placeholder"
        >
    </div>
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
        placeholder: String
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style>
.input {
    width: 100%;
    border: 2px solid teal;
    border-radius: 15px;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>