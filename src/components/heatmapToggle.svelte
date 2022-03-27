<script lang="ts">
	import { map } from '../stores';

	let isEnabled = false;

	function updateMap() {
		$map.getStyle().layers.forEach((l) => {
			if (!l.id.startsWith('activity')) return;

			const opacity = isEnabled ? 0.2 : 1;
			$map.setPaintProperty(l.id, 'line-opacity', opacity);
		});
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
