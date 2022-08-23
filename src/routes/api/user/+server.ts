import type { RequestHandler } from "@sveltejs/kit";

const clientID = import.meta.env.VITE_CLIENT_ID as string;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;

async function getUser(code: string) {
  const url = new URL('https://www.strava.com/oauth/token');
  url.searchParams.set('code', code);
  url.searchParams.set('client_id', clientID);
  url.searchParams.set('client_secret', clientSecret);
  url.searchParams.set('grant_type', 'authorization_code');

  return fetch(url.toString(), { method: 'POST' }).then(r => r.json());
}

async function refreshUser(refreshToken: string) {
  const url = new URL('https://www.strava.com/oauth/token');
  url.searchParams.set('refresh_token', refreshToken);
  url.searchParams.set('client_id', clientID);
  url.searchParams.set('client_secret', clientSecret);
  url.searchParams.set('grant_type', 'refresh_token');

  return fetch(url.toString(), { method: 'POST' }).then(r => r.json());
}

const GET: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get('code');
  const refreshToken = url.searchParams.get('refresh_token');
  let data;

  if (refreshToken) {
    data = await refreshUser(refreshToken);
  } else {
    data = await getUser(code);
  }

  const response = new Response(JSON.stringify(data));
  response.headers.set('Content-Type', 'application/json');

  return response;
}

export { GET }