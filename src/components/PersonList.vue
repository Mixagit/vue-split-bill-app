<template>
    <h3>Список персон</h3>
    <person-item 
        v-for="person in persons"
        :person="person"
    />
</template>

<script>
import PersonItem from '@/components/PersonItem.vue';
export default {
    components: {
        PersonItem
    },
    props: {
        persons: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>