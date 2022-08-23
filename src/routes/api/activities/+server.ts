import type { RequestHandler } from "@sveltejs/kit";

async function getActivities(accessToken, page = '1') {
  const url = new URL(`https://www.strava.com/api/v3/athlete/activities`)
  url.searchParams.append('per_page', '200');
  url.searchParams.append('page', page);

  return fetch(url.toString(), {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}`},
  });
}

export const get: RequestHandler = async ({ url }) => {
  const accessToken = url.searchParams.get('access_token');
  const page = url.searchParams.get('page');

  const res = await getActivities(accessToken, page);
  const body = await res.json();

  return {
    status: res.status,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }
}