<script>
	const clientID = import.meta.env.VITE_CLIENT_ID;
	const appURL = import.meta.env.VITE_APP_URL;
	const vercelURL = import.meta.env.VERCEL_URL;
	let url = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${appURL}&approval_prompt=force&scope=read,activity:read_all`;

	if (vercelURL) {
		url = `http://${vercelURL}`;
	}
</script>

<a href={url}>Log in</a>
