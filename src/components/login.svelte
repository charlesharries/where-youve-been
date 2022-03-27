<script lang="ts">
	import { user, auth } from '../stores';
	import refreshUser from '../lib/refreshUser';
	const clientID = import.meta.env.VITE_CLIENT_ID;
	const vercelURL = import.meta.env.VITE_VERCEL_URL;

	let redirect = vercelURL;
	if (!redirect.toString().startsWith('http')) {
		redirect = `https://${redirect}`;
	}

	let url = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirect}&approval_prompt=force&scope=read,activity:read_all`;

	async function attemptLogin(event: Event) {
		if ($user.refresh_token) {
			event.preventDefault();
			refreshUser();
			$auth = 'logged_in';
			return;
		}
	}
</script>

<a href={url} on:click={attemptLogin} class="button">Log in</a>
