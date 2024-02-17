import type { mergeProps } from 'vue'; import type { mergeProps } from 'vue';

<script lang="tsx" setup>
import type { IGuestItemProps, IGuestItemEmits } from "~/types/guest";
import { useSearchStore } from "~/stores/search";

const { category } = defineProps<{ category: IGuestItemProps }>();
const emits = defineEmits<IGuestItemEmits>();

// Initialize store
const searchStore = useSearchStore();

// Create an object to store counts for each category
// Initialize counts for each category
const counts = ref<{ [key: string]: number }>({
	Adults: 1,
	Children: 0,
	Infants: 0,
	Pets: 0,
});

// Increment count for a specific category
const IncrementCount = (category: string) => {
	counts.value[category]++;
	// Handle change event
	emits("updateCounts", category, counts.value[category]);
};

// Decrement count for a specific category
const DecrementCount = (category: string) => {
	if (counts.value[category] > 0) {
		counts.value[category]--;
		// Handle change event
		emits("updateCounts", category, counts.value[category]);
	}
};

const MinusIcon = () => (
	<svg
		viewBox="0 0 12 12"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		role="presentation"
		focusable="false"
		style="height: 12px; width: 12px; fill: currentcolor;"
	>
		<path d="m.75 6.75h10.5v-1.5h-10.5z"></path>
	</svg>
);

const PlusIcon = () => (
	<svg
		viewBox="0 0 12 12"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		role="presentation"
		focusable="false"
		style="height: 12px; width: 12px; fill: currentcolor;"
	>
		<path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path>
	</svg>
);

// Return store getter
const getGuests = computed(() => {
    return searchStore.getGuests;
});
</script>

<template>
	<div class="u-guest-item" :key="category.id">
		<div class="flex flex-col">
			<h2 class="text-base font-medium">{{ category.title }}</h2>
			<p class="text-[13px] font-normal leading-4 text-[#717171]">
				{{ category.subtitle }}
			</p>
		</div>
		<div class="u-guest-controls">
			<button
				class="u-guest-button"
				type="button"
				:disabled="
					category.title === 'Adults'
						? counts[category.title] <= 1
						: counts[category.title] <= 0
				"
				@click="DecrementCount(category.title)"
			>
				<div class="u-guest-icon-circle">
					<MinusIcon />
				</div>
			</button>
			<input
				type="number"
                v-model.number="counts[category.title]"
				:min="category.min"
				:max="category.max"
			/>
			<button
				class="u-guest-button"
				type="button"
				:disabled="counts[category.title] >= category.max"
				@click="IncrementCount(category.title)"
			>
				<div class="u-guest-icon-circle">
					<PlusIcon />
				</div>
			</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.u-guest-item {
	@apply flex flex-wrap gap-2.5 justify-between items-center py-6 w-[18.75rem];
	&:not(:last-child) {
		@apply border-b border-[#EBEBEB];
	}

	.u-guest-controls {
		[type="number"] {
			@apply outline-0 shadow-none border-0 w-[1.875rem] text-sm text-center align-middle;
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				appearance: none;
				-moz-appearance: none;
				-webkit-appearance: none;
			}
		}
	}

	.u-guest-button {
		&:disabled {
			cursor: not-allowed;

			.u-guest-icon-circle {
				@apply opacity-20 hover:transition-colors hover:opacity-100;
			}
		}
		.u-guest-icon-circle {
			@apply flex justify-center items-center w-10 h-10 border border-[#222222] rounded-full;
		}
	}
}
</style>
