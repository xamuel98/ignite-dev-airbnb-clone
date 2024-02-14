<script lang="tsx" setup>
const isDropdownMenuOpen = ref<boolean>(false);

/**
 * @description Toggle isDropdownMenuOpen state
 */
const toggleUserActionDropdown = () => {
	isDropdownMenuOpen.value = !isDropdownMenuOpen.value;
};

const closeUserActionDropdown = () => {
	isDropdownMenuOpen.value = false;
};

const HamburgerIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		aria-hidden="true"
		role="presentation"
		focusable="false"
		style="fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;"
	>
		<g fill="none">
			<path d="M2 16h28M2 24h28M2 8h28"></path>
		</g>
	</svg>
);

const UserAvatarIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		aria-hidden="true"
		role="presentation"
		focusable="false"
		class="h-full w-full"
		style="height: 100%; width: 100%; fill: currentcolor;"
	>
		<path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
	</svg>
);
</script>

<template>
	<div
		class="relative inline leading-5"
		v-click-outside="closeUserActionDropdown"
	>
		<button
			class="button-no-outline user-action-button"
			@click="toggleUserActionDropdown()"
		>
			<HamburgerIcon />
			<div class="h-8 w-8 text-[#717171]">
				<UserAvatarIcon />
			</div>
		</button>
		<div class="user-action-dropdown-menu" v-if="isDropdownMenuOpen">
			<ul>
				<li class="first:font-medium">
					<NuxtLink to="/">Sign up</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/">Log in</NuxtLink>
				</li>
				<div class="border-t border-[#DDDDDD] my-1.5"></div>
				<li>
					<NuxtLink to="/">Gift cards</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/">Airbnb your home</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/">Help Center</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.user-action-button {
	@apply inline-flex justify-center items-center align-middle space-x-3.5  py-2 pr-2 pl-3.5 rounded-full border border-[#DDDDDD] hover:transition-shadow duration-[.2s] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)];
}

.user-action-dropdown-menu {
	@apply absolute top-14 right-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-60 rounded-xl;
	ul {
		@apply py-1.5;
		li {
			@apply text-sm font-normal;
			&:first-child {
				a {
					@apply font-medium;
				}
			}
			a {
				@apply w-full h-full inline-block decoration-transparent outline-0 text-sm font-normal p-3 bg-transparent hover:bg-[#F7F7F7] hover:transition-colors;
			}
		}
	}
}
</style>
