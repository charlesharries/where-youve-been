<script lang="ts">
	import { auth } from '../stores';

	function handleLogout() {
		$auth = 'logged_out';
	}
</script>

<button on:click={handleLogout} class="button">Log out</button>
