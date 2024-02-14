<script lang="ts" setup>
import type {
	IDestinationItemProps,
	IDestinationItemEmits,
} from "~/types/destination";

const props = defineProps<{ destination: IDestinationItemProps }>();
const emits = defineEmits<IDestinationItemEmits>();

// Handle change event
const handleChange = (newValue: string) => {
	emits("input", newValue);
};
</script>

<template>
	<label class="u-continent" :for="props.destination.slug">
		<input
			type="radio"
			name="destination"
			@change="handleChange(props.destination.name)"
			:value="props.destination.name"
			:id="props.destination.slug"
		/>
		<div class="u-continent-wrapper">
			<div class="u-continent-image-wrapper">
				<img
					:src="props.destination.imageURL"
					alt="Map Image"
					class="u-continent-image"
				/>
			</div>
			<p class="text-[13px] font-normal">{{ props.destination.title }}</p>
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

	/* IMAGE STYLES */
	[type="radio"] + .u-continent-wrapper > .u-continent-image-wrapper {
		cursor: pointer;
	}

	/* CHECKED STYLES */
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
