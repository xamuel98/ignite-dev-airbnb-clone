<script lang="tsx" setup>
import { useSearchStore } from "~/stores/search";
import { useListingsStore } from "~/stores/listings";
import DestinationDropdown from "./destination/DestinationDropdown.vue";
import GuestDropdown from "./guest/GuestDropdown.vue";

const searchStore = useSearchStore();

const inputRef: any = {
	destinationsRef: ref(null),
	fromDateRef: ref(null),
	toDateRef: ref(null),
	guestRef: ref(null),
};
const selectedDestinationOption = ref<string | null>(null);
const guestCategoryCount = ref<{ [key: string]: number }>({});


const getIsActive = computed(() => {
	return searchStore.getIsActive;
});

const getAllowOutsideClick = computed(() => {
	return searchStore.getAllowOutsideClick;
});


// Reset active state to 0 when document body is clicked
const setSearchItemToInActive = (event: MouseEvent) => {
	// Check if outside click is allowed
	if (!getAllowOutsideClick.value) {
		// Perform action for outside click
		if(document) {
			let el = document.querySelector('.navbar-search');
			let grandParent = el?.parentElement?.parentElement;
			let eventTargetParent = grandParent?.querySelector('.u-navbar-search-small');
			if (!eventTargetParent?.contains(event.target as Node) && eventTargetParent !== event.target) {
				// Reset flag variable to allow outside click for subsequent events
				searchStore.SET_ACTIVE(0);
				searchStore.SET_ALLOW_OUTSIDE_CLICK(false);
			}
		}
    } else {
		// Reset flag variable to allow outside click for subsequent events
		searchStore.SET_ACTIVE(0);
		searchStore.SET_ALLOW_OUTSIDE_CLICK(false);
	}
};

// Focus search field input field on click of the div wrapper
const setSearchItemToActive = (index: number, ref: string) => {
	// isActive.value = index;
	searchStore.SET_ACTIVE(index);
	inputRef[ref]?.value?.focus();
};

// Returns true if any search field is active
const anySearchItemIsActive = computed(() => {
	return (
		getIsActive.value === 1 ||
		getIsActive.value === 2 ||
		getIsActive.value === 3 ||
		getIsActive.value === 4
	);
});

// Get selected destination value
const getDestinationValue = (value: string) => {
	if (value != "Flexible") {
		selectedDestinationOption.value = value;
	} else {
		selectedDestinationOption.value = "";
	}
};

// Set guestCategoryCount with the current object containing guest category and their respective counts
const getGuestCategoryCount = (newValue: { [key: string]: number }) => {
	guestCategoryCount.value = newValue;
};

const totalGuest = computed(() => {
	return (
		guestCategoryCount.value["Adults"] +
		guestCategoryCount.value["Children"]
	);
});

// Parsed string literal for the guest category
const parsedCategory = computed(() => {
	let result = "";
	if (totalGuest.value > 0) {
		result += `${totalGuest.value} guest`;
		if (totalGuest.value > 1) {
			result += "s";
		}
	}

	if (guestCategoryCount.value["Infants"] > 0) {
		if (result) {
			result += ", ";
		}
		result += `${guestCategoryCount.value["Infants"]} infant`;
		if (guestCategoryCount.value["Infants"] > 1) {
			result += "s";
		}
	}

	if (guestCategoryCount.value["Pets"] > 0) {
		if (result) {
			result += ", ";
		}
		result += `${guestCategoryCount.value["Pets"]} pet`;
		if (guestCategoryCount.value["Pets"] > 1) {
			result += "s";
		}
	}
	return result;
});

// Search for available listings
const searchAvailableListings = () => {
	const filterQuery = {
		'region': selectedDestinationOption.value,
	};

	searchStore.SET_FILTER_QUERY(filterQuery);
};

const DismissIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		aria-hidden="true"
		role="presentation"
		focusable="false"
		style="fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 4; overflow: visible;"
	>
		<path d="m6 6 20 20M26 6 6 26"></path>
	</svg>
);

// Open next dropdown when option changes
// This closes the current dropdown and opens the next one
watch(() => selectedDestinationOption.value, (newValue) => {
    if(newValue) {
		searchStore.SET_ACTIVE(4);
	}
});

watch(() => getIsActive.value, (newValue) => {
    if(newValue) {
		searchStore.SET_ACTIVE(newValue);
	}
});
</script>

<template>
	<div class="absolute w-full navbar-search">
		<form
			v-click-outside="setSearchItemToInActive"
			@submit.prevent="searchAvailableListings"
			:class="anySearchItemIsActive ? 'navbar-search-active' : ''"
			class="relative inline-flex items-center w-full h-[66px] bg-transparent border border-[#DDDDDD] rounded-full shadow-[0_3px_12px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.08)] outline-0"
		>
			<div
				class="navbar-search-item u-navbar-search"
				:class="{ active: getIsActive === 1 }"
				@click="setSearchItemToActive(1, 'destinationsRef')"
			>
				<label for="where">Where</label>
				<input
					type="text"
					:ref="inputRef.destinationsRef"
					v-model="selectedDestinationOption"
					placeholder="Search destinations"
				/>
			</div>
			<div
				class="inline-flex items-center relative w-2/6 select-none navbar-search-item"
			>
				<div
					class="w-1/2 u-navbar-search"
					:class="{ active: getIsActive === 2 }"
					@click="setSearchItemToActive(2, 'fromDateRef')"
				>
					<label for="check-in">Check in</label>
					<input
						type="text"
						:ref="inputRef.fromDateRef"
						placeholder="Add dates"
						disabled
					/>
				</div>
				<div
					class="w-1/2 u-navbar-search"
					:class="{ active: getIsActive === 3 }"
					@click="setSearchItemToActive(3, 'toDateRef')"
				>
					<label for="check-out">Where</label>
					<input
						type="text"
						:ref="inputRef.toDateRef"
						placeholder="Add dates"
						disabled
					/>
				</div>
			</div>
			<div
				class="w-2/6 flex items-center search-button-wrapper"
				:class="{ active: getIsActive === 4 }"
				@click="setSearchItemToActive(4, 'guestRef')"
			>
				<div class="!w-full navbar-search-item u-navbar-search">
					<label for="who">Who</label>
					<input
						type="text"
						:ref="inputRef.guestRef"
						v-model="parsedCategory"
						placeholder="Add guests"
						class="text-ellipsis"
					/>
				</div>
				<button type="submit" class="navbar-button search-button" @click.stop>
					<img
						src="/icons/search.svg?url"
						alt="Search Icon"
						class="search-button-icon"
					/>
					<span class="hidden text-white">Search</span>
				</button>
			</div>
		</form>

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
.navbar-search {
	.navbar-search-active {
		@apply bg-[#EBEBEB];

		button.search-button {
			transition: 0.3s all;
			width: 200px !important;
			background: linear-gradient(
				to right,
				#e61e4d 0%,
				#e31c5f 50%,
				#d70466 100%
			) !important;
			span {
				display: block !important;
			}
		}
	}

	.navbar-search-item {
		&:not(:nth-child(2)) {
			height: inherit;
			@apply relative w-2/6 py-3.5 px-8 flex flex-col;

			&:not(.active):hover {
				@apply bg-[#EBEBEB] rounded-full;
				input[type="text"] {
					@apply bg-[#EBEBEB];
				}
			}
		}

		.u-navbar-search {
			&:not(.active):hover {
				@apply bg-[#EBEBEB] rounded-full;
				input[type="text"] {
					@apply bg-[#EBEBEB];
				}
			}
		}

		&:not(:first-child)::after {
			content: "";
			@apply absolute left-0 right-0 bg-[#DDDDDD] h-8 w-[.0625rem];
		}

		label {
			@apply w-fit text-[13px] font-medium leading-4 pb-[.125rem];
		}

		input[type="text"] {
			@apply w-full bg-transparent text-[14px] text-[#222222] font-medium leading-5;
			&:focus {
				@apply outline-0 shadow-none;
			}
			&::placeholder {
				@apply text-[#717171] font-normal;
			}

			&::-moz-placeholder {
				@apply text-[#717171] font-normal;
			}

			&::-webkit-input-placeholder {
				@apply text-[#717171] font-normal;
			}
		}
	}

	.u-navbar-search {
		@apply relative leading-4 py-3.5 px-8 cursor-pointer select-none;
		&.active,
		.active {
			@apply bg-white z-10 shadow-[0_3px_12px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.08)] rounded-full;

			&:hover {
				input[type="text"] {
					@apply bg-white;
				}
			}
		}

		// &:hover::before {
		//     content: "";
		//     background: linear-gradient(90deg,#DDDDDD 0 50%,#EBEBEB  50% 100%);
		//     position: absolute;
		//     right: 0;
		//     left: -30px;
		//     display: block;
		// }
	}

	.search-button-wrapper {
		@apply relative;
		&::before {
			content: "";
			@apply absolute left-0 right-0 bg-[#DDDDDD] h-8 w-[.0625rem];
		}

		&:not(.active):hover {
			@apply bg-[#EBEBEB] rounded-full;
			input[type="text"] {
				@apply bg-[#EBEBEB];
			}
		}

		&.active {
			@apply bg-white z-10 shadow-[0_3px_12px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.08)] rounded-full;

			.navbar-search-item {
				border-radius: 9999px !important;
				background-color: #ffffff !important;

				input[type="text"] {
					background-color: #ffffff !important;
				}
			}

			&:hover {
				input[type="text"] {
					@apply bg-white;
				}
			}
		}

		button.search-button {
			background: #ff385c;
			border-radius: 32px;
			height: 50px;
			width: 70px;
			margin-right: 9px;
			overflow: hidden;
			max-width: 200px;
			display: inline-flex;
			align-items: center;
			align-self: center;
			justify-content: center;
			justify-items: center;
			overflow: hidden;
			gap: 0.3125rem;
			transition: 0.3s all;

            &:hover {
                background: linear-gradient(
                    to right,
                    #e61e4d 0%,
                    #e31c5f 50%,
                    #d70466 100%
                ) !important;
            }
		}

		img.search-button-icon {
			width: 16px;
			height: 16px;
			filter: invert(1) grayscale(1);
			-webkit-filter: invert(1) grayscale(1);
		}
	}
}

// .u-navbar-search-small {
// 	&__tab { 
// 		border: 1px solid transparent;
// 		text-align: inherit;
// 		background: transparent;
// 		font-weight: inherit;
// 		cursor: pointer;
// 		margin: -1px;
// 		padding: 0;
// 		padding-left: 8px;
// 		line-height: inherit;
// 		font-size: inherit;
// 		display: flex;
// 		align-items: center;
// 		border-radius: 4px;
// 		position: relative;
// 		color: inherit;
// 		height: 48px;
// 		outline: none;

// 		span {
// 			text-overflow: ellipsis;
// 			white-space: nowrap;
// 			overflow: hidden;
// 			flex: 1 1 auto;
// 			line-height: 1.375rem;
// 			font-weight: 500;
// 			font-size: 0.875rem;
// 			padding: 0 16px;
// 			min-width: 80px;
// 		}
// 	}

// 	&__button {
// 		border-radius: 50%;
// 		padding: 10px;
// 		margin: 7px 7px 7px 0;
// 		width: 32px;
// 		height: 32px;
// 		color: #FFFFFF;
// 		background-color: #FF385C;

// 		img {
// 			filter: invert(1) grayscale(1);
// 			-webkit-filter: invert(1) grayscale(1);
// 		}
// 	}

// 	.b-divider {
// 		width: 1px;
// 		height: 24px;
// 		flex: 0 0 1px;
// 		background-color: #DDDDDD;
// 	}
// }
</style>
