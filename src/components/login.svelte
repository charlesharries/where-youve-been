<script lang="ts">
	const clientID = import.meta.env.VITE_CLIENT_ID;
	const appURL = import.meta.env.VITE_APP_URL;
	const vercelURL = import.meta.env.VERCEL_URL;
	import { user, auth } from '../stores';
	import refreshUser from '../lib/refreshUser';
	let url = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${appURL}&approval_prompt=force&scope=read,activity:read_all`;

	if (vercelURL) {
		url = `http://${vercelURL}`;
	}

	async function attemptLogin(event: Event) {
		if ($user.refresh_token) {
			event.preventDefault();
			refreshUser();
			$auth = 'logged_in';
			return;
		}
	}
</script>

<a href={url} on:click={attemptLogin}>Log in</a>
