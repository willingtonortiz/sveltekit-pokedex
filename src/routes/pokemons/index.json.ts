import type { RequestHandler } from '@sveltejs/kit';

const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_URL = `${BASE_URL}/pokemon`;
const PAGE_SIZE = 40;
const TOTAL_ITEMS = 807;

export const get: RequestHandler = async ({ url }) => {
	const pageStr = url.searchParams.get('page');
	const page = parseInt(pageStr ?? '1');

	const offset = (page - 1) * PAGE_SIZE;

	const response = await fetch(`${POKEMON_URL}?limit=${PAGE_SIZE}&offset=${offset}`);
	const data = await response.json();
	data.count = TOTAL_ITEMS;

	return {
		status: 200,
		body: data
	};
};
