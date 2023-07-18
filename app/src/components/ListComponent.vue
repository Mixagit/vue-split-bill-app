<template>
	<transition-group
		name="list"
		appear
	>
		<slot></slot>
	</transition-group>
</template>

<script>
export default {}
</script>

<style lang="sass">
.list-item
    display: inline-block
    margin-right: 10px
.list-enter-active,
.list-leave-active
    transition: all 0.4s ease
.list-enter-from,
.list-leave-to
    opacity: 0
    transform: translateX(130px)
</style>
