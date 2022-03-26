export type PaginatedPokemonsResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonItem[];
};

export type PokemonItem = {
	name: string;
	url: string;
};

export type PokemonResponse = {
	id: number;
	name: string;
	imageUrl: string;
	is_default: boolean;
	height: number;
	weight: number;
	abilities: Ability[];
	types: Type[];
	forms: Form[];
	stats: Stat[];
};

export type PaginatedPokemons = {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonResponse[];
};

export type Ability = {
	ability: { name: string; url: string };
	is_hidden: boolean;
	slot: number;
};

export type Type = {
	slot: number;
	type: { name: PokemonTypes; url: string };
};

export type PokemonTypes =
	| 'bug'
	| 'dark'
	| 'dragon'
	| 'electric'
	| 'fairy'
	| 'fighting'
	| 'fire'
	| 'flying'
	| 'ghost'
	| 'grass'
	| 'ground'
	| 'ice'
	| 'normal'
	| 'poison'
	| 'psychic'
	| 'rock'
	| 'steel'
	| 'water';

export type Form = {
	name: string;
	url: string;
};

export type Stat = {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
};

export const createDefaultPokemonResponse = (): PokemonResponse => {
	return {
		id: 0,
		name: '',
		is_default: false,
		imageUrl: '',
		height: 0,
		weight: 0,
		abilities: [],
		types: [],
		forms: [],
		stats: []
	};
};

export type PokemonSpecies = {
	color: { name: string };
	evolution_chain: { url: string };
};

export const createDefaultPokemonSpecies = (): PokemonSpecies => {
	return {
		color: { name: '' },
		evolution_chain: { url: '' }
	};
};

export type PokemonColor = {
	id: number;
	name: string;
};

export const createDefaultPokemonColor = (): PokemonColor => {
	return {
		id: 0,
		name: ''
	};
};

export type EvolutionChainResponse = {
	chain: EvolutionItemResponse;
};

export type EvolutionItemResponse = {
	evolution_details: EvolutionDetailsResponse[];
	evolves_to: EvolutionItemResponse[];
	species: {
		name: string;
		url: string;
	};
};

export type EvolutionDetailsResponse = {
	min_level: number | null;
	gender: number | null;
	trigger: { name: string; url: string };
};

export type EvolutionChain = {
	id: number;
	name: string;
	imageUrl: string;
	evolutions: EvolutionChain[];
	details: EvolutionChainDetails | null;
};

export type EvolutionChainPokemon = {
	id: number;
	name: string;
	imageUrl: string;
};

export type EvolutionChainDetails = {
	minLevel: number | null;
	gender: number | null;
};

export type EvolutionChainItem =
	| {
			type: 'pokemon';
			items: EvolutionChainPokemon[];
	  }
	| {
			type: 'details';
			items: EvolutionChainDetails[];
	  };

export const createDefaultEvolutionChain = (): EvolutionChain => {
	return {
		id: 0,
		name: '',
		imageUrl: '',
		evolutions: [],
		details: { minLevel: 0, gender: 1 }
	};
};
