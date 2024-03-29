import type { Activity } from 'src/types';
import polyline from '@mapbox/polyline';
import { get } from 'svelte/store';
import { map, stats } from '../stores';
import type { LngLatBoundsLike } from 'mapbox-gl';

export const showLatest = 20;

export function byDate(act1: Activity, act2: Activity) {
  return new Date(act1.start_date) < new Date(act2.start_date) ? 1 : -1;
}

export function fitMap(bounds: LngLatBoundsLike) {
  if (!(bounds && bounds[0])) return;

  const $map = get(map);

  $map.fitBounds(bounds, { padding: 50 });
}

function flipped(coords, thinFactor = 1) {
  const flipped = [];
  for (let i = 0; i < coords.length; i++) {
    if (i % thinFactor != 0) {
      continue;
    }

    const coord = coords[i].slice();
    flipped.push([coord[1], coord[0]]);
  }
  return flipped;
}

export function processBounds(act: Activity, bounds: LngLatBoundsLike) {
  const b = bounds || [
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

export function addToMap(activity: Activity) {
  const $map = get(map);
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const lineColor = isDarkMode ? '#bada55' : '#9400ba';

  if (!activity.map?.summary_polyline) return;

  // Add the source if it doesn't exist already
  if (!$map.getSource(`source_${activity.id}`)) {
    const coords = polyline.decode(activity.map.summary_polyline);
    $map.addSource(`source_${activity.id}`, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: flipped(coords, 3),
        },
      }
    });
  }

  if (!$map.getLayer(`activity_${activity.id}`)) {
    $map.addLayer({
      id: `activity_${activity.id}`,
      type: 'line',
      source: `source_${activity.id}`,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': lineColor,
        'line-width': 3,
        'line-opacity': 1
      }
    });
  }

  stats.update(s => ({
    totalDistance: Math.round(s.totalDistance + activity.distance),
    totalTime: s.totalTime + activity.elapsed_time,
    reset: s.reset,
  }));
}