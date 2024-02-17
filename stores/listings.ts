import type { ListCardProps as Listing } from "~/types/listing";
import { LISTINGS } from "~/utils/constants";
import useToast from '~/composables/useToast';

interface IListingsStoreState {
    listings: Listing[];
    favorites: { [key: number]: string }[]
}

const { createToast } = useToast();

export const useListingsStore = defineStore('listingsStore', {
    state: (): IListingsStoreState => ({
        listings: [...LISTINGS],
        favorites: [],
    }),
    getters: {
        getListings: (state): Listing[] =>  state.listings,
    },
    actions: {
        TOGGLE_IS_FAVORITE(listingId: string) {
            const listing = this.listings.find(listing => listing.data.id === listingId);
            if(listing) listing.isFavorite = !listing.isFavorite;

            const index = this.favorites.indexOf(listingId);
            if (index === -1) {
                this.favorites.push(listingId);
                createToast('success', 'Listing added to favorites');
            } else {
                this.favorites.splice(index, 1);
                createToast('warning', 'Removed listing to favorites');
            }
        },
    },
});
  




