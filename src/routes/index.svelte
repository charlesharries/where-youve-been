<script lang="ts">
	import localforage from 'localforage';
	import { page } from '$app/stores';
	import Map from '../components/map.svelte';
	import Toolbar from '../components/toolbar.svelte';
	import { onMount } from 'svelte';
	import { auth, user } from '../stores';
	import type { User } from 'src/types';
	import '../styles/global.scss';

	let code = $page.url.searchParams.get('code');
	$: isLoggedIn = $auth === 'logged_in';

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
				$user = { ...$user, ...data };
			}
		}

		if ($user.athlete) $auth = 'logged_in';
	}

	onMount(() => {
		// Subscribe to stores so that state always gets synced to storage
		auth.subscribe((a) => localforage.setItem('auth', a));
		user.subscribe((u) => localforage.setItem('user', u));
		login();
	});
</script>

<Toolbar />
<Map />
