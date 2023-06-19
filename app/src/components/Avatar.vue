<template>
    <div ref="containerRef" class="avatar">
        <transition name="fade"
            ><span v-if="name" class="initials">
                {{ name[0] }}
            </span>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
    name: {
        type: String,
        default: "",
    },
});

const containerRef = ref();
const fontSize = ref("1rem");

onMounted(() => {
    // The font size should be 50% of the container width
    fontSize.value = `${containerRef.value.clientWidth * 0.5}px`;
});

const bgColor = computed(() => {
    const hue =
        props.name.split("").reduce((acc, cur) => {
            return acc + cur.charCodeAt(0);
        }, 0) % 360;
    return `hsla(${hue}, 60%, 50%, 1)`;
});
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
