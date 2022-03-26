<script lang="ts">
	import type { PokemonTypes } from '$lib/pokemon.types';
	import { pokemonTypeToColor } from '../lib/utils/utils';

	export let type: PokemonTypes = 'bug';
	let color = pokemonTypeToColor(type);
</script>

<div class="rounded-full p-1.5" style="background-color: {color};">
	<img class="w-4 h-4" src={`/icons/${type}.png`} alt={type} />
</div>
