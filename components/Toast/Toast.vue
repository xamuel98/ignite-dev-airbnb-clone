<script lang="ts" setup>
import SingleToast from './SingleToast.vue';
import useToast from '~/composables/useToast';

const { toastList } = useToast();
</script>

<template>
    <teleport to="#__nuxt">
        <div class="notification-container top-right" v-if="toastList.length > 0">
            <transition-group name="show" appear>
                <SingleToast v-for="toast in toastList" :key="toast.id" :toast="toast" />
            </transition-group>
        </div>
    </teleport>
</template>

<style scoped>
.notification-container {
    font-size: 14px;
    box-sizing: border-box;
    position: fixed;
    z-index: 999999;
}
.top-right {
    top: 12px;
    right: 0px;
    transition: transform 0.6s ease-in-out;
    animation: toast-in-right 0.7s;
}
.bottom-right {
    bottom: 12px;
    right: 12px;
    transition: transform 0.6s ease-in-out;
    animation: toast-in-right 0.7s;
}
.top-left {
    top: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: toast-in-left 0.7s;
}
.bottom-left {
    bottom: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: toast-in-left 0.7s;
}
.notification {
    background: #fff;
    transition: 0.3s ease;
    position: relative;
    pointer-events: auto;
    overflow: hidden;
    margin: 0 0 6px;
    padding: 30px;
    margin-bottom: 15px;
    max-width: 300px;
    max-height: 100px;
    border-radius: 3px 3px 3px 3px;
    box-shadow: 0 0 10px #999;
    color: #fff;
    opacity: 0.9;
    background-position: 15px;
    background-repeat: no-repeat;
}
@keyframes toast-in-right {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}
@keyframes toast-in-left {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}
.show-enter-from {
    transform: scaleY(0);
}
.show-enter-to {
    transform: scaleY(100%);
}
.show-enter-active,
.show-leave-active {
    transition: all 0.4s ease;
    position: absolute;
}
.show-move {
    transition: all 0.3s ease;
}
.show-leave-from {
    transform: scaleY(100%);
}
.show-leave-to {
    transform: scaleY(0);
}
</style>~/composables/useToast