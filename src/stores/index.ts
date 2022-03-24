import type { User } from 'src/types';
import { writable } from 'svelte/store';

export const user = writable<User>(null);