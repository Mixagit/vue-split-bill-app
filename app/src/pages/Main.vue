<template>
	<div class="container">
		<h1 class="header">Добро пожаловать!</h1>
		<div class="content">
			<span class="text"
				>Это приложение создано для деления чека/счёта на нескольких людей. Сначала вводятся по очереди люди,
				потом вводятся продукты, каждому продукту указывается цена и тот, кто его “использовал” (ел/пил), после
				чего считается сколько денег “потратил” каждый человек, и выводиться информация о том, кто кому сколько
				денег должен.</span
			>
		</div>
		<button
			type="button"
			class="btn next__btn"
			:class="{ disabledNextBtn: isDisabledNextBtn }"
			@click="$router.push('/persons')"
		>
			{{ nextButtonText }}
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			nextButtonText: 'Приступить к делению чека'
		}
	}
}
</script>

<style scoped lang="sass">
@import "@/styles/variables.sass"
.container
    text-align: center
    .content
        flex: 1
        margin: 50px
        border: 2px solid $color-text
        border-radius: 10px
        box-shadow: 0 2px 4px 5px rgba(0, 0, 0, 0.3)
        .text
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            text-align: center
</style>
