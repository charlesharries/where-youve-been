<script lang="ts">
	import { page } from '$app/stores';
	import Login from '../components/login.svelte';
	import Logout from '../components/logout.svelte';
	import Map from '../components/map.svelte';
	import { onMount } from 'svelte';
	import { user } from '../stores';

	let code = $page.url.searchParams.get('code');
	$: isLoggedIn = Boolean($user?.athlete);

	async function login() {
		// Try getting the user out of localStorage first
		const userData = localStorage.getItem('user');
		if (userData) {
			try {
				$user = JSON.parse(userData);
			} catch (e) {
				localStorage.removeItem('user');
			}
		}

		// If that didn't succeed, and we've just arrived back from the
		// oAuth flow, then get the user from the API.
		if (!$user?.athlete && code) {
			const data = await fetch(`http://localhost:3000/api/user?code=${code}`).then((r) => r.json());

			if (data?.athlete) {
				$user = data;
				localStorage.setItem('user', JSON.stringify($user));
			}
		}
	}

	onMount(login);
</script>

<h1>Where you've been</h1>
{#if isLoggedIn}
	<p>User: {$user.athlete.username}</p>
	<Logout />
{:else}
	<Login />
{/if}
<Map />
