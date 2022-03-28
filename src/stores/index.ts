import type mapboxgl from 'mapbox-gl';
import type { User, Stats } from 'src/types';
import { writable } from 'svelte/store';

export const user = writable<User>(null);

export const map = writable<mapboxgl.Map>(null);

export const auth = writable<string>('logged_out');

export const loadingState = writable('idle');

export const stats = writable<Stats>({
  totalDistance: 0,
  totalTime: 0,
});