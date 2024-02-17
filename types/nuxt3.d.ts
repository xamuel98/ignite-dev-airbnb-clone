import { FilterOptions } from 'nuxt3';

declare module 'vue' {
    interface ComponentCustomProperties {
        $filters: FilterOptions;
    }
}
