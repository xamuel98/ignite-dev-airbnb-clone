<script lang="ts" setup>
import { DESTINATIONS } from "~/utils/constants";
import DestinationItem from "./DestinationItem.vue";
import type { IDestinationValueEmits } from "~/types/destination";
import { useSearchStore } from '~/stores/search';

const emits = defineEmits<IDestinationValueEmits>();

// Initialize store
const searchStore = useSearchStore();
const isMobile = useState('isMobile');

// Return store getter
const getDestination = computed(() => {
    return searchStore.getDestination;
});

const handleSelectOption = (value: string) => {
	emits("getDestination", value);
};
</script>

<template>
	<div class="destination-dropdown-menu" @click.stop>
		<h1 class="block mb-5 text-sm font-medium">Search by region</h1>
		<div class="u-destination-input-wrapper" v-if="isMobile">
			<div class="search-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="height: 20px; width: 20px; fill: currentcolor;">
					<path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path>
				</svg>
			</div>
			<input type="text" :value="getDestination" placeholder="Search destinations">
		</div>
		<div class="grid md:grid-flow-row md:gap-x-4 lg:grid-cols-3 gap-x-3 gap-y-8 u-destination-lists">
			<DestinationItem
				v-for="(destination, index) in DESTINATIONS"
				:key="index"
				:destination="destination"
				@input="handleSelectOption"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.destination-dropdown-menu {
	@apply absolute top-20 z-[9999] left-0 p-9 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-auto h-auto rounded-3xl;
}
</style>
