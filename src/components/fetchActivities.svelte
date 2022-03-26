<script lang="ts">
	import { map, user } from '../stores';
	import polyline from '@mapbox/polyline';
	import localforage from 'localforage';
	import type { Activity } from 'src/types';

	function addToMap(activity: Activity) {
		if ($map.getSource(`source_${activity.id}`)) return;
		if (!activity.map?.summary_polyline) return;

		$map.addSource(`source_${activity.id}`, {
			type: 'geojson',
			data: {
				type: 'Feature',
				properties: {},
				geometry: polyline.toGeoJSON(activity.map.summary_polyline)
			}
		});

		$map.addLayer({
			id: `layer_${activity.id}`,
			type: 'line',
			source: `source_${activity.id}`,
			layout: {
				'line-join': 'round',
				'line-cap': 'round'
			},
			paint: {
				'line-color': '#bada55',
				'line-width': 3
			}
		});
	}

	async function fetchActivities() {
		const url = new URL(`${window.location.origin}/api/activities`);
		url.searchParams.append('access_token', $user.access_token);
		let hasNextPage = true;
		let currentPage = 1;

		while (hasNextPage) {
			url.searchParams.set('page', `${currentPage}`);
			const data = await fetch(url.toString()).then((r) => r.json());

			console.log(Array.isArray(data), data.length);

			if (!Array.isArray(data) || data.length < 200) hasNextPage = false;

			if (data[0]?.map) {
				data.forEach((activity) => {
					localforage.setItem(`activity_${activity.id}`, activity);

					addToMap(activity);
				});
			}

			currentPage += 1;
		}
	}
</script>

<button type="button" on:click={fetchActivities}>Fetch activities</button>
