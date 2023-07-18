<template>
	<nav class="navbar navbar-expand-lg navbar-light">
		<div
			class="navbar-brand brand"
			@click="$router.push('/')"
		>
			Делим счёт в кафе
		</div>
		<div class="navbar__btns">
			<button
				class="btn nav__btn"
				@click="$router.push('/persons')"
			>
				Добавить людей
			</button>
			<button
				class="btn nav__btn"
				@click="$router.push('/products')"
				style="margin-left: 20px"
			>
				Добавить позиции
			</button>
			<button
				class="btn nav__btn"
				@click="$router.push('/results')"
				style="margin-left: 20px"
			>
				Результаты
			</button>
		</div>
	</nav>
</template>

<script>
export default {}
</script>

<style scoped lang="sass">
@import "@/styles/variables.sass"
.navbar
    height: 50px
    background-color: $color-secondary
    box-shadow: 2px 2px 4px gray
    display: flex
    align-items: center
    padding: 0 15px
.brand
    &:hover
        cursor: pointer
.navbar__btns
    margin-left: auto
.nav__btn
    color: $color-text
    border: 1px solid $color-text
    &:hover
        background-color: $color-active
        color: white
</style>
