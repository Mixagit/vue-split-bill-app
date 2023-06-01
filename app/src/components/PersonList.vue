<template>
    <div v-if="persons.length > 0">
        <h3>Список людей</h3>
        <transition-group name="person-list">
            <person-item  
                v-for="person in persons"
                :key="person.id"
                :person="person"
                @remove="$emit('remove', person)"
            />
        </transition-group>
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

<style scoped lang="sass">
.person-list-item
    display: inline-block
    margin-right: 10px
.person-list-enter-active,
.person-list-leave-active
    transition: all 0.4s ease
.person-list-enter-from,
.person-list-leave-to
    opacity: 0
    transform: translateX(130px)
</style>