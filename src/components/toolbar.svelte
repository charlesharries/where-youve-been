<script lang="ts">
	import { user } from '../stores';
	import FetchActivities from '../components/fetchActivities.svelte';
	import Logout from '../components/logout.svelte';
	import HeatmapToggle from '../components/heatmapToggle.svelte';

	let version = import.meta.env.VITE_APP_VERSION as string;
</script>

<div class="toolbar">
	<div class="toolbar_title">
		<h1>Where You've Been</h1>
		<small>v{version}</small>
	</div>
	<div class="toolbar_user">
		<p>
			<strong>
				{$user.athlete.firstname}
				{$user.athlete.lastname}<br />
			</strong>
			{$user.athlete.username}
		</p>
	</div>
	<div class="toolbar_actions">
		<FetchActivities />
		<Logout />
		<HeatmapToggle />
	</div>
</div>

<style lang="scss">
	.toolbar {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		background-color: var(--background);
		display: flex;
		border-radius: 15px;
		padding: 1rem;
		align-items: center;
	}

	.toolbar_title {
		display: flex;
		align-items: baseline;

		h1 {
			font-size: 1rem;
		}
		small {
			margin-left: 0.5rem;
		}
	}

	.toolbar_user {
		flex: 1;
		text-align: center;
	}
</style>
