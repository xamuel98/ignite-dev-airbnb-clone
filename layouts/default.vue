<script lang="tsx" setup>
import Navbar from "~/components/navbar/Navbar.vue";
import Toast from "~/components/Toast/Toast.vue";
import { useSearchStore } from "~/stores/search";

const mobileNavbarRef = ref<HTMLElement | null>(null);
const mapPillRef = ref<HTMLElement | null>(null);

const isMobile = useState('isMobile', () => false);

const route = useRoute();
const searchStore = useSearchStore();

const currentPage = computed(() => {
    return route.name;
});

const handleResize = () => {
    // Determine if the screen is mobile or not
    if(process.client) {
        isMobile.value = window.innerWidth <= 768;
        searchStore.SET_ACTIVE(0);

        // Add class when is mobile
        if(isMobile.value && !document.body.classList.contains('support-mobile-view')) {
            document.body.classList.add('support-mobile-view');
        } else {
            document.body.classList.remove('support-mobile-view');
        }
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
            let mapPillEl = mapPillRef.value;

            if(el && el instanceof HTMLElement) {
                el.classList.toggle("u-hide-mobile-navbar", scrollY);
            }
            
            if(mapPillEl && mapPillEl instanceof HTMLElement) {
                mapPillEl.classList.toggle("u-map-pill__bottom", window.scrollY > 320)
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
    <main class="relative" :key="$route.fullPath">
        <Navbar v-if="currentPage === 'index'"/>

        <Suspense>
            <slot />
        </Suspense>

        <div class="u-map-pill" v-if="currentPage === 'index'" ref="mapPillRef">
            <div class="u-map-pill__inner">
                <button type="button">
                    <div class="flex text-white font-medium text-xs/4 lg:text-sm/5">
                        <span class="inline-flex self-center text-white font-medium text-xs/4 lg:text-sm/5"> 
                            <span v-if="isMobile">Map</span>
                            <span v-else>Show map</span> 
                        </span>
                        <div class="ml-2 inline-flex items-center">
                            <img src="/icons/map.svg" alt="Map Icon" class="w-4 h-4">
                        </div>
                    </div>
                </button>
            </div>
        </div>

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
.u-map-pill {
    transform: translateY(-65px);
    transition: transform 0.2s cubic-bezier(0.455,0.03,0.515,0.955);
    @apply w-full fixed visible bottom-0 z-[999];

    &__inner {
        transition: -ms-transform 0.2s ease-in-out 0s, -webkit-transform 0.2s ease-in-out 0s, transform 0.2s ease-in-out 0s, opacity 0.15s linear 0s, visibility 0s ease 0s !important;
        @apply relative flex visible justify-center whitespace-nowrap mb-6 opacity-100 z-10;

        button {
            @apply appearance-none inline-flex items-center justify-center border border-[rgba(0,0,0,0.08)] rounded-3xl outline-0 m-0 py-2.5 lg:py-3.5 px-5 bg-[#222222] text-[#222222] cursor-pointer select-none pointer-events-auto touch-manipulation shadow-none;
        }
    }
}

.u-mobile-navbar {
    transition: transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s, visibility 0.2s ease 0s;
    @apply fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-center border-t border-[rgba(235,235,235,1)] bg-white h-[66px] w-full;

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
            color: #e31c5f;
            span {
                color: #e31c5f;
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