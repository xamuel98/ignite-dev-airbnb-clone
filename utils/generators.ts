/**
 * @author Sanni Samuel
 */

import type { ICategoryProps as Category } from "~/types/category";
import type { ListCardProps as Listing, ImageProps } from "~/types/listing";

export const useGenerators = () => {
	/**
	 * @description Generate a unique id
	 * @param {Number} length length of unique id
	 * @param {String} seed seed to resolve Hydration attribute mismatch on server side
	 * @returns {String} A unique string ID
	 */
	const generateUniqueId = (
		length: number = 10,
		seed: string = ""
	): string => {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		let result: string = "";
		const characterLength = characters.length;

		for (let i = 0; i < characterLength; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characterLength)
			);
		}

		return `${seed}-${result}`;
	};

	/**
	 * @description Generates a random element from an array
	 * @param {Array} array
	 * @returns {*}
	 */
	const getRandomElement = (array: any[]) => {
		if (Array.isArray(array))
			return array[Math.floor(Math.random() * array.length)];
	};

	/**
	 * @description Generates a random number between min and max (inclusive)
	 * @param {Number} min
	 * @param {Number} max
	 * @returns {Number}
	 */
	const getRandomInt = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	/**
	 * @description Generates a random category
	 * @returns {String}
	 */
	const getRandomCategorySlug = (categories: Category[]): string => {
		// Get a random index within the length of the categories array
        // Exclude index 0
		const randomIndex = Math.floor(Math.random() * (categories.length - 1)) + 1;
		return categories[randomIndex].slug;
	};

	/**
	 * @description Generates a random place in a country
	 * @returns {String}
	 */
	const generateRandomPlace = (places: string[], countries: string[]) => {
		const place = getRandomElement(places);
		const country = getRandomElement(countries);
		return `${place}, ${country}`;
	};

	/**
	 *
	 * @param descriptions Generates a random short description
	 * @returns {String}
	 */
	const generateRandomDescription = (descriptions: string[]) => {
		return getRandomElement(descriptions);
	};

	/**
	 * @description Function to generate random image URLs for listing
	 * @param {String} seed seed to resolve Hydration attribute mismatch on server side
	 * @returns {String} A random image URL
	 */
	const generateRandomImageUrl = (seed: string = ""): string => {
		const placeholderUrls = [
			"/images/listings/photo-1.avif",
			"/images/listings/photo-2.avif",
			"/images/listings/photo-3.avif",
			"/images/listings/photo-4.avif",
			"/images/listings/photo-5.avif",
			"/images/listings/photo-6.avif",
			"/images/listings/photo-7.avif",
			"/images/listings/photo-8.avif",
			"/images/listings/photo-9.avif",
			"/images/listings/photo-10.avif",
			"/images/listings/photo-11.avif",
			"/images/listings/photo-12.avif",
		];
		const randomIndex = Math.floor(Math.random() * placeholderUrls.length);
		return placeholderUrls[randomIndex];
	};

	/**
	 * @description Function to generate random corresponding image alt text for listing
	 * @param {String} seed seed to resolve Hydration attribute mismatch on server side
	 * @returns {String} A random image URL
	 */
	const generateRandomAltText = (seed: string = ""): string => {
		const placeholderAltTexts = [
			"A beautiful scenery",
			"A dinner restaurant",
			"A colorful street path",
			"A river with a bridge",
			"Street Path",
			"A hallway with a door and a rug on the floor",
			"A dining room table in front of a window",
			"A bedroom with a bed and a large window",
			"A cabin in the woods surrounded by trees",
			"A house surrounded by trees",
			"A small white house with a wooden roof",
			"A green plant hanging from a ceiling light",
		];
		const randomIndex = Math.floor(
			Math.random() * placeholderAltTexts.length
		);
		return placeholderAltTexts[randomIndex];
	};

	/**
	 * @description Generate random images for the listing
	 * @param {Number} count Number of images and alt text to generate
	 * @param {String} seed seed to resolve Hydration attribute mismatch on server side
	 * @returns {Array} An array of objects containing random images and alt text
	 */
	const generateRandomImages = (count: number): ImageProps[] => {
		const images: ImageProps[] = [];
		for (let i = 0; i < count; i++) {
			const src = generateRandomImageUrl();
			const alt = generateRandomAltText();
			images.push({ src, alt });
		}
		return images;
	};

	/**
	 * @description Generates an array of objects with random data
	 * @param {Number} numberOfListings
	 * @param {Array} places
	 * @param {Array} countries
     * @param {Array} region
	 * @returns {Array}
	 */
	const generateRandomListings = (
		numberOfListings: number,
		categories: Category[] = [],
		descriptions: string[] = [],
		places: string[] = [],
		countries: string[] = [],
        region: string[] = []
	) => {
		const listings: Listing[] = [];
		for (let id = 1; id <= numberOfListings; id++) {
			listings.push({
				data: {
					id: id.toString(),
					images: generateRandomImages(7),
					title: generateRandomPlace(places, countries),
					description: generateRandomDescription(descriptions),
					rating: getRandomInt(30, 50) / 10, // Random rating between 3.0 and 5.0
					category: getRandomCategorySlug(categories),
					roomCount: getRandomInt(1, 5),
					bathroomCount: getRandomInt(1, 5),
					guestCount: getRandomInt(1, 10),
					price: getRandomInt(50, 500),
					country: getRandomElement(countries),
					latlng: [0, 0],
					region: getRandomElement(region),
				},
				reservation: {
					startDate: "2024-01-15",
					endDate: "2024-01-22",
				},
				isFavorite: false,
			});
		}
		return listings;
	};

	return {
		generateUniqueId,
		getRandomElement,
		getRandomInt,
		getRandomCategorySlug,
		generateRandomPlace,
		generateRandomImageUrl,
		generateRandomAltText,
		generateRandomImages,
		generateRandomListings,
	};
};

export default useGenerators;
