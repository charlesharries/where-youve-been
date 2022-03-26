<script lang="ts">
	import { user } from '../stores';
	import addToMap from '../lib/addToMap';
	import localforage from 'localforage';

	async function fetchActivities() {
		const url = new URL(`${window.location.origin}/api/activities`);
		url.searchParams.append('access_token', $user.access_token);
		let hasNextPage = true;
		let currentPage = 1;

		while (hasNextPage) {
			url.searchParams.set('page', `${currentPage}`);
			const data = await fetch(url.toString()).then((r) => r.json());

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
