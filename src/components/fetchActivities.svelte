<script lang="ts">
	import { map, user } from '../stores';
	import localforage from 'localforage';

	async function fetchActivities() {
		const url = new URL(`${window.location.origin}/api/activities`);
		url.searchParams.append('user_id', `${$user.athlete.id}`);
		url.searchParams.append('access_token', $user.access_token);
		const data = await fetch(url.toString()).then((r) => r.json());

		console.log({ data });

		if (Array.isArray(data) && data[0]?.map) {
			localforage.setItem('activities', data);
		}
	}
</script>

<button type="button" on:click={fetchActivities}>Fetch activities</button>
