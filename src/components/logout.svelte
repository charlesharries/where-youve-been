<script lang="ts">
	import { user } from '../stores';

	function handleLogout() {
		localStorage.removeItem('user');
		$user = null;
	}
</script>

<button on:click={handleLogout}>Log out</button>
