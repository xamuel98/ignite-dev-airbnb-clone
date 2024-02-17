// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    vue: {
        config:  {
            compatConfig: {
                MODE: 2,
            },
        },
    },
    plugins: [
        '~/plugins/clickOutsideDirective.ts',
        '~/plugins/filters.ts',
    ],
    modules: ['@vueuse/motion/nuxt', '@pinia/nuxt',],
    css: ['~/assets/scss/main.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});