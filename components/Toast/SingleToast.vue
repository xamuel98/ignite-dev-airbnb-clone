<script lang="ts" setup>
import type { Toast } from "~/types/toast";
import useToast from "~/composables/useToast";

const { removeToast } = useToast();

const { toast } = defineProps<{ toast: Toast }>();

const timeout = setTimeout(() => {
	removeToast(toast.id);
}, toast.duration);

onBeforeUnmount(() => {
	clearTimeout(timeout);
});
</script>

<template>
	<div class="toast" :class="toast.type">
		<div class="toast__text">
			<p class="toast__message">{{ toast.description }}</p>
		</div>
		<div @click="removeToast(toast.id)" class="cursor-pointer">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="fill: none; height: 12px; width: 12px; stroke: #ffffff; stroke-width: 4; overflow: visible;">
                <path d="m6 6 20 20M26 6 6 26"></path>
            </svg>
		</div>
	</div>
</template>

<style scoped>
.toast {
	--toast-accent-clr: #000000;
	background-color: var(--toast-accent-clr);
	border: 1px solid #eee;
	color: white;
	/* border-left: 4px solid var(--toast-accent-clr); */
	@apply flex items-center justify-between px-4 py-3 mb-2 mr-3 shadow;
}
.toast.success {
	--toast-accent-clr: #000000; /* #47d764; */
}
.toast.info {
	--toast-accent-clr: #2f86eb;
}
.toast.warning {
	--toast-accent-clr: #ffc021;
}
.toast.danger {
	--toast-accent-clr: #fa314f;
}
.toast__icon {
	@apply h-6 w-6 rounded-full flex justify-center text-sm items-center text-white;
	color: white;
}
.toast__text {
	@apply mx-3;
}
.toast__title {
	@apply capitalize text-base font-medium text-white;
	color: white;
}
.toast__message {
	@apply text-sm text-white;
}
.toast button {
	@apply text-gray-300 text-lg;
}
</style>
~/composables/useToast