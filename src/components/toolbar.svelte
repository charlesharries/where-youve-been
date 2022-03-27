<script lang="ts">
	import { user } from '../stores';
	import ToolbarActions from '../components/toolbarActions.svelte';

	let version = import.meta.env.VITE_APP_VERSION as string;
</script>

<div class="toolbar">
	<small class="toolbar_title">
		<h1>Where You've Been</h1>
		<span class="toolbar_version">v{version}</span>
	</small>
	<div class="toolbar_user">
		<p>
			<strong>
				{$user.athlete.firstname}
				{$user.athlete.lastname}
			</strong>
		</p>
	</div>
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
	}
</style>
