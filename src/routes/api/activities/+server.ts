import { error, type RequestHandler } from "@sveltejs/kit";

async function getActivities(accessToken, page = '1') {
  const url = new URL(`https://www.strava.com/api/v3/athlete/activities`)
  url.searchParams.append('per_page', '200');
  url.searchParams.append('page', page);

  return fetch(url.toString(), {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}`},
  });
}

export const GET: RequestHandler = async ({ url }) => {
  const accessToken = url.searchParams.get('access_token');
  const page = url.searchParams.get('page');

  const res = await getActivities(accessToken, page);
  const body = await res.json();

  if (!res.ok) {
    throw error(500, JSON.stringify(body));
  }

  const response = new Response(JSON.stringify(body));
  response.headers.set('Content-Type', 'application/json');

  return response;
}