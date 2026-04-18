import type mapboxgl from 'mapbox-gl';
import type { User, Stats } from '../types';
import { writable } from 'svelte/store';

export const user = writable<User | null>(null);

export const map = writable<mapboxgl.Map | null>(null);

export const auth = writable<string>('logged_out');

export const loadingState = writable('idle');

export const stats = writable<Stats>({
	totalDistance: 0,
	totalTime: 0,
	reset() {
		this.totalDistance = 0;
		this.totalTime = 0;
	}
});
