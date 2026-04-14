<script lang="ts">
	import { map } from '../stores';
	import { ACTIVITIES_LAYER_ID } from '../lib/addToMap';

	let isEnabled = false;

	function updateMap() {
		if (!$map?.getLayer(ACTIVITIES_LAYER_ID)) return;

		$map.setPaintProperty(ACTIVITIES_LAYER_ID, 'line-opacity', isEnabled ? 0.2 : 1);
	}

	function toggle() {
		isEnabled = !isEnabled;
		updateMap();
	}
</script>

<div class="heatmapToggle">
	<input type="checkbox" id="heatmap" name="heatmap" on:change={toggle} />
	<label for="heatmap" class="button">{isEnabled ? 'Hide' : 'Show'} heatmap </label>
</div>

<style lang="scss">
	.heatmapToggle {
		position: relative;

		input[type='checkbox'] {
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
			opacity: 0;
		}
	}
</style>
