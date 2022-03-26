import type mapboxgl from 'mapbox-gl';
import type { User } from 'src/types';
import { writable } from 'svelte/store';

export const user = writable<User>(null);

export const map = writable<mapboxgl.Map>(null);

export const auth = writable<string>('logged_out');