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

<div class="heatmap-toggle">
	<label for="heatmap">Show heatmap</label>
	<input type="checkbox" id="heatmap" name="heatmap" on:change={toggle} />
</div>
