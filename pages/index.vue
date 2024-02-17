<script setup lang="ts">
import { LISTINGS } from "~/utils/constants";
import type { ListCardProps as Listing } from "~/types/listing";
import ListCard from "~/components/listing/ListCard.vue";
import { useSearchStore } from "~/stores/search";
import { useListingsStore } from "~/stores/listings";

definePageMeta({
    layout: 'default'
});

const searchStore = useSearchStore();
const listingsStore = useListingsStore();

const loading = ref<boolean>(true);

const isPageScrolled = computed(() => {
	return searchStore.getIsPageScrolled;
});

const addToFavourite = (id: string) => {
    listingsStore.TOGGLE_IS_FAVORITE(id);
};

// Get selected category for filter
const getFilterCategory = computed(() => {
    return searchStore.getCategory;
});

// Filter listing by category
const filterListingsByCategory = (listings: Listing[]) => {
    if(!listings){
        return [];
    } else {
        if (!getFilterCategory.value) return listings;
        return listings
            .filter(({data}) => data.category.toLowerCase() === getFilterCategory.value)
    }
};

// Get listing data
const getListingData = computed(() => {
	if (!loading.value){
        const filteredListings = filterListingsByCategory(listingsStore.getListings);
        return filteredListings;
    }
});

// Watch isPageScrolled for changes to set class name
watch(
	() => isPageScrolled.value,
	(newValue) => {
		if (window && document) {
			if (newValue) {
				document.body.classList.add("u-page-scroll-active");
				if (document.body.classList.contains("cb"))
					document.body.classList.remove("cb");
			} else {
				document.body.classList.remove("u-page-scroll-active");
			}

			window.addEventListener("scroll", () => {
				if (document.body.classList.contains("cb")) {
					document.body.classList.remove("cb");
					document
						.querySelector(".u-navbar-search-small")
						?.classList.remove(
							"override--u-navbar-search-small__active"
						);
				}
			});
		}
	}
);

onMounted(() => {
	// SImulate data fetching to show shimmer
	loading.value = true;

	setTimeout(() => {
		// Once data is fetched, set loading to false
		loading.value = false;
	}, 3000);
});
</script>

<template>
	<div class="px-6 md:px-10 lg:px-10 2xl:px-20 mt-6 lg:mt-3 mb-[calc(66px+24px)] lg:mb-0">
		<div class="grid grid-cols-5 gap-x-6 gap-y-10">
			<Shimmer
				v-if="loading"
				:loading="loading"
				:items-count="LISTINGS.length"
			/>
			<ListCard
				v-for="(listing, index) in getListingData"
				:key="index"
				:card-index="index"
				:listing="listing"
			/>
		</div>
		<div v-if="getListingData && getListingData.length === 0" class="">
			<h1 class="text-center text-sm/4">No listing under this category! Try other categories 😊</h1>
		</div>
	</div>
</template>

<style lang="scss" scoped>
</style>
