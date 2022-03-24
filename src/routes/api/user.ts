import type { RequestHandler } from "@sveltejs/kit";

const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

async function getUser(code) {
  const url = new URL('https://www.strava.com/oauth/token');
  url.search = (new URLSearchParams([
    ['code', code],
    ['client_id', clientID],
    ['client_secret', clientSecret],
    ['grant_type', 'authorization_code'],
  ])).toString();

  return fetch(url.toString(), { method: 'POST' }).then(r => r.json());
}

const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get('code');
  const data = await getUser(code);

  return {
    status: 200,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }
}

export { get }