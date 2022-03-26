import type { RequestHandler } from '@sveltejs/kit';
import type {
	EvolutionChain,
	EvolutionChainDetails,
	EvolutionChainItem,
	EvolutionChainPokemon,
	EvolutionChainResponse,
	EvolutionItemResponse
} from '$lib/pokemon.types';
import {
	getPokemonIdFromUrl,
	getPokemonImageUrl,
	getPokemonThumbnailUrlFromUrl,
	pokemonColorToColor
} from '$lib/utils/utils';
import { POKEMON_SPECIES_URL, POKEMON_URL } from '$lib/utils/constants';

export const get: RequestHandler = async ({ params }) => {
	const name = params.name;

	// Getting pokemon
	const pokemonResponse = await fetch(`${POKEMON_URL}/${name}`);
	const pokemon = await pokemonResponse.json();
	pokemon.imageUrl = getPokemonImageUrl(pokemon.id);

	// Getting pokemon species
	const pokemonSpeciesResponse = await fetch(`${POKEMON_SPECIES_URL}/${name}`);
	const pokemonSpecies = await pokemonSpeciesResponse.json();
	pokemonSpecies.color.name = pokemonColorToColor(pokemonSpecies.color.name);

	// Getting evolution chain
	const pokemonEvolutionChainUrl = pokemonSpecies.evolution_chain.url;
	const pokemonEvolutionChainResponse = await fetch(pokemonEvolutionChainUrl);
	const pokemonEvolutionChain: EvolutionChainResponse = await pokemonEvolutionChainResponse.json();
	const evolutionChain = getEvolutionTree(pokemonEvolutionChain.chain);

	const evolutionChainList = evolutionChainToLists(evolutionChain);
	// console.log(JSON.stringify(evolutionChainList, null, 2));

	return {
		status: 200,
		body: { pokemon, pokemonSpecies, evolutionChain, evolutionChainList }
	};
};

const getEvolutionTree = (chain: EvolutionItemResponse): EvolutionChain => {
	const hasEvolutions = chain.evolves_to.length > 0;
	const evolutions = [];

	if (hasEvolutions) {
		for (const evolutionItem of chain.evolves_to) {
			const evolution = getEvolutionTree(evolutionItem);
			evolutions.push(evolution);
		}
	}

	const details = chain.evolution_details;
	const hasDetails = chain.evolution_details.length > 0;

	return {
		id: getPokemonIdFromUrl(chain.species.url),
		name: chain.species.name,
		imageUrl: getPokemonThumbnailUrlFromUrl(chain.species.url),
		evolutions,
		details: hasDetails
			? {
					minLevel: details[0].min_level,
					gender: details[0].gender
			  }
			: null
	};
};

const getEvolutionSize = (chain: EvolutionItemResponse) => {
	const evolutions = chain.evolves_to;
	const hasEvolutions = evolutions.length > 0;

	if (!hasEvolutions) {
		return {
			depth: 1,
			breadth: 1
		};
	}

	let maxDepth = 0;
	let children = 0;

	for (const evolutionItem of evolutions) {
		const evolutionSize = getEvolutionSize(evolutionItem);
		maxDepth = Math.max(maxDepth, evolutionSize.depth);
		children += evolutionSize.breadth;
	}

	return {
		depth: 1 + maxDepth,
		breadth: children
	};
};

const evolutionChainToLists = (chain: EvolutionChain) => {
	const list: EvolutionChainItem[] = [];
	const level = 1;

	evolutionChainToListsUtil(list, level, chain);

	return list.slice(1);
};

const evolutionChainToListsUtil = (
	list: EvolutionChainItem[],
	level: number,
	chain: EvolutionChain
) => {
	// Check if list is big enough
	if (list.length < level) {
		list.push({ type: 'details', items: [] });
		list.push({ type: 'pokemon', items: [] });
	}

	// Add arrows
	(list[level - 1].items as EvolutionChainDetails[]).push({ ...chain.details });

	// Add Pokemon
	(list[level].items as EvolutionChainPokemon[]).push({
		id: chain.id,
		name: chain.name,
		imageUrl: chain.imageUrl
	});

	for (const evolution of chain.evolutions) {
		evolutionChainToListsUtil(list, level + 2, evolution);
	}
};
