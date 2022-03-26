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
	getGenderStrFromId
};
