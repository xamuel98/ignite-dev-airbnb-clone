<script lang="ts" setup>
import { CATEGORIES } from "~/utils/constants";
import CategoryBox from "./CategoryBox.vue";
import type { ICategoryValueEmits } from "~/types/category";

const emits = defineEmits<ICategoryValueEmits>();

const handleSelectOption = (value: string) => {
	emits("getCategory", value);
};

const scrollContainerRef = ref<HTMLElement | null>(null); // Target container
const scrollerRef = ref<HTMLElement | null>(null); // Target scroller
const prevButtonRef = ref<HTMLButtonElement | null>(null); // Target previous button
const nextButtonRef = ref<HTMLButtonElement | null>(null); // Target next button
const categoryRefs = ref<Array<Element | ComponentPublicInstance | null>>([]); // Target each slider image wrapper

// Define a ref for the slider state
const sliderState = ref<{ scroller: HTMLElement | null; itemWidth: number }>({
	scroller: null,
	itemWidth: 0,
});

const nextSlide = () => {
	if (scrollerRef.value) {
		let el = scrollerRef.value;

		if (el && el instanceof HTMLElement) {
			sliderState.value.scroller?.scroll({
				left: el.scrollLeft + el.clientWidth,
				top: 0,
				behavior: "smooth",
			});
		}
	}
};

// Previous slider
const prevSlide = () => {
	if (scrollerRef.value) {
		let el = scrollerRef.value;

		if (el && el instanceof HTMLElement) {
			if (el.scrollLeft > 0) {
				sliderState.value.scroller?.scroll({
					left: el.scrollLeft - el.clientWidth,
					top: 0,
					behavior: "smooth",
				});
			}
		}
	}
};

// Update the categoryRefs array with the latest element reference
const updateCategoryRefs = (
	el: Element | ComponentPublicInstance | null,
	index: number
) => {
	// Clear the array if it's not empty to avoid stale references
	if (index === 0) {
		categoryRefs.value = [];
	}

	// Push the new reference into the array
	if (el) {
		categoryRefs.value.push(el);
	}
};

onMounted(async () => {
	await nextTick(() => {
        if (scrollerRef.value && scrollContainerRef.value) {
            let el = scrollerRef.value;
            let containerEl = scrollContainerRef.value;
            let prevButtonEl = prevButtonRef.value;
            let nextButtonEl = nextButtonRef.value;

            let check =
                el &&
                el instanceof HTMLElement &&
                containerEl &&
                containerEl instanceof HTMLElement &&
                prevButtonEl &&
                prevButtonEl instanceof HTMLButtonElement &&
                nextButtonEl &&
                nextButtonEl instanceof HTMLButtonElement;

            if (check) {
                // Update slider state
                sliderState.value = {
                    scroller: scrollerRef.value,
                    itemWidth: el.clientWidth,
                };

                el.addEventListener("scroll", () => {
                    if (el.scrollLeft === 0) {
                        prevButtonEl?.setAttribute("aria-hidden", "true");
                        (prevButtonEl as HTMLButtonElement).style.visibility = "hidden";
                        containerEl?.classList.add("remove-before");
                    } else {
                        prevButtonEl?.removeAttribute("aria-hidden");
                        (prevButtonEl as HTMLButtonElement).style.visibility = "visible";
                        containerEl.classList.remove("remove-before");
                    }

                    if (
                        Math.ceil(el.scrollLeft + el.clientWidth) >=
                        el.scrollWidth
                    ) {
                        nextButtonEl?.setAttribute("aria-hidden", "true");
                        (nextButtonEl as HTMLButtonElement).style.visibility = "hidden";
                        containerEl.classList.add("remove-after");
                    } else {
                        nextButtonEl?.removeAttribute("aria-hidden");
                        (prevButtonEl as HTMLButtonElement).style.visibility = "visible";
                        containerEl.classList.remove("remove-after");
                    }
                });
            }
        }
	});
});
</script>

<template>
	<div class="u-category-container" ref="scrollContainerRef" data-container>
		<nav class="u-category-scroll-controls">
			<button
				title="Previous"
				class="button-no-outline invisible"
				ref="prevButtonRef"
				@click="prevSlide"
				data-prev
			>
				<img
					src="/icons/chevron-left.svg"
					alt="Chevron Left Icon"
					class="w-3 h-3"
				/>
			</button>
			<button
				title="Next"
				class="button-no-outline visible"
				ref="nextButtonRef"
				@click="nextSlide"
				data-next
			>
				<img
					src="/icons/chevron-right.svg"
					alt="Chevron Right Icon"
					class="w-3 h-3"
				/>
			</button>
		</nav>
		<div
			class="u-category-scroll-container no-scrollbar w-full lg:w-[80rem]"
			ref="scrollerRef"
			data-slider
		>
			<CategoryBox
				v-for="(category, index) in CATEGORIES"
				:key="index"
				:category="category"
				@input="handleSelectOption"
				:ref="(el) => updateCategoryRefs(el, index)"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.u-category-container {
	position: relative;

	@media (min-width: 992px) {
		&::before,
		&::after {
			content: "";
			position: absolute;
			width: 40px;
			background: #ffffffab;
			height: -webkit-fill-available;
			top: 0;
		}

		&::before {
			background-image: linear-gradient(
				to right,
				rgb(255 255 255/0),
				white 40px
			);
			left: 0;
		}

		&::after {
			background-image: linear-gradient(
				to left,
				rgb(255 255 255/0),
				white 40px
			);
			right: 0;
		}

		&.remove-before::before {
			background: none;
		}

		&.remove-after::after {
			background: none;
		}
	}

	.u-category-scroll-container {
		display: grid;
		position: relative;
		overflow-x: scroll;
		// scroll-snap-type: x proximity;
		--contentscroller_auto-columns: max-content;
		--contentscroller_padding-inline-end: 0;
		--contentscroller_padding-inline-start: 0;
		--contentscroller_gap: 32px;
		margin: 0;
		justify-content: flex-start;
		padding-inline-end: var(
			--contentscroller_padding-inline-end,
			var(--contentscroller_peek, 32px)
		);
		padding-inline-start: var(
			--contentscroller_padding-inline-start,
			var(--contentscroller_peek, 32px)
		);
		scroll-snap-type: var(
			--contentscroller_scrollsnaptype,
			inline mandatory
		);
		grid-template-areas: var(--contentscroller_areas, none);
		grid-template-rows: var(--contentscroller_rows, none);
		grid-auto-columns: var(
			--contentscroller_auto-columns,
			calc(100% - var(--contentscroller_gap, 16px))
		);
		grid-auto-flow: column;
		-webkit-scrollbar-width: none;
		-moz-scrollbar-width: none;
		-ms-scrollbar-width: none;
		scrollbar-width: none;
		touch-action: var(
			--contentscroller_touch-action,
			pan-x pan-y pinch-zoom
		);
		gap: var(--contentscroller_gap, 16px);

		@media (max-width: 768px) {
			> .u-category {
				&:first-child {
					margin-left: 1.5rem;
				}

				&:last-child {
					margin-right: 1.5rem;
				}
			}
		}
	}

	.u-category-scroll-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		pointer-events: none;

		@media (max-width: 768px) {
			display: none;
		}

		> button {
			border: 0.5px solid rgb(0 0 0/0.3);
			transition: box-shadow 0.2s ease-in-out;
			pointer-events: all;
			-webkit-appearance: none;
			appearance: none;
			@apply inline-flex justify-center items-center bg-white rounded-full h-7 w-7;
		}
	}
}
</style>
