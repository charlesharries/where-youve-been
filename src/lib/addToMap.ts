import type { Activity } from 'src/types';
import polyline from '@mapbox/polyline';
import { get } from 'svelte/store';
import { map } from '../stores';

export default function addToMap(activity: Activity) {
  const $map = get(map);
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const lineColor = isDarkMode ? '#bada55' : '#9400ba';

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