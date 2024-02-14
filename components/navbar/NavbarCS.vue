<script lang="ts" setup>
const route = useRoute();

const currentPage = computed(() => {
	return route.name;
});
</script>

<template>
	<div class="relative w-1/2">
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
</template>

<style lang="scss" scoped>
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
</style>
