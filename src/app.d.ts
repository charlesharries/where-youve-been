/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare const __APP_VERSION__: string;

declare module 'mapbox-gl/dist/mapbox-gl-csp' {
	import mapboxgl from 'mapbox-gl';
	export default mapboxgl;
}

declare module 'mapbox-gl/dist/mapbox-gl-csp-worker?worker' {
	const WorkerConstructor: new () => Worker;
	export default WorkerConstructor;
}
