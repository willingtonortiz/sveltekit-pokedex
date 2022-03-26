// import NodeCache from 'node-cache';
import { POKEMON_URL, PAGE_SIZE } from '$lib/utils/constants';
import type { PaginatedPokemonsResponse, PokemonResponse } from '$lib/pokemon.types';

// const cache = new NodeCache({ stdTTL: 86400 });

export const fetchAllPokemons = async ({ page = 1 }: { page: number }) => {
	const offset = (page - 1) * PAGE_SIZE;

	const response = await fetch(`${POKEMON_URL}?limit=${PAGE_SIZE}&offset=${offset}`);
	const pokemons: PaginatedPokemonsResponse = await response.json();
	return pokemons;
};

export const fetchPokemonByName = async ({ name }: { name: string }) => {
	// Getting from cache
	// const pokemonCache = cache.get<PokemonResponse>(name);
	// if (pokemonCache !== undefined) {
	// return pokemonCache;
	// }

	const pokemonResponse = await fetch(`${POKEMON_URL}/${name}`);
	const pokemon: PokemonResponse = await pokemonResponse.json();

	// Saving to cache
	// cache.set(name, pokemon);

	return pokemon;
};
