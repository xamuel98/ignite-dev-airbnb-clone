<script lang="ts" setup>
import type {
	IDestinationItemProps,
	IDestinationItemEmits,
} from "~/types/destination";
import { useSearchStore } from '~/stores/search';

const { destination } = defineProps<{ destination: IDestinationItemProps }>();
const emits = defineEmits<IDestinationItemEmits>();

// Initialize store
const searchStore = useSearchStore();

// Handle change event
const handleChange = (newValue: string) => {
	emits("input", newValue);

    // Dispatch action to update store
    searchStore.SET_DESTINATION(newValue);
};

// Return store getter
const getDestination = computed(() => {
    return searchStore.getDestination;
});
</script>

<template>
	<label class="u-continent" :for="destination.slug">
		<input
			type="radio"
			name="destination"
			@change="handleChange(destination.name)"
			:value="getDestination || destination.name"
			:id="destination.slug"
            :checked="getDestination === destination.name"
		/>
		<div class="u-continent-wrapper">
			<div class="u-continent-image-wrapper">
				<img
					:src="destination.imageURL"
					alt="Map Image"
					class="u-continent-image"
				/>
			</div>
			<p class="text-[13px] font-normal">{{ destination.title }}</p>
		</div>
	</label>
</template>

<style lang="scss" scoped>
.u-continent {
	@apply flex flex-col col-span-1 space-y-1.5 cursor-pointer;

	[type="radio"] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	[type="radio"] + .u-continent-wrapper > .u-continent-image-wrapper {
		cursor: pointer;
	}

	[type="radio"]:checked + .u-continent-wrapper > .u-continent-image-wrapper {
		@apply border border-[#222222];
	}

	.u-continent-wrapper {
		@apply flex flex-col gap-y-1.5 cursor-pointer;

		.u-continent-image-wrapper {
			@apply w-32 h-32 rounded-lg overflow-hidden border border-[#DDDDDD] transition-colors hover:border-[#222222] hover:transition-colors;

			img.u-continent-image {
				@apply w-32 h-32 rounded-lg object-cover object-center;
			}
		}
	}
}
</style>
