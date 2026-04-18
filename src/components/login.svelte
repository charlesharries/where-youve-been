<script lang="ts">
	import { user, auth } from '../stores';
	import refreshUser from '../lib/refreshUser';
	import { browser } from '$app/environment';
	const clientID = import.meta.env.VITE_CLIENT_ID;

	const url = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${browser ? window.location.origin : ''}&approval_prompt=force&scope=read,activity:read_all`;

	async function attemptLogin(event: Event) {
		if ($user?.refresh_token) {
			event.preventDefault();
			refreshUser();
			$auth = 'logged_in';
			return;
		}
	}
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href={url} on:click={attemptLogin} class="button">Log in</a>
