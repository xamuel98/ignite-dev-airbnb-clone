import type { IFilterQueryParams } from "~/types/listing";
interface ISearchStoreState {
    category: string;
    destination: string | null;
    guests: { [key: string]: number } | null;
    isPageScrolled: boolean;
    isActive: number;
    allowOutsideClick: boolean;
    filterQueryParams: IFilterQueryParams;
}

export const useSearchStore = defineStore('searchStore', {
    state: (): ISearchStoreState => ({
        category: 'all-categories',
        destination: '',
        guests: {},
        isPageScrolled: false,
        isActive: 0,
        allowOutsideClick: true,
        filterQueryParams: {},
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
        getFilterQueryParams: (state): IFilterQueryParams => state.filterQueryParams,
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
        SET_FILTER_QUERY(queryParams: IFilterQueryParams) {
            this.filterQueryParams = queryParams;
        },
    },
});
  




