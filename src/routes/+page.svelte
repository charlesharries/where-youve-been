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

		if ($user?.athlete) $auth = 'logged_in';
	}

	onMount(() => {
		// Subscribe to stores so that state always gets synced to storage
		login();

		auth.subscribe((a) => localforage.setItem('auth', a));
		user.subscribe((u) => localforage.setItem('user', u));
	});
</script>

<svelte:head>
	<title>wyb</title>
	<meta name="description" content="A map of where you've tracked activities on Strava." />

	<link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
	<link rel="manifest" href="/icons/manifest.json" />
	<meta name="msapplication-TileColor" content="#cccccc" />
	<meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
	<meta name="theme-color" content="#cccccc" />
</svelte:head>

<Toolbar />
<Map />
