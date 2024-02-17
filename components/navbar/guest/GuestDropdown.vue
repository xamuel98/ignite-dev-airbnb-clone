<script lang="tsx" setup>
import GuestItem from "./GuestItem.vue";
import { GUEST_CATEGORY } from "~/utils/constants";
import type { IGuestCategoryCountEmits } from "~/types/guest";
import { useSearchStore } from "~/stores/search";

const emits = defineEmits<IGuestCategoryCountEmits>();

// Initialize store
const searchStore = useSearchStore();

const counts: { [key: string]: number } = reactive({
	Adults: 1,
	Children: 0,
	Infants: 0,
	Pets: 0,
});

const updateCounts = (category: string, count: number) => {
	counts[category] = count;
	emits("getCategory", counts);

    // Dispatch action to update store
    searchStore.SET_GUESTS(counts);
};
</script>

<template>
	<div class="guest-dropdown-menu" @click.stop>
		<GuestItem
			v-for="(category, index) in GUEST_CATEGORY"
			:key="index"
			:category="category"
			@updateCounts="updateCounts"
		/>
	</div>
</template>

<style lang="scss" scoped>
.guest-dropdown-menu {
	@apply absolute top-20 right-0 z-[9999] px-9 py-3 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-auto h-auto rounded-3xl;
}
</style>
