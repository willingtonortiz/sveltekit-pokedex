<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	const load: Load = async function ({ fetch, url }) {
		const pageStr = url.searchParams.get('page');
		const page = parseInt(pageStr ?? '1');

		const response = await fetch(`/pokemons.json?page=${page}`);
		const data = await response.json();

		if (!response.ok) {
			return {
				status: 400,
				error: new Error('Oops, Pokemon could not be fetched')
			};
		}

		return {
			status: 200,
			props: {
				pokemons: data,
				currentPage: page
			}
		};
	};

	export { load };
</script>

<script lang="ts">
	import { LightPaginationNav } from 'svelte-paginate';
	import type { PaginatedPokemons } from '$lib/pokemon.types';
	import { goto } from '$app/navigation';
	import PokemonItem from '../components/PokemonItem.svelte';

	const PAGE_SIZE = 40;
	export let pokemons: PaginatedPokemons = { count: 0, next: null, previous: null, results: [] };
	export let currentPage = 1;
	let totalItems = pokemons.count;
	$: items = pokemons.results;

	const onPageChanged = async (event: CustomEvent) => {
		const newPage = event.detail.page;
		goto(`/?page=${newPage}`);
	};
</script>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<!-- HTML -->

<div class="flex flex-row flex-nowrap justify-between shadow-md py-2 px-8">
	<!-- <input type="text" /> -->
	<div class="" />

	<div class="">
		<p class="text-4xl text-gray-500">PokéDex</p>
	</div>
</div>

<div>
	<div class="grid justify-center grid-cols-[repeat(auto-fit,_150px)]">
		{#each items as pokemon}
			<PokemonItem {pokemon} />
		{/each}
	</div>
</div>

<LightPaginationNav
	{totalItems}
	pageSize={PAGE_SIZE}
	{currentPage}
	limit={3}
	showStepOptions={true}
	on:setPage={onPageChanged}
/>

<style>
</style>
