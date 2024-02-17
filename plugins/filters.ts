import currencyFilter from '~/filters/currency';
import dateFilter from '~/filters/date';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.globalProperties.$filters = {
        currency: currencyFilter,
        date: dateFilter
    };
});