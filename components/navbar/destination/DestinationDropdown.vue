<script lang="ts" setup>
import { DESTINATIONS } from "~/utils/constants";
import DestinationItem from "./DestinationItem.vue";
import type { IDestinationValueEmits } from "~/types/destination";

const emits = defineEmits<IDestinationValueEmits>();

const handleSelectOption = (value: string) => {
	emits("getDestination", value);
};
</script>

<template>
	<div class="destination-dropdown-menu" @click.stop>
		<h1 class="block mb-5 text-sm font-medium">Search by region</h1>
		<div class="grid grid-cols-3 gap-x-3 gap-y-8">
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
