import { user } from '../stores';
import { get } from 'svelte/store';

export default async function refreshUser() {
	const $user = get(user);
	if (!$user) return;

	const data = await fetch(`/api/user?refresh_token=${$user.refresh_token}`).then((r) => r.json());

	if (data?.access_token) {
		const newUser = { ...$user, ...data };
		user.set(newUser);
	}
}
