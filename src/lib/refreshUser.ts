import { user } from '../stores';
import { get } from 'svelte/store';
import localforage from 'localforage';

export default async function refreshUser() {
  const $user = get(user);

  const data = await fetch(`/api/user?refresh_token=${$user.refresh_token}`)
    .then(r => r.json());

  if (data?.athlete) {
    user.set(data);
    localforage.setItem('user', data);
  }
}