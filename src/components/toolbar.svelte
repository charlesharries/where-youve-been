<script lang="ts">
	import { user, auth, stats } from '../stores';
	import ToolbarActions from '../components/toolbarActions.svelte';

	let version = __APP_VERSION__;
	$: isLoggedIn = $auth === 'logged_in';
</script>

<div class="toolbar">
	<small class="toolbar_title">
		<h1>Where You've Been</h1>
		<span class="toolbar_version">v{version}</span>
	</small>
	<p class="toolbar_user">
		{#if isLoggedIn}
			<img
				src={$user?.athlete.profile}
				class="toolbar_pic"
				alt={`${$user?.athlete.firstname} ${$user?.athlete.lastname}`}
			/>
			<strong class="ml-md">
				{$user?.athlete.firstname}
				{$user?.athlete.lastname}
			</strong>
			{#if $stats.totalDistance > 0}
				<small class="text-muted ml-md">
					{Math.round($stats.totalDistance / 1000)} km travelled
				</small>
			{/if}
		{/if}
	</p>
	<div class="toolbar_actions">
		<ToolbarActions />
	</div>
</div>

<style lang="scss">
	.toolbar {
		position: fixed;
		z-index: 1;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		background-color: var(--background);
		display: flex;
		border-radius: 15px;
		padding: 1rem;
		align-items: center;
		box-shadow: var(--shadow);

		@media (max-width: 768px) {
			flex-direction: column;

			& > * + * {
				margin-top: 10px;
			}
		}
	}

	.toolbar_title {
		display: flex;
		align-items: baseline;

		h1 {
			font-size: inherit;
		}
	}

	.toolbar_version {
		margin-left: 0.5rem;
	}

	.toolbar_user {
		flex: 1;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toolbar_pic {
		height: 30px;
		width: 30px;
		border-radius: 100%;
	}
</style>
