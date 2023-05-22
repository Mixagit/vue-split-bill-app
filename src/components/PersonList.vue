<template>
    <div v-if="persons.length > 0">
        <h3>Список персон</h3>
        <person-item  
            v-for="person in persons"
            :key="person.id"
            :person="person"
            @remove="$emit('remove', person)"
        />
    </div>
    <h2 v-else style="color: red">
        Список пользователей пуст
    </h2>
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