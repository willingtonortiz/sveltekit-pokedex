<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import {
		createDefaultPokemonResponse,
		createDefaultPokemonSpecies,
		type EvolutionChainItem,
		type PokemonResponse,
		type PokemonSpecies
	} from '$lib/pokemon.types';

	const load: Load = async function ({ fetch, params }) {
		const name = params.name;

		const response = await fetch(`/pokemons/${name}.json`);

		if (!response.ok) {
			return {
				status: 400,
				error: new Error('Oops, Pokemon could not be fetched')
			};
		}

		const { pokemon, pokemonSpecies, evolutionChain, evolutionChainList } = await response.json();

		return {
			status: 200,
			props: {
				pokemon,
				pokemonSpecies,
				evolutionChain,
				evolutionChainList
			}
		};
	};

	export { load };
</script>

<script lang="ts">
	import PokemonEvolutionGraph from '../components/PokemonEvolutionGraph.svelte';
	import ProgressBar from '../components/ProgressBar.svelte';
	import Chip from '../components/Chip.svelte';
	import LeftArrowIcon from '../components/icons/LeftArrowIcon.svelte';

	export let pokemon: PokemonResponse = createDefaultPokemonResponse();
	export let pokemonSpecies: PokemonSpecies = createDefaultPokemonSpecies();
	export let evolutionChainList: EvolutionChainItem[] = [];
	$: primaryColor = pokemonSpecies.color.name;

	$: pokemonStats = pokemon.stats;
	$: maxStat = pokemonStats.reduce((prev, curr) => Math.max(prev, curr.base_stat), 0);
	$: statsTotal = pokemonStats.reduce((prev, curr) => prev + curr.base_stat, 0);
</script>

<!-- HTML -->
<svelte:head>
	<title>{pokemon.name}</title>
</svelte:head>

<div class="mb-48">
	<header
		class="px-4 py-2 flex flex-row flex-nowrap justify-between items-center"
		style="background-color: {primaryColor};"
	>
		<a href="/">
			<LeftArrowIcon />
		</a>

		<p class="text-white text-3xl">POKEDEX</p>
	</header>

	<div class="m-auto w-min my-4 flex flex-col ">
		<h1 class="text-5xl uppercase text-gray-500">{pokemon.name}</h1>
	</div>

	<div
		class="flex flex-col justify-evenly items-center sm:flex-col md:flex-col lg:flex-row xl:flex-row"
	>
		<div class="flex flex-col flex-nowrap gap-4">
			<div class="flex flex-row gap-x-8">
				<p class="w-24 font-bold text-right">ID</p>

				<p class="w-60">{pokemon.id}</p>
			</div>

			<div class="flex flex-row gap-x-8">
				<p class="w-24 font-bold text-right">Height</p>

				<p class="w-60">{pokemon.height / 10} m</p>
			</div>

			<div class="flex flex-row gap-x-8">
				<p class="w-24 font-bold text-right">Weight</p>

				<p class="w-60">{pokemon.weight / 10} Kg</p>
			</div>

			<div class="flex flex-row gap-x-8">
				<p class="w-24 font-bold text-right">Abilities</p>

				<div class="w-60 flex flex-row flex-wrap gap-2">
					{#each pokemon.abilities as ability}
						<div class="px-1 rounded text-white" style="background-color: {primaryColor};">
							<p class="uppercase">{ability.ability.name}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-row gap-x-8">
				<p class="w-24 font-bold text-right">Type</p>

				<div class="w-60 flex flex-row flex-wrap gap-2">
					{#each pokemon.types as type}
						<div class="px-1 rounded text-white" style="background-color: {primaryColor};">
							<p>{type.type.name}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-row gap-x-8">
				<p class="w-24 font-bold text-right">Forms</p>

				<div class="w-60 flex flex-row flex-wrap gap-2">
					{#each pokemon.forms as form}
						<div class="px-1 rounded text-white" style="background-color: {primaryColor};">
							<p class="uppercase">{form.name}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<img
			class="w-max my-12 md:max-w-2xl lg:max-w-xs xl:max-w-md 2xl:max-w-xl"
			src={pokemon.imageUrl}
			alt={pokemon.name}
		/>

		<div class="flex flex-col flex-nowrap gap-4">
			{#each pokemonStats as stat}
				<div class="flex flex-row items-center gap-x-8">
					<p class="w-24 font-bold text-right">{stat.stat.name}</p>

					<!-- <p>{stat.base_stat}</p> -->
					<div class="w-60">
						<ProgressBar total={maxStat} value={stat.base_stat} color={primaryColor} />
					</div>
				</div>
			{/each}

			<div class="flex flex-row gap-x-8">
				<p class="w-24 font-bold text-right">Total</p>

				<p>{statsTotal}</p>
			</div>
		</div>
	</div>

	<Chip styles="margin: 32px auto" background={primaryColor} color="#ffffff">
		<h2 class="text-3xl" style="width: 260px;">EVOLUTION CHAIN</h2>
	</Chip>

	<PokemonEvolutionGraph {evolutionChainList} color={primaryColor} />
</div>
