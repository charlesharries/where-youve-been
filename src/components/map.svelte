<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import mapboxgl from 'mapbox-gl';
	import localforage from 'localforage';
	import 'localforage-startswith';
	import { onMount } from 'svelte';
	import { map } from '../stores';
	import addToMap from '../lib/addToMap';

	let container: HTMLElement;

	onMount(async () => {
		if (typeof import.meta.env.VITE_MAPBOX_TOKEN === 'string') {
			mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
		} else {
			console.error('Missing Mapbox access token');
		}

		$map = new mapboxgl.Map({
			container: container,
			style: 'mapbox://styles/mapbox/dark-v10',
			center: [-2.0730246, 54.9778726],
			zoom: 7,
			attributionControl: false,
			logoPosition: 'top-left'
		});

		$map.addControl(new mapboxgl.AttributionControl(), 'top-right');

		const activities = await localforage.startsWith('activity_');
		if (Object.keys(activities).length) {
			$map.on('load', () => {
				Object.values(activities).forEach(addToMap);
			});
		}
	});
</script>

<div bind:this={container} class="map" />

<style lang="scss">
	.map {
		height: 100vh;
	}
</style>
