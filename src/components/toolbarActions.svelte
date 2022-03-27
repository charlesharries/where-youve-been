<script lang="ts">
	import FetchActivities from '../components/fetchActivities.svelte';
	import Logout from '../components/logout.svelte';
	import HeatmapToggle from '../components/heatmapToggle.svelte';
</script>

<div class="toolbarActions">
	<FetchActivities />
	<HeatmapToggle />
	<Logout />
</div>

<style lang="scss">
	.toolbarActions {
		display: flex;
		gap: 0.5rem;
	}
</style>
