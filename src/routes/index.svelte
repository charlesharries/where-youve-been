<script lang="ts">
	import localforage from 'localforage';
	import { page } from '$app/stores';
	import Login from '../components/login.svelte';
	import Logout from '../components/logout.svelte';
	import Map from '../components/map.svelte';
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import FetchActivities from '../components/fetchActivities.svelte';
	import type { User } from 'src/types';

	let code = $page.url.searchParams.get('code');
	$: isLoggedIn = Boolean($user?.athlete);

	async function login() {
		// Try getting the user out of localStorage first
		const userData = await localforage.getItem<User | null>('user');
		if (userData) {
			$user = userData;
		}

		// If that didn't succeed, and we've just arrived back from the
		// oAuth flow, then get the user from the API.
		if (!$user?.athlete && code) {
			const data = await fetch(`/api/user?code=${code}`).then((r) => r.json());

			if (data?.athlete) {
				$user = data;
				localforage.setItem('user', $user);
			}
		}
	}

	onMount(login);
</script>

<h1>Where you've been</h1>
{#if isLoggedIn}
	<p>User: {$user.athlete.username}</p>
	<FetchActivities />
	<Logout />
{:else}
	<Login />
{/if}
<Map />
