<script lang="ts">
	export let total = 100;
	export let value = 0;
	export let color = '#81c784';
</script>

<div class="w-full bg-gray-200 rounded-md flex">
	<div
		class="h-4 rounded-md flex flex-nowrap justify-end items-center"
		style="background-color: {color}; width: {(value / total) * 100}%;"
	>
		<span class="text-white mr-2">{value}</span>
	</div>
</div>
