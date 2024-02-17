<script lang="tsx" setup>
import Navbar from "~/components/navbar/Navbar.vue";
import Toast from "~/components/Toast/Toast.vue";

const mobileNavbarRef = ref<HTMLElement | null>(null);
const isMobile = useState('isMobile', () => false);

const route = useRoute();

const currentPage = computed(() => {
    return route.name;
});

const handleResize = () => {
    // Determine if the screen is mobile or not
    if(process.client) {
        isMobile.value = window.innerWidth <= 768;
    }
};	

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="fill: none; height: 24px; width: 24px; stroke: currentcolor; stroke-width: 2.66667; overflow: visible;">
        <g fill="none">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m19 19 11 11"></path>
        </g>
    </svg>
);

const WishlistIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="fill: none; height: 24px; width: 24px; stroke: currentcolor; stroke-width: 2; overflow: visible;">
        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 24px; width: 24px; stroke: currentcolor; stroke-width: 2; overflow: visible;">
        <g fill="none">
            <circle cx="16" cy="16" r="14"></circle>
            <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62"></path>
        </g>
    </svg>
);

onMounted(() => {
    if(window && document) {
        window.addEventListener("scroll", function() {
            let scrollY = window.scrollY > 250;
            let el = mobileNavbarRef.value;

            if(el && el instanceof HTMLElement) {
                el.classList.toggle("u-hide-mobile-navbar", scrollY);
            }           
        });

        // Initial check on mount
		handleResize();

        // Listen for window resize events
		window.addEventListener("resize", handleResize);
    };
});

onUnmounted(() => {
    // Cleanup the event listener when the component unmounts
	window.removeEventListener("resize", handleResize);
})
</script>

<template>
    <main class="relative">
        <Navbar v-if="currentPage === 'index'"/>

        <Suspense>
            <slot />
        </Suspense>

        <nav v-if="isMobile" class="u-mobile-navbar" ref="mobileNavbarRef">
            <div class="u-mobile-navbar__links">
                <NuxtLink to="/" class="u-mobile-navbar__link">
                    <SearchIcon class="u-mobile-navbar__link-icon" />
                    <span>Explore</span>
                </NuxtLink>
                <NuxtLink to="/wishlists" class="u-mobile-navbar__link">
                    <WishlistIcon class="u-mobile-navbar__link-icon" />
                    <span>Wishlists</span>
                </NuxtLink>
                <NuxtLink to="/login" class="u-mobile-navbar__link">
                    <UserIcon class="u-mobile-navbar__link-icon" />
                    <span>Login</span>
                </NuxtLink>
            </div>
        </nav>
    </main>
    <client-only>
        <Toast/> 
    </client-only>
</template>

<style lang="scss" scoped>
.u-mobile-navbar {
    transition: transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s, visibility 0.2s ease 0s;
    @apply fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center border-t border-[rgba(235,235,235,1)] bg-white h-[66px] w-full;

    &.u-hide-mobile-navbar {
        transform: translateY(100%) !important;
        visibility: hidden !important;
    }

    &__links {
        @apply flex justify-center items-center mx-auto w-fit gap-14;
    }

    &__link {
        @apply flex flex-col justify-center items-center space-y-2 no-underline text-center max-w-12;

        &.router-link-exact-active {
            color: red;
            span {
                color: red;
            }
        }

        &:not(.router-link-exact-active) {
            color: rgba(113,113,113,.8);
        }

        span {
            @apply text-xs/3 font-normal text-[rgba(113,113,113,.8)] text-nowrap text-center text-ellipsis break-words line-clamp-1;
        }
    }
}
</style>