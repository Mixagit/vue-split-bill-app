<template>
    <transition name="fade">
        <div v-if="errors.includes(itemId)" class="invalid__name">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        errors: Array,
        itemId: Number
    }
};
</script>

<style lang="sass">
@import "@/styles/variables.sass"

.fade-enter-active,
.fade-leave-active
    transition: opacity 0.5s ease
.fade-enter-from,
.fade-leave-to
    opacity: 0
.invalid__name
    color: $color-alarm
</style>
