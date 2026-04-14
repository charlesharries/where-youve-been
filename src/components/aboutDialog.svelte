<script lang="ts">
	let dialog: HTMLDialogElement;

	export function open() {
		dialog.showModal();
	}

	function close() {
		dialog.close();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === dialog) {
			close();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:click={handleBackdropClick} aria-labelledby="about-title">
	<div class="about_content">
		<div class="about_header">
			<h2 id="about-title">Where You've Been</h2>
			<button class="button about_close" on:click={close} aria-label="Close">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-md w-md" aria-hidden="true">
					<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
				</svg>
			</button>
		</div>
		<div class="about_body">
			<p>
				<strong>Where You've Been</strong> is a personal heatmap for your
				<a href="https://www.strava.com" target="_blank" rel="noopener noreferrer">Strava</a>
				activities. Connect your account to visualise every run, ride, and hike you've ever logged on a single map.
			</p>
			<h3>How to use it</h3>
			<ol>
				<li>Click <strong>Log in</strong> to connect your Strava account.</li>
				<li>Click <strong>Fetch activities</strong> to load your activity history.</li>
				<li>Toggle <strong>Show heatmap</strong> to switch to a low-opacity overlay view.</li>
			</ol>
			<h3>Privacy</h3>
			<p>
				Your activity data is stored locally in your browser and is never sent to any server
				other than Strava's own API.
			</p>
		</div>
	</div>
</dialog>

<style lang="scss">
	dialog {
		border: 0;
		border-radius: 15px;
		padding: 0;
		max-width: min(480px, calc(100vw - 2rem));
		width: 100%;
		background-color: var(--background);
		color: var(--text);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);

		&::backdrop {
			background: rgba(0, 0, 0, 0.5);
		}
	}

	.about_content {
		display: flex;
		flex-direction: column;
	}

	.about_header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1rem 0.75rem;
		border-bottom: 1px solid var(--faded);

		h2 {
			font-size: 1rem;
			margin: 0;
		}
	}

	.about_close {
		padding: 4px;
		line-height: 0;
		cursor: pointer;
	}

	.about_body {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		font-size: 0.875rem;
		line-height: 1.5;

		h3 {
			font-size: 0.875rem;
			margin-bottom: 0.25rem;
		}

		ol {
			padding-left: 1.25rem;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		a {
			color: var(--primary);
		}
	}
</style>
