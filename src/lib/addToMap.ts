import type { Activity } from '../types';
import polyline from '@mapbox/polyline';
import { get } from 'svelte/store';
import { map, stats } from '../stores';
import type mapboxgl from 'mapbox-gl';

type BoundsTuple = [number, number, number, number];

export const ACTIVITIES_SOURCE_ID = 'activities-source';
export const ACTIVITIES_LAYER_ID = 'activities-layer';

export const showLatest = 20;

let featureCollection: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
	type: 'FeatureCollection',
	features: []
};

export function byDate(act1: Activity, act2: Activity) {
	return new Date(act1.start_date) < new Date(act2.start_date) ? 1 : -1;
}

export function fitMap(bounds: BoundsTuple | undefined) {
	if (!bounds) return;

	const $map = get(map);
	if (!$map) return;

	$map.fitBounds(bounds, { padding: 50 });
}

function flipped(coords: [number, number][]): [number, number][] {
	return coords.map((coord) => [coord[1], coord[0]]);
}

export function processBounds(act: Activity, bounds: BoundsTuple | undefined): BoundsTuple {
	const b: BoundsTuple = bounds ?? [
		act.start_latlng[1],
		act.start_latlng[0],
		act.start_latlng[1],
		act.start_latlng[0]
	];

	if (act.start_latlng[1] < b[0]) b[0] = act.start_latlng[1];
	if (act.start_latlng[0] < b[1]) b[1] = act.start_latlng[0];
	if (act.start_latlng[1] > b[2]) b[2] = act.start_latlng[1];
	if (act.start_latlng[0] > b[3]) b[3] = act.start_latlng[0];

	return b;
}

function getLineColor(): string {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? '#bada55' : '#9400ba';
}

function ensureSourceAndLayer($map: mapboxgl.Map): void {
	if (!$map.getSource(ACTIVITIES_SOURCE_ID)) {
		$map.addSource(ACTIVITIES_SOURCE_ID, {
			type: 'geojson',
			data: featureCollection,
			tolerance: 0.75,
			buffer: 0
		});
	}

	if (!$map.getLayer(ACTIVITIES_LAYER_ID)) {
		$map.addLayer({
			id: ACTIVITIES_LAYER_ID,
			type: 'line',
			source: ACTIVITIES_SOURCE_ID,
			layout: {
				'line-join': 'round',
				'line-cap': 'round'
			},
			paint: {
				'line-color': getLineColor(),
				'line-width': 3,
				'line-opacity': 1
			}
		});
	}
}

export function addToMap(activity: Activity) {
	if (!activity.map?.summary_polyline) return;

	const $map = get(map);
	if (!$map) return;

	const alreadyPresent = featureCollection.features.some((f) => f.properties?.id === activity.id);
	if (!alreadyPresent) {
		const coords = polyline.decode(activity.map.summary_polyline);
		featureCollection.features.push({
			type: 'Feature',
			properties: { id: activity.id },
			geometry: {
				type: 'LineString',
				coordinates: flipped(coords)
			}
		});
	}

	ensureSourceAndLayer($map);
	($map.getSource(ACTIVITIES_SOURCE_ID) as mapboxgl.GeoJSONSource).setData(featureCollection);

	stats.update((s) => ({
		totalDistance: Math.round(s.totalDistance + activity.distance),
		totalTime: s.totalTime + activity.elapsed_time,
		reset: s.reset
	}));
}

export function addActivitiesToMap(activities: Activity[]): void {
	const $map = get(map);
	if (!$map) return;

	for (const activity of activities) {
		if (!activity.map?.summary_polyline) continue;
		if (featureCollection.features.some((f) => f.properties?.id === activity.id)) continue;

		const coords = polyline.decode(activity.map.summary_polyline);
		featureCollection.features.push({
			type: 'Feature',
			properties: { id: activity.id },
			geometry: {
				type: 'LineString',
				coordinates: flipped(coords)
			}
		});
	}

	ensureSourceAndLayer($map);
	($map.getSource(ACTIVITIES_SOURCE_ID) as mapboxgl.GeoJSONSource).setData(featureCollection);

	for (const activity of activities) {
		if (!activity.map?.summary_polyline) continue;
		stats.update((s) => ({
			totalDistance: Math.round(s.totalDistance + activity.distance),
			totalTime: s.totalTime + activity.elapsed_time,
			reset: s.reset
		}));
	}
}

export function resetActivities(): void {
	featureCollection = { type: 'FeatureCollection', features: [] };

	const $map = get(map);
	if (!$map?.loaded()) return;

	if ($map.getLayer(ACTIVITIES_LAYER_ID)) $map.removeLayer(ACTIVITIES_LAYER_ID);
	if ($map.getSource(ACTIVITIES_SOURCE_ID)) $map.removeSource(ACTIVITIES_SOURCE_ID);
}

export function reinitLayer(): void {
	const $map = get(map);
	if (!$map?.loaded()) return;

	ensureSourceAndLayer($map);
	$map.setPaintProperty(ACTIVITIES_LAYER_ID, 'line-color', getLineColor());
}
