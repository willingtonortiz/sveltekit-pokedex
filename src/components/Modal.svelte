<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let isOpen = false;
	export let backDropStyle = '';
	export let backDropClass = 'default-backDrop';
	export let modalStyle = '';
	export let modalClass = 'default-modal';

	const onBackDropClick = () => dispatch('backDropClick');
</script>

{#if isOpen}
	<div
		style="position: fixed; z-index: 100; {backDropStyle}"
		class={backDropClass}
		on:click={onBackDropClick}
		transition:fade
	>
		<div style="position: absolute; {modalStyle}" class={modalClass} on:click|stopPropagation>
			<slot />
		</div>
	</div>
{/if}

<style>
	.default-backDrop {
		inset: 0px;
		background-color: transparent;
	}

	.default-modal {
		background-color: #ffffff;
		inset: 40px;
		padding: 16px;
		border: 1px solid #323232;
		border-radius: 4px;
	}
</style>
