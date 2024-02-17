<script lang="ts" setup>
import { useSearchStore } from "~/stores/search";

const route = useRoute();
const searchStore = useSearchStore();

const currentPage = computed(() => {
	return route.name;
});

const setSearchItemToActive = (index: number) => {
	searchStore.SET_ACTIVE(index);

	// Disable v-click-outside action on form
	searchStore.SET_ALLOW_OUTSIDE_CLICK(false);

	if(document) {
		if(!document.body.classList.contains('cb')) {
			document.body.classList.add('cb');
			document.querySelector('.u-navbar-search-small')?.classList.add('override--u-navbar-search-small__active');
		}
	}
}

</script>

<template>
	<div class="relative w-1/2 u-navbar-cs">
		<div class="change-size-transform">
			<div class="h-20 w-max mx-auto">
				<div class="u-links">
					<NuxtLink
						to="/"
						class="u-link navbar-button"
						:class="{ active: currentPage === 'index' }"
						>Stays</NuxtLink
					>
					<NuxtLink to="/experiences" class="u-link navbar-button"
						>Experiences</NuxtLink
					>
					<NuxtLink to="/online-experiences" class="u-link navbar-button"
						>Online Experiences</NuxtLink
					>
				</div>
			</div>
			<NavbarSearch />
		</div>

		<div class="u-navbar-search-small u-navbar-search-small__active override--u-navbar-search-small__active relative inline-flex items-center w-auto h-[48px] bg-white border border-[#DDDDDD] rounded-full shadow-[0_3px_12px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.08)] outline-0">
			<div class="u-navbar-search-small__tab" @click="setSearchItemToActive(1)">
				<span>Anywhere</span>
			</div>
			<span class="b-divider"></span>
			<div class="u-navbar-search-small__tab">
				<span>Any week</span>
			</div>
			<span class="b-divider"></span>
			<div class="u-navbar-search-small__tab" @click="setSearchItemToActive(4)">
				<span>Guest</span>
			</div>
			<button type="button" class="navbar-button u-navbar-search-small__button">
				<img
					src="/icons/search.svg?url"
					alt="Search Icon"
					class="search-button-icon"
				/>
			</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.u-navbar-cs {
	transition: transform 250ms cubic-bezier(0.2,0,0,1),opacity 150ms 100ms cubic-bezier(0.2,0,0,1),visibility 0ms 125ms;
	-webkit-transition: transform 250ms cubic-bezier(0.2,0,0,1),opacity 150ms 100ms cubic-bezier(0.2,0,0,1),visibility 0ms 125ms;
}
.u-links {
	@apply inline-flex justify-center items-center text-center px-6 h-20;
	a.u-link {
		@apply text-[#717171] text-[.9375rem] py-2.5 px-4;
		&:hover,
		&.active {
			@apply text-[#222222];
		}
	}
}


.u-navbar-search-small {
	transform: scale(2.4,1.375) translate(29%, 10%);
    opacity: 0;
    visibility: hidden;
	transition: transform 250ms cubic-bezier(0.2,0,0,1),opacity 150ms 100ms cubic-bezier(0.2,0,0,1),visibility 0ms 125ms;
     -webkit-transition: transform 250ms cubic-bezier(0.2,0,0,1),opacity 150ms 100ms cubic-bezier(0.2,0,0,1),visibility 0ms 125ms;

	&__tab { 
		border: 1px solid transparent;
		text-align: inherit;
		background: transparent;
		font-weight: inherit;
		cursor: pointer;
		margin: -1px;
		padding: 0;
		padding-left: 8px;
		line-height: inherit;
		font-size: inherit;
		display: flex;
		align-items: center;
		border-radius: 4px;
		position: relative;
		color: inherit;
		height: 48px;
		outline: none;

		span {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			flex: 1 1 auto;
			line-height: 1.375rem;
			font-weight: 500;
			font-size: 0.875rem;
			padding: 0 16px;
			min-width: 80px;
		}
	}

	&__button {
		border-radius: 50%;
		padding: 10px;
		margin: 7px 7px 7px 0;
		width: 32px;
		height: 32px;
		color: #FFFFFF;
		background-color: #FF385C;

		img {
			filter: invert(1) grayscale(1);
			-webkit-filter: invert(1) grayscale(1);
		}
	}

	.b-divider {
		width: 1px;
		height: 24px;
		flex: 0 0 1px;
		background-color: #DDDDDD;
	}
}
</style>
