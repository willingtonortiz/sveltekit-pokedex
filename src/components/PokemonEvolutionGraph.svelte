<script lang="ts">
	import type { EvolutionChainItem } from '$lib/pokemon.types';
	import { capitalizeText, getGenderStrFromId } from '../lib/utils/utils';
	import Chip from './Chip.svelte';
	import RightArrowIcon from './icons/RightArrowIcon.svelte';

	export let color = '#ffffff';
	export let evolutionChainList: EvolutionChainItem[] = [];
</script>

<div class="flex flex-row">
	{#each evolutionChainList as evolutionChainItem}
		{#if evolutionChainItem.type === 'pokemon'}
			<div class="flex-1 flex flex-col justify-between gap-y-8 first:my-auto last:my-auto">
				{#each evolutionChainItem.items as pokemon}
					<a href={`/${pokemon.name}`}>
						<div class="flex flex-col flex-nowrap items-center">
							<img src={pokemon.imageUrl} alt={pokemon.name} />

							<p>#{pokemon.id}</p>

							<Chip background={color} color="#ffffff">
								<p>{pokemon.name}</p>
							</Chip>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div
				class="w-44 self-stretch flex flex-col justify-between gap-y-8 first:my-auto last:my-auto"
			>
				{#each evolutionChainItem.items as details}
					<div class="flex flex-col flex-nowrap items-center">
						<div class="flex flex-row flex-nowrap">
							{#if details.minLevel}
								<span class="text-base">Level {details.minLevel}+</span>

								{#if details.gender}
									<span class="ml-1 text-base">
										({capitalizeText(getGenderStrFromId(details.gender))})
									</span>
								{/if}
							{/if}
						</div>

						<RightArrowIcon size="50px" fill="#626262" />
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>
