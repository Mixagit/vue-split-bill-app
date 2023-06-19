<template>
    <button @click="toggleTheme">Toggle Theme</button>
</template>
<script>
export default {
    data() {
        return {
            darkTheme: false
        };
    },
    methods: {
        toggleTheme() {
            this.darkTheme = !this.darkTheme;
        }
    }
};
</script>
<style></style>
