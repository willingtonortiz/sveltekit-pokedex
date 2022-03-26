<script lang="ts">
	export let styles = '';
	export let background: string = '#ffffff';
	export let color: string = '#000000';
</script>

<div class="px-1 rounded-sm w-min" style="background-color: {background}; color: {color}; {styles}">
	<slot />
</div>

<style>
</style>
