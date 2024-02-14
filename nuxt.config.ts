// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    vue: {
        config: {
            compatConfig: {
                MODE: 2,
            },
        },
    },
    plugins: [
        '~/plugins/clickOutsideDirective.ts'
    ],
    modules: ['@vueuse/motion/nuxt'],
    css: ['~/assets/scss/main.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});