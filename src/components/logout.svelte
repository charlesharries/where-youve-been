<script lang="ts">
	import { auth } from '../stores';

	function handleLogout() {
		$auth = 'logged_out';
	}
</script>

<button on:click={handleLogout}>Log out</button>
