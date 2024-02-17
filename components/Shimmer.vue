<script lang="ts" setup>
const { loading, itemsCount } = defineProps<{
	loading: boolean;
	itemsCount: number;
}>();

const getShimmer = computed(() => {
	if (loading) return itemsCount;
});
</script>

<template>
	<div class="u-shimmer-container" v-for="n in getShimmer" :key="n">
		<div class="u-shimmer">
			<div class="u-shimmer-image"></div>
			<div class="u-shimmer-details">
				<div class="u-shimmer-detail u-detail-1">
					<div></div>
				</div>
				<div class="u-shimmer-detail u-detail-2">
					<div></div>
				</div>
				<div class="u-shimmer-detail u-detail-3">
					<div></div>
				</div>
				<div class="u-shimmer-detail u-detail-4">
					<div></div>
				</div>
				<div class="u-shimmer-detail u-detail-5">
					<div></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@mixin shimmer-mixin {
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent,
		rgba(255, 255, 255, 0.2),
		transparent
	);
	animation: shimmer 2s infinite linear;
}

.u-shimmer-container {
	--height: 23rem;
	--shimmer-color: #e2e2e2;
	position: relative;
	overflow: hidden;
	@apply col-span-5 md:col-span-2 lg:col-span-1;

	.u-shimmer {
		@apply flex flex-col justify-start items-center;

		.u-shimmer-image {
			height: var(--height);
			width: 100%;
			border-radius: 10px;
			overflow: hidden;
			position: relative;
			background-color: var(--shimmer-color);
			border-radius: 10px;
			&::after {
				content: "";
				position: absolute;
				@include shimmer-mixin;
			}
		}

		.u-shimmer-details {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-template-rows: repeat(4, 1fr);
			grid-column-gap: 8px;
			grid-row-gap: 5px;
			width: 100%;
			margin-top: 10px;

			.u-shimmer-detail {
				> div {
					height: 20px;
					background-color: var(--shimmer-color);
					border-radius: 4px;
					&::after {
						content: "";
						position: absolute;
						@include shimmer-mixin;
					}
				}

				&:not(:nth-child(1)),
				&:not(:nth-child(2)) {
					> div {
						width: 80%;
					}
				}

				&:nth-child(1),
				&:nth-child(2) {
					> div {
						width: 100%;
					}
				}

				&.u-detail-1 {
					grid-area: 1 / 1 / 2 / 5;
				}

				&.u-detail-2 {
					grid-area: 1 / 5 / 2 / 6;
				}

				&.u-detail-3 {
					grid-area: 2 / 1 / 3 / 6;
				}

				&.u-detail-4 {
					grid-area: 3 / 1 / 4 / 6;
				}

				&.u-detail-5 {
					grid-area: 4 / 1 / 5 / 6;
					color: #222222;
				}
			}
		}

		@keyframes shimmer {
			0% {
				transform: translateX(-100%);
			}

			100% {
				transform: translateX(100%);
			}
		}
	}
}
</style>
