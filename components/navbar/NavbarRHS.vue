<script lang="ts" setup></script>

<template>
	<div class="inline-flex space-x-2">
		<div class="inline-flex items-center justify-end leading-5">
			<NuxtLink
				to="/"
				class="navbar-button p-3 button-no-outline text-nowrap whitespace-nowrap font-medium text-sm"
				>Airbnb your home</NuxtLink
			>
			<button class="navbar-button button-no-outline select-none p-3">
				<img
					src="/icons/globe.svg?url"
					alt="Language Globe Icon"
					class="h-4 w-4"
				/>
			</button>
		</div>
		<NavbarRHSAvatar />
	</div>
</template>

<style lang="scss">
.c {
}
</style>
