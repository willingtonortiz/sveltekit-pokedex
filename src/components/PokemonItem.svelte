<script lang="ts">
	import { createDefaultPokemonResponse, type PokemonResponse } from '$lib/pokemon.types';
	import { capitalizeText, getPokemonThumbnailUrl } from '$lib/utils/utils';
	import PokemonTypeIcon from './PokemonTypeIcon.svelte';

	export let pokemon: PokemonResponse = createDefaultPokemonResponse();
</script>

<a href={`/${pokemon.name}`}>
	<div
		class="h-full cursor-pointer border p-1 transition-all flex flex-col flex-nowrap items-center gap-1 hover:bg-gray-100"
	>
		<div class="w-full flex flex-row flex-nowrap justify-between">
			<div class="flex-1 flex flex-col flex-nowrap">
				<p class="text-3xl">{pokemon.id}</p>

				<p class="text-lg">{capitalizeText(pokemon.name)}</p>
			</div>

			<div class="flex flex-col flex-nowrap gap-1">
				{#each pokemon.types as type}
					<PokemonTypeIcon type={type.type.name} />
				{/each}
			</div>
		</div>

		<img class="w-20 mb-8" src={getPokemonThumbnailUrl(pokemon.id)} alt={pokemon.name} />
	</div>
</a>
