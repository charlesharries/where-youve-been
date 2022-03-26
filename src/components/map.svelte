<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import mapboxgl from 'mapbox-gl';
	import polyline from '@mapbox/polyline';
	import localforage from 'localforage';
	import { onMount } from 'svelte';
	import { map } from '../stores';

	let container: HTMLElement;
	let line =
		'm~wiIherMjFpUtBtFE`@yOwDyLqHkA`CuDpCyFpB_C~CoCpBcShEgElPe@o@wADgGlGkBB{BrBsHfCg@~@kCD}C^k@`A}AKSjA_BtAgA^iAlDsBb@aEtFcEpB_AiBHo@uEgDuBy@Oo@_AV}^_R_D[i\\eLkLMmIkB_CmCiE_BuIuGIeB}@kFeDeO{@gMaAwD\\q^WkBOiQk@wElBwGpA{JjDwEdAcFd@_IhToP~@eClDcH`GuAhFKf@yBr@a@hD{@jA`@Tu@`EfDfGX|BxAvDbFlNvFhDxExCdCtL`CpM_@tFkAlAqAhF{BpCeHnD{CbEmKlC}DfBcJvIiN\\Ve@gD}BuHGuB\\}J`D}L|@mHjJkI~AgGpEmDnCcHzDaOfK}O|IsCK_I|@{InIsItB}@`CoDCq@]MmGt@mB_EsAcHLaDSsBx@gDEiCxBkFmAeLRmEo@sV`AwCrCiPNsDa@q@G}At@oA|Aw@z@{Dk@{HrHgKHkJT_An@CtFiEdC{CzByA`AkDFcChCuJHwKlEk@h@eBbDoD|Ac@pImLrHiOhAoEvB_BrMmPlCrA|M`Bf_@yBtKtAhFaBUu@c@eQ\\cBj@sTn@oFrAqAfDUtCaFlAJlBmHJuI`CyAjAgCxBmQlAwRZiA|DaFzBiPZ_L\\wAq@yCNm_@^qBiA_IYuJq@kKsA_MgA}@De@vG_CtFLhCb@bD|BnDhAnHyJpD_ASFRg@nItKjEzATe@Hf@`Ab@d@oAtAUdAhBjBnBfCz@YvPbAzAu@dBQhBNtVxC|Hb@lEdAf]`A|G\\xKdCp\\jInWvDhGIlBsAz@cA`D{@nEAzGz@jEj@fOtCxDJxBtAvAe@nAb@nGUp@iLlFwGbGsAnBPV[MRj@Km@WHp@HaAWTMXNWUsAnCpBbPLjD_IvDeLxQYlAD`Ad@bFfArDtGd@b@nBGbAq@bEyEhP}@fSmC`Ch@nFwA|DNhBeAnAmBjHClAzAfIaAlIObL_AdMw@jE@zBkBjQCbDc@~@SxEaAnFmAhUoBrN]`J{CpXuC|MNhJW`J^lDcAzEqDpB{AYaAjAuBtFUdEd@lIOvK_CbHJRQIaErN}@zLFrC]dEPlGkJpV}Jhe@eApV@rFo@jGRFQdCVp@U`AZrFYhDg@dALrDbAzAPbNnA`JQ?e@eHg@yMcDyNg@gEiByG{B_@s@aASpAyGbEeEfFkH|FuKl@}FdDeHx@mEnFgCzA{BaBqDnBqFCsB|@oFnFuDcEyE{A}C{CwDiB_AqBqCsBgEiAeNdAsIqCi@h@?bB[\\cBuF';

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
			zoom: 7
		});

		const activities = await localforage.getItem<any[]>('activities');
		if (activities?.length) {
			$map.on('load', () => {
				activities.forEach((activity) => {
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
				});
			});
		}

		$map.on('load', () => {
			$map.addSource('route', {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: polyline.toGeoJSON(line)
				}
			});
		});
	});
</script>

<div bind:this={container} style="height: 500px;" />
