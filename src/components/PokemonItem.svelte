<script lang="ts">
	import type { PokemonItem } from '$lib/pokemon.types';
	import { capitalizeText, getPokemonIdFromUrl, getPokemonThumbnailUrl } from '$lib/utils/utils';

	export let pokemon: PokemonItem = { name: '', url: '' };
	let pokemonId = 0;

	$: {
		pokemonId = getPokemonIdFromUrl(pokemon.url);
	}
</script>

<a href={`/${pokemon.name}`}>
	<div
		class="cursor-pointer border p-1 transition-all flex flex-col flex-nowrap items-center gap-1 hover:bg-gray-100"
	>
		<div class="w-full flex flex-row flex-nowrap justify-between">
			<p class="text-3xl">{pokemonId}</p>

			<p>+</p>
		</div>

		<div class="w-full flex flex-row flex-nowrap justify-between">
			<p class="text-lg">{capitalizeText(pokemon.name)}</p>

			<p>+</p>
		</div>

		<img class="w-20 mb-8" src={getPokemonThumbnailUrl(pokemonId)} alt={pokemon.name} />
	</div>
</a>
