<script lang="ts">
	import { user, auth, stats } from '../stores';
	import ToolbarActions from '../components/toolbarActions.svelte';
	import AboutDialog from '../components/aboutDialog.svelte';

	let version = __APP_VERSION__;
	$: isLoggedIn = $auth === 'logged_in';

	let aboutDialog: AboutDialog;
</script>

<div class="toolbar">
	<small class="toolbar_title">
		<h1>Where You've Been</h1>
		<span class="toolbar_version">v{version}</span>
		<button class="button about_btn" on:click={() => aboutDialog.open()} aria-label="About">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-md w-md" aria-hidden="true">
				<path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" />
			</svg>
		</button>
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

<AboutDialog bind:this={aboutDialog} />

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
		align-items: center;

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

	.about_btn {
		padding: 3px;
		line-height: 0;
		cursor: pointer;
		margin-left: 0.35rem;
		color: var(--muted);
		align-self: center;

		&:hover {
			color: var(--text);
		}
	}
</style>
