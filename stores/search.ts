import type { ListCardProps as Listing } from "~/types/listing";

interface ISearchStoreState {
    category: string;
    destination: string | null;
    guests: { [key: string]: number } | null;
    isPageScrolled: boolean;
    isActive: number;
    allowOutsideClick: boolean;
    listings: Listing[];
}

export const useSearchStore = defineStore('searchStore', {
    state: (): ISearchStoreState => ({
        category: '',
        destination: '',
        guests: {},
        isPageScrolled: false,
        isActive: 0,
        allowOutsideClick: true,
        listings: []
    }),
    getters: {
        getCategory: (state): string | null =>
            state.category === null ? null : state.category,
        getDestination: (state): string | null =>
            state.destination === null ? null : state.destination,
        getGuests: (state): { [key: string]: number } | null =>
            state.guests === null ? null : state.guests,
        getIsPageScrolled: (state): boolean =>  state.isPageScrolled,
        getIsActive: (state): number =>  state.isActive,
        getAllowOutsideClick: (state): boolean =>  state.allowOutsideClick,
        getListings: (state): Listing[] =>  state.listings,
    },
    actions: {
        SET_CATEGORY(category: string) {
            this.category = category;
        },
        SET_DESTINATION(destination: string) {
            this.destination = destination;
        },
        SET_GUESTS(guests: { [key: string]: number }) {
            this.guests = guests;
            console.log("here", this.guests);
        },
        SET_PAGE_SCROLLED(activity: boolean) {
            this.isPageScrolled = activity;
        },
        SET_ACTIVE(active: number) {
            this.isActive = active;
        },
        SET_ALLOW_OUTSIDE_CLICK(allow: boolean) {
            this.allowOutsideClick = allow;
        },
        TOGGLE_IS_FAVORITE(listingId: string) {
            const listing = this.listings.find(listing => listing.data.id === listingId);
            if(listing) listing.isFavorite = !listing.isFavorite;
        },
    },
});
  




