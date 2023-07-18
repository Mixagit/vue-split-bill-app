<template>
	<div
		ref="containerRef"
		class="avatar"
	>
		<transition name="fade"
			><span
				v-if="name"
				class="initials"
			>
				{{ name[0] }}
			</span>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			containerRef: null,
			fontSize: '1rem'
		}
	},

	mounted() {
		this.fontSize = `${this.$refs.containerRef.clientWidth * 0.5}px`
	}
}
</script>

<style scoped lang="sass">
@import "@/styles/variables.sass"
.avatar
    width: 100%
    aspect-ratio: 1
    border-radius: 50%
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center
    background: $color-main
.initials
    font-size: v-bind(fontSize)
    color: white
    font-family: sans-serif
    user-select: none
.fade-enter-active,
.fade-leave-active
    transition: opacity 0.5s ease
.fade-enter-from,
.fade-leave-to
    opacity: 0
</style>
