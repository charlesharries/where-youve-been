<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import mapboxgl from 'mapbox-gl';
	import { onMount } from 'svelte';

	let container: HTMLElement;
	let map: mapboxgl.Map;

	onMount(async () => {
		if (typeof import.meta.env.VITE_MAPBOX_TOKEN === 'string') {
			mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
		} else {
			console.error('Missing Mapbox access token');
		}

		map = new mapboxgl.Map({
			container: container,
			style: 'mapbox://styles/mapbox/dark-v10',
			center: [-74.5, 40],
			zoom: 9
		});
	});
</script>

<div bind:this={container} style="height: 400px;" />
