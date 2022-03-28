<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import mapboxgl from 'mapbox-gl';
	import localforage from 'localforage';
	import 'localforage-startswith';
	import { onMount, onDestroy } from 'svelte';
	import { map, auth, stats } from '../stores';
	import addToMap from '../lib/addToMap';
	import type { Unsubscriber } from 'svelte/store';

	let container: HTMLElement;
	let darkMode: MediaQueryList = null;
	let authUnsubscribe: Unsubscriber = null;

	const darkStyle = 'mapbox://styles/mapbox/dark-v10';
	const lightStyle = 'mapbox://styles/mapbox/outdoors-v11';

	function handleDarkModeChange(event: MediaQueryListEvent) {
		if (!$map.loaded()) return;

		$map.setStyle(event.matches ? darkStyle : lightStyle);
		initActivities();
	}

	async function clearActivities() {
		if (!$map?.loaded()) return;

		$map.getStyle().layers.forEach((l) => {
			if (l.id.startsWith('activity_')) {
				$map.removeLayer(l.id);
			}
		});

		$stats = { totalDistance: 0, totalTime: 0 };
	}

	async function initActivities() {
		if (!$map.loaded()) return;

		const activities = await localforage.startsWith('activity_');
		if (Object.keys(activities).length) {
			Object.values(activities).forEach(addToMap);
		}
	}

	onMount(async () => {
		darkMode = window.matchMedia('(prefers-color-scheme: dark)');
		const isDarkMode = darkMode.matches;
		if (typeof import.meta.env.VITE_MAPBOX_TOKEN === 'string') {
			mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
		} else {
			console.error('Missing Mapbox access token');
		}

		$map = new mapboxgl.Map({
			container: container,
			style: isDarkMode ? darkStyle : lightStyle,
			center: [-2.0730246, 54.9778726],
			zoom: 7,
			attributionControl: false,
			logoPosition: 'top-left'
		});

		$map.addControl(new mapboxgl.AttributionControl(), 'top-right');
		$map.on('load', () => initActivities());

		initActivities();

		darkMode.addEventListener('change', handleDarkModeChange);
		authUnsubscribe = auth.subscribe((a) => {
			if (a === 'logged_out') clearActivities();
			if (a === 'logged_in') initActivities();
		});
	});

	onDestroy(() => {
		if (darkMode) {
			darkMode.removeEventListener('change', handleDarkModeChange);
		}

		if (typeof authUnsubscribe === 'function') authUnsubscribe();

		$stats = { totalDistance: 0, totalTime: 0 };
	});
</script>

<div bind:this={container} class="map" />

<style lang="scss">
	.map {
		height: 100vh;
	}
</style>
