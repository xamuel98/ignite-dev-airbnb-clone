<script lang="ts" setup>
import type { ICategoryProps, ICategoryEmits } from "~/types/category";
import { useSearchStore } from '~/stores/search';

const { category } = defineProps<{ category: ICategoryProps }>();
const emits = defineEmits<ICategoryEmits>();

const searchStore = useSearchStore();

// Handle change event
const handleChange = (newValue: string) => {
	emits("input", newValue);
	
	// Dispatch action to update store
	searchStore.SET_CATEGORY(newValue);
};
</script>

<template>
	<label :for="category.slug" class="u-category group">
		<input
			type="radio"
			name="category"
            @change="handleChange(category.slug)"
			:value="category.slug"
			:id="category.slug"
			:checked="category.slug === 'all-categories'"
		/>
		<div class="u-category-box opacity-70 group-hover:opacity-100 group-hover:transition-colors">
			<img :src="category.iconURL" alt="Rooms Icon" />
			<span>{{ category.name }}</span>
		</div>
	</label>
</template>

<style lang="scss" scoped>
.u-category {
    border-bottom-width: 2px;
    border-bottom-style: solid; 
    border-bottom-color: transparent;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;

	@apply pt-1 pb-2.5 mt-2.5 mb-0 lg:mb-1 text-xs/4 font-medium text-center bg-transparent cursor-pointer w-max;

    &:hover {
        border-bottom-color: #ebebeb;
    }

    &:has( > input[type="radio"]:checked) {
        border-bottom-color: #222222;
    }

	input[type="radio"] {
		@apply absolute w-0 h-0 opacity-0;
	}

    input[type="radio"]:checked + .u-category-box {
        opacity: 1 !important;
	}

	.u-category-box {
		@apply flex flex-col justify-center items-center gap-1 w-fit h-auto min-w-14;

		img {
			@apply w-6 h-6;
		}

		span {
			@apply relative text-xs font-medium w-fit text-nowrap;
		}
	}
}
</style>
