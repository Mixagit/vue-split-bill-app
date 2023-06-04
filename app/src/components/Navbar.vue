<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #e3f2fd"
  >
    <div class="navbar-brand" @click="$router.push('/')">Делим счёт в кафе</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/persons')"
        >Добавить пользователей</my-button
      >
      <my-button @click="$router.push('/about')" style="margin-left: 20px"
        >О сайте</my-button
      >
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped lang="sass">
 .navbar
    height: 50px
    background-color: lightgrey
    box-shadow: 2px 2px 4px gray
    display: flex
    align-items: center
    padding: 0 15px
.navbar__btns
    margin-left: auto
</style>
