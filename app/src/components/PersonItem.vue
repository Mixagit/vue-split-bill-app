<template>
  <div class="person">
    <div>
      <div><strong>Имя человека: </strong>{{ person.name }}</div>
      <my-input v-model="person.name" type="text" placeholder="Имя" />
    </div>
    <div class="person__btns">
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
    person: {
      type: Object,
      required: true
    }
  }
};
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
.remove__btn
    margin-right: 15px
</style>
