<script lang="ts">
	import FetchActivities from '../components/fetchActivities.svelte';
	import Logout from '../components/logout.svelte';
	import Login from '../components/login.svelte';
	import HeatmapToggle from '../components/heatmapToggle.svelte';
	import { auth } from '../stores';

	$: isLoggedIn = $auth === 'logged_in';
</script>

<div class="toolbarActions">
	<FetchActivities />
	<HeatmapToggle />
	{#if isLoggedIn}
		<Logout />
	{:else}
		<Login />
	{/if}
</div>

<style lang="scss">
	.toolbarActions {
		display: flex;
		gap: 0.5rem;
	}
</style>
