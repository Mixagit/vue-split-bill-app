<template>
    <div class="person">
        <div>
            <div><strong>Имя персоны: </strong>{{ person.name }}</div>
        </div>
        <div class="person__btns">
            <my-button
                @click="$emit('remove', remove)"
            >
                Удалить
            </my-button>
            <my-button
            >
                Изменить
            </my-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        person: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="sass">
.person
    padding: 15px
    border: 2px solid teal
    border-radius: 15px
    margin-top: 15px
    display: flex
    align-items: center
    justify-content: space-between
</style>