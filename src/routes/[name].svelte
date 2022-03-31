<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import {
		createDefaultAbility,
		createDefaultPokemonResponse,
		createDefaultPokemonSpecies,
		type Ability,
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
	import PokemonTypeIcon from '../components/PokemonTypeIcon.svelte';
	import { pokemonTypeToColor } from '../lib/utils/utils';
	import Modal from '../components/Modal.svelte';

	// * Abilities
	let isAbilityModalOpen = false;
	let currentAbility: Ability = createDefaultAbility();

	export let pokemon: PokemonResponse = createDefaultPokemonResponse();
	export let pokemonSpecies: PokemonSpecies = createDefaultPokemonSpecies();
	export let evolutionChainList: EvolutionChainItem[] = [];
	$: primaryColor = pokemonSpecies.color.name;

	$: pokemonStats = pokemon.stats;
	$: maxStat = pokemonStats.reduce((prev, curr) => Math.max(prev, curr.base_stat), 0);
	$: statsTotal = pokemonStats.reduce((prev, curr) => prev + curr.base_stat, 0);

	const showAbilityDetails = (ability: Ability) => {
		currentAbility = ability;
		openAbilityModal();
	};

	const openAbilityModal = () => (isAbilityModalOpen = true);
	const closeAbilityModal = () => (isAbilityModalOpen = false);
	const toggleAbilityModal = () => (isAbilityModalOpen = !isAbilityModalOpen);
</script>

<!-- HTML -->
<svelte:head>
	<title>{pokemon.name}</title>
</svelte:head>

<Modal
	isOpen={isAbilityModalOpen}
	on:backDropClick={toggleAbilityModal}
	modalStyle="width: 500px; left: 50%; top:50%; transform: translate(-50%, -50%)"
	modalClass="bg-white border rounded-md shadow-lg"
>
	<div class="py-4">
		<h2 class="pb-4 text-center text-3xl">{currentAbility.ability.name}</h2>

		<div class="px-8 py-4 border-t border-b flex flex-col items-center">
			<Chip background={primaryColor} color="#ffffff">
				<span class="font-bold whitespace-nowrap">GAME DESCRIPTION</span>
			</Chip>

			<p class="pt-2 pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aut?</p>

			<Chip background={primaryColor} color="#ffffff">
				<span class="font-bold whitespace-nowrap">EFFECT</span>
			</Chip>

			<p class="pt-2 pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aut?</p>

			<Chip background={primaryColor} color="#ffffff">
				<span class="font-bold whitespace-nowrap">IN-DEPTH EFFECT</span>
			</Chip>

			<p class="pt-2 pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, aut?</p>
		</div>

		<div class="pt-4 flex justify-center">
			<button class="px-4 py-2 rounded-md bg-slate-600 text-white" on:click={closeAbilityModal}
				>Close</button
			>
		</div>
	</div>
</Modal>

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
		<div class="pokemon-info-container">
			<div class="pokemon-info left my-8 transition-all flex flex-col flex-nowrap gap-4">
				<div class="flex flex-row gap-x-8">
					<p class="w-24 font-bold text-right">ID</p>

					<p class="w-60">#{pokemon.id}</p>
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
							<div
								class="px-1 rounded text-white cursor-pointer"
								style="background-color: {primaryColor};"
								on:click={() => showAbilityDetails(ability)}
							>
								<p class="uppercase">{ability.ability.name}</p>
							</div>
						{/each}
					</div>
				</div>

				<div class="flex flex-row gap-x-8">
					<p class="w-24 font-bold text-right">Type</p>

					<div class="w-60 flex flex-row flex-wrap gap-2">
						{#each pokemon.types as type}
							<Chip background={pokemonTypeToColor(type.type.name)} color="#ffffff">
								<div class="px-0.5 flex items-center gap-2">
									<p>{type.type.name}</p>
									<PokemonTypeIcon type={type.type.name} />
								</div>
							</Chip>
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
		</div>

		<img
			class="w-max px-12 my-12 md:max-w-2xl lg:max-w-xs lg:px-0 xl:max-w-md 2xl:max-w-xl"
			src={pokemon.imageUrl}
			alt={pokemon.name}
		/>

		<div class="pokemon-info-container">
			<div class="pokemon-info right my-8 transition-all flex flex-col flex-nowrap gap-4">
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
	</div>

	<Chip styles="margin: 32px auto" background={primaryColor} color="#ffffff">
		<h2 class="text-3xl" style="width: 260px;">EVOLUTION CHAIN</h2>
	</Chip>

	<PokemonEvolutionGraph {evolutionChainList} color={primaryColor} />
</div>

<style>
	:global(.modal) {
		background-color: red;
	}

	@media (min-width: 1024px) {
		.pokemon-info-container {
			perspective: 400px;
		}

		.left {
			transform: rotateY(30deg);
		}

		.right {
			transform: rotateY(-30deg);
		}

		.pokemon-info:hover {
			transform: rotateY(0deg);
		}
	}
</style>
