<script lang="ts">
	import { user, loadingState, stats } from '../stores';
	import { addToMap, byDate, fitMap, processBounds, showLatest } from '../lib/addToMap';
	import localforage from 'localforage';
	import refreshUser from '$lib/refreshUser';
	import type { LngLatBoundsLike } from 'mapbox-gl';
	import type { Activity } from 'src/types';

	$: isLoading = $loadingState === 'loading';

	async function fetchActivities() {
		$loadingState = 'loading';
		const url = new URL(`${window.location.origin}/api/activities`);
		url.searchParams.append('access_token', $user.access_token);
		let hasNextPage = true;
		let currentPage = 1;
		let bounds: LngLatBoundsLike;
		$stats.reset();

		while (hasNextPage) {
			url.searchParams.set('page', `${currentPage}`);
			const res = await fetch(url.toString());
			if (res.status === 401) {
				await refreshUser();
				url.searchParams.set('access_token', $user.access_token);
				continue;
			}

			const data = await res.json();

			if (!Array.isArray(data) || data.length < 200) hasNextPage = false;

			if (data[0]?.map) {
				data.sort(byDate).forEach((activity: Activity, idx) => {
					localforage.setItem(`activity_${activity.id}`, activity);

					addToMap(activity);
					if (idx < showLatest) {
						bounds = processBounds(activity, bounds);
					}
				});
			}

			currentPage += 1;
		}

		fitMap(bounds);

		$loadingState = 'idle';
	}
</script>

<button
	type="button"
	class="button"
	on:click={fetchActivities}
	title="Fetch activities"
	disabled={isLoading}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-sm w-sm"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
		/>
	</svg>
	<span>{$loadingState === 'idle' ? 'Fetch activities' : 'Fetching...'}</span>
</button>
