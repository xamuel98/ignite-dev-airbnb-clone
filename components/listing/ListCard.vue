<script setup lang="ts">
import type { ListCardProps } from '~/types/listing';
import ListImageSlider from './ListImageSlider.vue';
import { useListingsStore } from "~/stores/listings";

const props = defineProps<{ listing: ListCardProps, cardIndex: number }>();

const listingsStore = useListingsStore();

const listingContent = ref(props.listing);
const listingCardIndex = ref(props.cardIndex);

const getIsFavorite = computed(() => {
    return listingsStore.getListings[listingCardIndex.value].isFavorite;
});

const addToFavourite = () => {
    listingsStore.TOGGLE_IS_FAVORITE(listingContent.value.data.id);
};

watch(
  () => props.listing,
  () => { listingContent.value = props.listing }
);
</script>

<template>
    <div class="u-listing-card col-span-5 md:col-span-2 lg:col-span-1" :key="listingContent.data.id">
        <div class="flex flex-col justify-start items-center">
            <div class="relative">
                <button class="u-listing-favorite" @click.stop.prevent="addToFavourite">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" :class="{ 'is-favorite': getIsFavorite}" focusable="false" style="height: 24px; width: 24px; stroke-width: 2; overflow: visible;">
                        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                    </svg>
                </button>
                <ListImageSlider 
                    :images="listingContent.data.images" 
                    :cardIndex="cardIndex" 
                    :key="listingContent.data.id"
                />
            </div>
            <div class="u-listing-details">
                <div class="u-listing-detail u-detail-1">
                    <span class="location">{{listingContent.data.title}}</span>
                </div>
                <div class="u-listing-detail u-detail-2">
                    <span>
                        <img src="/icons/star.svg" alt="Star Icon" class="w-3 h-3">
                    </span>
                    <span class="rating-value">
                        {{ listingContent.data.rating }}
                    </span>
                </div>
                <div class="u-listing-detail u-detail-3">
                    Viewed 80,000 times last week
                </div>
                <div class="u-listing-detail u-detail-4">
                    {{ $filters.date(listingContent.reservation?.startDate) }} - {{ $filters.date(listingContent.reservation?.endDate)  }}
                </div>
                <div class="u-listing-detail u-detail-5">
                    <span class="price">{{ $filters.currency(listingContent.data.price)  }}</span>&nbsp;<span class="suffix">night</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.u-listing-card {
    text-decoration: none;
    &:hover {
        .u-listing-image__controls {
            visibility: visible;
        }
    }

    .u-listing-favorite {
        outline: 0;
        border: 0;
        cursor: pointer;
        background-color: transparent;
        height: 32px;
        width: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 2;
        right: 12px;
        top: 12px;

        svg {
            fill: rgba(0, 0, 0, 0.5);
            stroke: #FFFFFF;

            &.is-favorite {
                fill: rgb(248, 54, 54);
                stroke: rgb(248, 54, 54);
            }
        }
    }

    .u-listing-details {
        display: grid;
        grid-template-columns: minmax(0, 1fr) max-content;
        grid-template-rows: unset;
        grid-column-gap: 8px;
        grid-row-gap: 2px;
        width: 100%;
        margin-top: 10px;

        .u-listing-detail {
            line-height: inherit;
            overflow: clip;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            word-break: break-all;

            &.u-detail-1 {
                grid-area: 1 / 1 / 2 / 5;
                font-size: .9375rem;
                font-weight: 500;
                color: #222222;
            }

            &.u-detail-2 {
                grid-area: 1 / 5 / 2 / 6;

                @apply flex justify-start flex-nowrap align-baseline items-center space-x-1;
                span {
                    &.rating-value {
                        font-size: smaller;
                        font-variant-numeric: tabular-nums;
                    }
                }
            }

            &.u-detail-3 {
                grid-area: 2 / 1 / 3 / 6;
            }

            &.u-detail-3,
            &.u-detail-4 {
                font-size: .875rem;
                color: #717171;
            }

            &.u-detail-4 {
                grid-area: 3 / 1 / 4 / 6;
            }

            &.u-detail-5 {
                grid-area: 4 / 1 / 5 / 6;
                color: #222222;

                @apply flex justify-start flex-wrap align-baseline mt-1.5;
                span {
                    &.price {
                        font-weight: 500;
                        font-size: .9375rem;
                        line-height: 1.25rem;
                    }
                    &.suffix {
                        font-weight: 400;
                        font-size: .875rem;
                        line-height: 1.125rem;
                        overflow: initial;
                        text-overflow: initial;
                    }
                }
            }
        }
    }
}
</style>