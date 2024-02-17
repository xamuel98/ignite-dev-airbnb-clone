<script lang="ts" setup>
import DestinationDropdown from "./destination/DestinationDropdown.vue";
import GuestDropdown from "./guest/GuestDropdown.vue";
import { useSearchStore } from "#imports";

const searchStore = useSearchStore();
const selectedDestinationOption = ref<string | null>(null);

const getIsActive = computed(() => {
	return searchStore.getIsActive;
});

// Get selected destination value
const getDestinationValue = (value: string) => {
	if (value != "Flexible") {
		selectedDestinationOption.value = value;
	} else {
		selectedDestinationOption.value = "";
	}
};

const getGuestCategoryCount = (value: { [key: string]: number }) => {
	// console.log(value);
};

const setDropdownIsActive = (index: number) => {
    searchStore.SET_ACTIVE(index);
};

// Reset active state to 0 when document body is clicked
const setSearchItemToInActive = (event: MouseEvent) => {
    // Reset flag variable to allow outside click for subsequent events
    searchStore.SET_ACTIVE(0);
    searchStore.SET_ALLOW_OUTSIDE_CLICK(false);
};

watch(() => selectedDestinationOption.value, (newValue) => {
    if(newValue) {
		searchStore.SET_ACTIVE(4);
	}
});
</script>

<template>
    <div class="">
        <div class="u-header-mobile" v-click-outside="setSearchItemToInActive">
            <button type="button" class="u-header-mobile__search-box" @click="setDropdownIsActive(1)">
                <div class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="height: 20px; width: 20px; fill: currentcolor;">
                        <path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path>
                    </svg>
                </div>
                <div class="flex flex-col justify-start items-start space-y-2 w-full">
                    <h6 class="text-sm/3 font-medium text-[#222222]">Anywhere</h6>
                    <div class="flex justify-start items-center">
                        <p class="text-xs/3 font-normal text-[#717171]">Any week</p>
                        <p class="text-xs/3 font-normal text-[#717171] inset-circle">Any guest</p>
                    </div>
                </div>
            </button>
            <button type="button" class="u-header-mobile__button-filter">
                <img src="/icons/filter.svg" alt="Filter Icon" class="w-4 h-4">
            </button>
        </div>

        <DestinationDropdown
            v-if="getIsActive === 1"
            @get-destination="getDestinationValue"
        />

        <GuestDropdown
			@get-category="getGuestCategoryCount"
			v-else-if="getIsActive === 4"
		/>
    </div>
</template>

<style lang="scss" scoped>
.u-header-mobile {
    @apply px-6 pt-4 flex justify-center items-center gap-x-3.5;

    &__search-box {
        @apply rounded-full w-full h-[3.75rem] shadow-[0_3px_10px_rgba(0,0,0,0.1)] border-[0.5px] border-[rgba(0,0,0,0.08)] flex justify-start items-center;

        .search-icon {
            height: inherit;
            width: 66px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .inset-circle {
            position: relative;
            margin-left: 18px;

            &::after {
                content: '';
                position: absolute;
                display: block;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: #717171;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                left: -12px;
            }
        }
    }

    &__button-filter {
        @apply rounded-full border border-[#B0B0B0] shadow-sm bg-white w-10 min-w-10 h-10 flex justify-center items-center outline-0 cursor-pointer select-none;
    }
}
</style>