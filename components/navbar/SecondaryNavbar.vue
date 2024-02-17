<script lang="ts" setup>
import Categories from './category/Categories.vue';
import { useSearchStore } from '~/stores/search';

const searchStore = useSearchStore();

const secondaryNavbarRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
    if(window && document) {
        window.addEventListener("scroll", function() {
            let scrollY = window.scrollY > 0;
            let el = secondaryNavbarRef.value;

            if(el && el instanceof HTMLDivElement) {
                el.classList.toggle("u-nav-scroll", scrollY); 
                searchStore.SET_PAGE_SCROLLED(scrollY); 
            }           
        });
    };
});
</script>

<template>
    <div class="flex items-center sticky z-10 w-full h-max lg:h-[90px] pt-2 u-secondary-navbar" ref="secondaryNavbarRef">
        <div class="relative flex justify-start items-center overflow-x-hidden space-x-4 md:px-10 lg:px-10 2xl:px-20">
            <div class="w-[-webkit-fill-available] lg:w-auto">
                <Categories />
            </div>
            <button type="button" class="text-xs font-medium border border-[#DDDDDD] bg-white h-12 py-2 px-4 rounded-xl cursor-pointer hidden lg:inline-flex justify-center items-center gap-2 align-middle outline-0 shadow-none">
                <img src="/icons/filter.svg" alt="Filter Icon" class="w-4 h-4">
                <span>Filters</span>
            </button>
            <button type="button" class="text-xs font-medium border border-[#DDDDDD] bg-white h-12 py-2 px-4 rounded-xl cursor-pointer hidden lg:inline-flex justify-center items-center gap-2 align-middle outline-0 shadow-none">
                <span>Display total before taxes</span>
                <label class="switch" for="taxes">
                    <input type="checkbox" name="taxes" value="taxes" id="taxes">
                    <span class="slider round">
                        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                            <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z"></path>
                        </svg>
                    </span>
                </label>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.u-secondary-navbar {
    top: 80px;
    z-index: 99;
    background: #ffffff;
    transition: transform 250ms cubic-bezier(0.2,0,0,1),opacity 150ms 100ms cubic-bezier(0.2,0,0,1),visibility 0ms 125ms;

    @media (max-width: 768px) {
		top: 77px;
        @apply shadow-md shadow-[rgba(0,0,0,.045)];
	}

    // @apply transition-all duration-150;

    @media (min-width: 992px) {
		&.u-nav-scroll {
            @apply shadow-md shadow-[rgba(0,0,0,.045)];
        }
	}
}
.switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 24px;

    input { 
        opacity: 0;
        width: 0;
        height: 0;
        transition: .3s all;

        &:checked + .slider {
            transition: .3s all;
            background-color: #222222;

            svg {
                fill: #222222;
                z-index: 2;
                opacity: 1;
                transition: .3s all;
            }
        }

        &:hover + .slider {
            transition: .3s all;
            background-color: #222222;
        }

        &:focus + .slider {
            box-shadow: 0 0 1px #222222;
        }

        &:checked + .slider:before {
            -webkit-transform: translateX(.75rem);
            -ms-transform: translateX(.75rem);
            transform: translateX(.75rem);
        }
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;

        &:before {
            position: absolute;
            content: "";
            height: 1.375rem;
            width: 1.375rem;
            left: .0625rem;
            bottom: .0625rem;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            z-index: 1;
        }

        svg {
            height: 12px;
            width: 12px;
            fill: transparent;
            position: absolute;
            right: 0.345rem;
            top: 0.345rem;
            z-index: 0;
            opacity: 0;
        }

        &.round {
            border-radius: 34px;

            &:before {
                border-radius: 50%;
            }
        }

    }
}
</style>