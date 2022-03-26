import type { RequestHandler } from "@sveltejs/kit";

async function getActivities(userId, accessToken) {
  const url = new URL(`https://www.strava.com/api/v3/athletes/${userId}/activities`)

  console.log({ userId, accessToken });

  return fetch(url.toString(), {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}`},
  });
}

export const get: RequestHandler = async ({ url }) => {
  const userId = url.searchParams.get('user_id');
  const accessToken = url.searchParams.get('access_token');

  const res = await getActivities(userId, accessToken);
  const body = await res.json();

  return {
    status: res.status,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }
}