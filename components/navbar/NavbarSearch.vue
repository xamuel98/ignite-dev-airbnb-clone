<script lang="tsx" setup>
import DestinationDropdown from "./destination/DestinationDropdown.vue";
import GuestDropdown from "./guest/GuestDropdown.vue";

const isActive = ref<number>(0);
const inputRef: any = {
	destinationsRef: ref(null),
	fromDateRef: ref(null),
	toDateRef: ref(null),
	guestRef: ref(null),
};
const selectedDestinationOption = ref<string | null>(null);
const guestCategoryCount = ref<{ [key: string]: number }>({});

// Reset active state to 0 when document body is clicked
const setSearchItemToInActive = () => {
	if (isActive.value) {
		isActive.value = 0;
	}
};

// Focus search field input field on click of the div wrapper
const setSearchItemToActive = (index: number, ref: string) => {
	isActive.value = index;
	inputRef[ref]?.value?.focus();
};

// Returns true if any search field is active
const anySearchItemIsActive = computed(() => {
	return (
		isActive.value === 1 ||
		isActive.value === 2 ||
		isActive.value === 3 ||
		isActive.value === 4
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
</script>

<template>
	<div class="absolute w-full navbar-search">
		<form
			v-click-outside="setSearchItemToInActive"
			:class="anySearchItemIsActive ? 'navbar-search-active' : ''"
			class="relative inline-flex items-center w-full h-[66px] bg-transparent border border-[#DDDDDD] rounded-full shadow-[0_3px_12px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.08)] outline-0"
		>
			<div
				class="navbar-search-item u-navbar-search"
				:class="{ active: isActive === 1 }"
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
					:class="{ active: isActive === 2 }"
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
					:class="{ active: isActive === 3 }"
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
				:class="{ active: isActive === 4 }"
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
				<button type="submit" class="navbar-button search-button">
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
			v-if="isActive === 1"
			@get-destination="getDestinationValue"
		/>

		<GuestDropdown
			@get-category="getGuestCategoryCount"
			v-else-if="isActive === 4"
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
</style>
