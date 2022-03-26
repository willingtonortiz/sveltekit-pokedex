const IMAGE_REPOSITORY_URL = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets';
const IMAGE_BASE_URL = `${IMAGE_REPOSITORY_URL}/images`;
const THUMBNAILS_IMAGE_BASE_URL = `${IMAGE_REPOSITORY_URL}/thumbnails-compressed`;

const getPokemonImageUrlBuilder = (baseUrl: string) => (id: number) => {
	const numberFormatter = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 3 });
	const parsedPokemonId = numberFormatter.format(id);
	return `${baseUrl}/${parsedPokemonId}.png`;
};

const getPokemonImageUrl = getPokemonImageUrlBuilder(IMAGE_BASE_URL);
const getPokemonThumbnailUrl = getPokemonImageUrlBuilder(THUMBNAILS_IMAGE_BASE_URL);

const capitalizeText = (name: string) => {
	const firstLetter = name.charAt(0).toUpperCase();
	const nameRest = name.substring(1);

	return `${firstLetter}${nameRest}`;
};

const getGenderStrFromId = (id: number) => {
	if (id === 1) {
		return 'female';
	}

	return 'male';
};

// 0 0 20px #5fbd58
const pokemonTypeToColor = (type: string) => {
	if (type === 'bug') {
		return '#92bc2c';
	}
	if (type === 'dark') {
		return '#595761';
	}
	if (type === 'dragon') {
		return '#0c69c8';
	}
	if (type === 'electric') {
		return '#f2d94e';
	}
	if (type === 'fairy') {
		return '#ee90e6';
	}
	if (type === 'fighting') {
		return '#d3425f';
	}
	if (type === 'fire') {
		return '#fba54c';
	}
	if (type === 'flying') {
		return '#a1bbec';
	}
	if (type === 'ghost') {
		return '#5f6dbc';
	}
	if (type === 'grass') {
		return '#5fbd58';
	}
	if (type === 'ground') {
		return '#da7c4d';
	}
	if (type === 'ice') {
		return '#75d0c1';
	}
	if (type === 'normal') {
		return '#a0a29f';
	}
	if (type === 'poison') {
		return '#b763cf';
	}
	if (type === 'psychic') {
		return '#fa8581';
	}
	if (type === 'rock') {
		return '#c9bb8a';
	}
	if (type === 'steel') {
		return '#5695a3';
	}
	if (type === 'water') {
		return '#539ddf';
	}
};

const pokemonColorToColor = (color: string) => {
	if (color === 'green') {
		return '#81c784';
	}
	if (color === 'red') {
		return '#ff8a80';
	}
	if (color === 'blue') {
		return '#81d4fa';
	}
	if (color === 'brown') {
		return '#bcaaa4';
	}
	if (color === 'purple') {
		return '#ad8ee7';
	}
	if (color === 'yellow') {
		return '#ffd600';
	}
	if (color === 'gray') {
		return '#a6a6a6';
	}
	if (color === 'pink') {
		return '#f8bbd0';
	}
	if (color === 'white') {
		return '#d5dbe1';
	}
	if (color === 'black') {
		return '#607d8b';
	}
};

const getPokemonIdFromUrl = (url: string) => {
	const splittedUrl = url.split('/');
	const pokemonIdStr = splittedUrl[splittedUrl.length - 2];
	return parseInt(pokemonIdStr);
};

const getPokemonImageFromUrlBuilder = (imageBuilder: (id: number) => string) => (url: string) => {
	const pokemonId = getPokemonIdFromUrl(url);
	return imageBuilder(pokemonId);
};

const getPokemonImageUrlFromUrl = getPokemonImageFromUrlBuilder(getPokemonImageUrl);
const getPokemonThumbnailUrlFromUrl = getPokemonImageFromUrlBuilder(getPokemonThumbnailUrl);

export {
	getPokemonImageUrl,
	getPokemonThumbnailUrl,
	pokemonColorToColor,
	getPokemonIdFromUrl,
	getPokemonImageUrlFromUrl,
	getPokemonThumbnailUrlFromUrl,
	capitalizeText,
	getGenderStrFromId,
	pokemonTypeToColor
};
