import type { RequestHandler } from '@sveltejs/kit';
import { TOTAL_ITEMS } from '$lib/utils/constants';
import { fetchAllPokemons, fetchPokemonByName } from '$lib/api/pokemon.service';
import type { PaginatedPokemons, PokemonResponse } from '$lib/pokemon.types';

export const get: RequestHandler = async ({ url }) => {
	const pageStr = url.searchParams.get('page');
	const page = parseInt(pageStr ?? '1');

	const paginatedResults = await fetchAllPokemons({ page });
	paginatedResults.count = TOTAL_ITEMS;

	const pokemonUrls = paginatedResults.results.map((pokemon) =>
		fetchPokemonByName({ name: pokemon.name })
	);

	const pokemons = await Promise.all(pokemonUrls);
	const cleanedPokemons: PokemonResponse[] = pokemons.map((pokemon) => ({
		id: pokemon.id,
		name: pokemon.name,
		abilities: pokemon.abilities,
		forms: pokemon.forms,
		height: pokemon.height,
		imageUrl: pokemon.imageUrl,
		is_default: pokemon.is_default,
		stats: pokemon.stats,
		types: pokemon.types,
		weight: pokemon.weight
	}));

	const paginatedPokemons: PaginatedPokemons = {
		count: paginatedResults.count,
		next: paginatedResults.next,
		previous: paginatedResults.previous,
		results: cleanedPokemons
	};

	return {
		status: 200,
		body: paginatedPokemons
	};
};
