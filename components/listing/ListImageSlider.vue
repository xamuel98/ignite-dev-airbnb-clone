<script setup lang="ts">
import type { ImageProps } from "~/types/listing";
import type { Slider } from "~/types";

const { images, cardIndex } = defineProps<{
	images: ImageProps[];
	cardIndex: number;
}>();

const currentSlideIndex = ref<number>(0);
const scrollerRef = ref<HTMLElement | null>(null); // Target scroller 
const itemWidth = ref<number>(0); // Define a ref for the item width
const imageRefs = ref<Array<Element | ComponentPublicInstance | null>>([]); // Target each slider image wrapper

// Define a ref for the slider state
const sliderState = ref<{ scroller: HTMLElement | null; itemWidth: number }>({
    scroller: null,
    itemWidth: 0,
});

const goToSlide = (index: number) => {
	currentSlideIndex.value = index;
};

// Next slider
const nextSlide = () => {
	if (currentSlideIndex.value < images.length - 1) {
		sliderState.value.scroller?.scrollBy({
			left: sliderState.value.itemWidth,
			top: 0,
			behavior: "smooth",
		});
		currentSlideIndex.value++;
	}
};

// Previous slider
const prevSlide = () => {
	if (currentSlideIndex.value > 0) {
		sliderState.value.scroller?.scrollBy({
			left: -sliderState.value.itemWidth,
			top: 0,
			behavior: "smooth",
		});
		currentSlideIndex.value--;
	}
};

// Translate indicators
const translateX = computed(() => {
    if (currentSlideIndex.value <= 4) {
        return 0;
    } else {
        return `calc(-${currentSlideIndex.value - 4} * 11px)`;
    }
});

// Update the imageRefs array with the latest element reference
const updateImageRefs = (el: Element | ComponentPublicInstance | null, index: number) => {
    // Clear the array if it's not empty to avoid stale references
    if (index === 0) {
        imageRefs.value = [];
    }
    
    // Push the new reference into the array
    if (el) {
        imageRefs.value.push(el);
    }
};

onMounted(async() => {
	await nextTick(() => {
		// DOM is now updated
		window.requestAnimationFrame(() => {
			if(scrollerRef.value) {
				let el = imageRefs.value[currentSlideIndex.value];

				if (el && el instanceof HTMLElement) {
					itemWidth.value = el.clientWidth;
					console.log(el.clientWidth);
					
					// Update slider state
					sliderState.value = { scroller: scrollerRef.value, itemWidth: el.clientWidth };
				}
			}
		})
	});
});
</script>

<template>
	<div class="u-listing-image" :key="cardIndex">
		<div class="u-listing-image__carousel-wrapper">
			<div class="u-listing-image__carousel no-scrollbar" ref="scrollerRef">
				<div
					v-for="(image, index) in images"
					:key="index"
					class="u-listing-image__carousel-slide"
                    :ref="el => updateImageRefs(el, index)"
				>
					<img :src="image.src" :alt="image.alt" :key="index" />
				</div>
			</div>
			<div class="u-listing-image__controls">
				<button
					class="u-listing-image__control"
					@click.stop.prevent="prevSlide"
					data-direction="-1"
					:disabled="currentSlideIndex === 0"
					:class="{ '!opacity-100': currentSlideIndex !== 0 }"
				>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                        <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
                    </svg>
				</button>
				<button
					class="u-listing-image__control"
					@click.stop.prevent="nextSlide"
					data-direction="1"
					:disabled="currentSlideIndex === images.length - 1"
					:class="{
						'!opacity-100': currentSlideIndex !== images.length - 1,
					}"
				>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                        <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
                    </svg>
				</button>
			</div>
		</div>
		<div class="b">
			<div class="c">
				<div
					class="u-listing-image__indicators"
					:style="{ '--translateX': translateX }"
					:aria-label="`Photo ${Number(currentSlideIndex) + 1} of ${
						images.length
					}`"
				>
					<span
						v-for="(image, index) in images"
						:key="index"
						:class="{ active: Number(index) === currentSlideIndex, 'small-scale': index === currentSlideIndex - 4 }"
						@click="goToSlide(Number(index))"
					></span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.u-listing-image {
	--height: 23rem;
	height: var(--height);
	width: 100%;
	border-radius: 10px;
	overflow: hidden;
	position: relative;

	&__carousel-wrapper {
		overflow: hidden;
		position: relative;
		height: inherit;
	}
	&__carousel {
		display: flex;
		height: inherit;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		overscroll-behavior-x: contain;

		&-slide {
			flex: 0 0 auto;
			scroll-snap-align: start;
			width: 100%;
			height: var(--height);
			border-radius: 10px;
			display: block;

			img {
				width: 100%;
				height: inherit;
				object-fit: cover;
				object-position: center;
			}
		}
	}
	&__controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		pointer-events: none;
        visibility: hidden;

		.u-listing-image__control {
            border: 0.5px solid rgb(0 0 0/0.3);
            transition: box-shadow 0.2s ease-in-out;
            pointer-events: all;
            -webkit-appearance: none;
            appearance: none;
            @apply inline-flex justify-center items-center p-4 mx-4 lg:mx-1.5 opacity-0 bg-white rounded-full h-7 w-7;
		}
	}
	.b {
		justify-content: center;
		align-items: flex-end;
		height: 100%;
		display: flex;
		position: absolute;
		width: 100%;
		top: 0;

		.c {
			max-width: 55px;
			padding-bottom: 12px;
			display: flex;
			overflow: hidden;

			.u-listing-image__indicators {
				display: flex;
				align-items: flex-end;
				justify-content: center;
				transform: translateX(var(--translateX));
				will-change: transform;
				transition: transform 0.2s
					cubic-bezier(0.455, 0.03, 0.515, 0.955);

				span {
					height: 6px;
					width: 6px;
					min-width: 6px;
					opacity: 0.6;
					transform: scale(1);
					transition: opacity 0.2s
						cubic-bezier(0.455, 0.03, 0.515, 0.955);
					margin-right: 2.5px;
					margin-left: 2.5px;
					border-radius: 50%;
					background-color: #ffffff;

                    &.small-scale {
                        transform: scale(.8);
                    }

					&.active {
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>
