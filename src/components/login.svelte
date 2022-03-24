<script>
	const clientID = import.meta.env.VITE_CLIENT_ID;
	const appURL = import.meta.env.VITE_APP_URL;
	let url = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${appURL}&approval_prompt=force&scope=read`;
</script>

<a href={url}>Log in</a>
