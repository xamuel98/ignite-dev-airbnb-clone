/**
 * @author Sanni Samuel
 */

import type { IDestinationItemProps as Destination } from "~/types/destination";
import type { IGuestItemProps as Guest } from "~/types/guest";
import type { ICategoryProps as Category } from "~/types/category";
import type { ListCardProps as Listing, ImageProps } from "~/types/listing";

// Static destinations
export const DESTINATIONS: Destination[] = [
    {
        id: 1,
        name: "Flexible",
        imageURL: "/images/flexible.jpeg",
        slug: "flexible",
        title: "I'm flexible"
    },
    {
        id: 2,
        name: "Europe",
        imageURL: "/images/europe.webp",
        slug: "europe",
        title: "Europe"
    },
    {
        id: 3,
        name: "Canada",
        imageURL: "/images/canada.webp",
        slug: "canada",
        title: "Canada"
    },
    {
        id: 4,
        name: "United States",
        imageURL: "/images/united-states.webp",
        slug: "united-states",
        title: "United States"
    },
    {
        id: 5,
        name: "United Kingdom",
        imageURL: "/images/united-kingdom.webp",
        slug: "united-kingdom",
        title: "United Kingdom"
    },
    {
        id: 6,
        name: "Middle East",
        imageURL: "/images/middle-east.webp",
        slug: "middle-east",
        title: "Middle East"
    },
];

// Static guest categories
export const GUEST_CATEGORY: Guest[] = [
    {
        id: 1,
        title: "Adults",
        subtitle: "Ages 13 or above",
        min: 1,
        max: 16,
    },
    {
        id: 2,
        title: "Children",
        subtitle: "Age 2-12",
        min: 0,
        max: 16,
    },
    {
        id: 3,
        title: "Infants",
        subtitle: "Under 2",
        min: 0,
        max: 5,
    },
    {
        id: 4,
        title: "Pets",
        subtitle: "Bring a service animal",
        min: 0,
        max: 5,
    }
];

// Static listings categories
export const CATEGORIES: Category[] = [
    {
        name: "Rooms",
        slug: "rooms",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Trending",
        slug: "trending",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Amazing views",
        slug: "amazing-views",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Lake",
        slug: "lake",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Farms",
        slug: "farms",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Boats",
        slug: "boats",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Shepherd's hut",
        slug: "shepherds-hut",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "National parks",
        slug: "national-parks",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Off-the-grid",
        slug: "off-the-grid",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Castles",
        slug: "castles",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "New",
        slug: "new",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Design",
        slug: "design",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "OMG!",
        slug: "omg",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Tiny homes",
        slug: "tiny-homes",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Cabins",
        slug: "cabins",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Arctic",
        slug: "arctic",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Bed & breakfasts",
        slug: "bed-breakfast",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Beach",
        slug: "beach",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Campers",
        slug: "campers",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Islands",
        slug: "islands",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Amazing pools",
        slug: "amazing-pools",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Surfing",
        slug: "surfing",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Caves",
        slug: "caves",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Tropical",
        slug: "tropical",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Iconic cities",
        slug: "iconic-cities",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Country side",
        slug: "country-side",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Lake front",
        slug: "lake-front",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Mansions",
        slug: "mansions",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "A-frames",
        slug: "a-frames",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Earth homes",
        slug: "earth-homes",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Camping",
        slug: "camping",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Golfing",
        slug: "golfing",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Historical homes",
        slug: "historical-homes",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Luxe",
        slug: "luxe",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Vineyards",
        slug: "vineyards",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Hanoks",
        slug: "hanoks",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Top of the world",
        slug: "top-of-the-world",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Skiing",
        slug: "skiing",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Cycladic homes",
        slug: "cycladic-homes",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Trending",
        slug: "trending",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Windmills",
        slug: "windmills",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Tree houses",
        slug: "tree-houses",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Ryokans",
        slug: "ryokans",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Yurts",
        slug: "yurts",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Minsus",
        slug: "minsus",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Towers",
        slug: "towers",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Barns",
        slug: "barns",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Desert",
        slug: "desert",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Domes",
        slug: "domes",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Container",
        slug: "containers",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Trulli",
        slug: "trulli",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Dammusi",
        slug: "dammusi",
        iconURL: "/icons/package.jpeg",
    },
    {
        name: "Riads",
        slug: "riads",
        iconURL: "/icons/package.jpeg",
    }
];

/**
 * @description Function to generate random image URLs for listing
 * @param {String} seed seed to resolve Hydration attribute mismatch on server side
 * @returns {String} A random image URL
 */
export const generateRandomImageUrl = (seed: string = ''): string => {
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
export const generateRandomAltText = (seed: string = ''): string => {
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
        "A green plant hanging from a ceiling light"
    ];
    const randomIndex = Math.floor(Math.random() * placeholderAltTexts.length);
    return  placeholderAltTexts[randomIndex];
};

/**
 * @description Generate random images for the listing
 * @param {Number} count Number of images and alt text to generate
 * @param {String} seed seed to resolve Hydration attribute mismatch on server side
 * @returns {Array} An array of objects containing random images and alt text
 */
export const generateRandomImages = (count: number): ImageProps[] => {
    const images: ImageProps[] = [];
    for (let i = 0; i < count; i++) {
        const src = generateRandomImageUrl();
        const alt = generateRandomAltText();
        images.push({ src, alt });
    }
    return images;
};

// Static listings
export const LISTINGS: Listing[] = [
    {
        data: {
            id: "1",
            images: generateRandomImages(7),
            title: "Terricciola, Italy",
            description: "Description 1",
            rating: 4.5,
            category: "trending",
            roomCount: 3,
            bathroomCount: 2,
            guestCount: 6,
            price: 100.65,
            country: "Italy",
            latlng: [0, 0],
            region: "Region 1",
        },
        reservation: {
            startDate: '2024-01-15',
            endDate: '2024-01-22',
        },
        isFavorite: false,
    },
    {
        data: {
            id: "2",
            images: generateRandomImages(5),
            title: "Lagos, Nigeria",
            description: "Description 1",
            rating: 4.5,
            category: "amazing-views",
            roomCount: 3,
            bathroomCount: 2,
            guestCount: 6,
            price: 100,
            country: "Nigeria",
            latlng: [0, 0],
            region: "Region 1",
        },
        reservation: {
            startDate: '2024-01-15',
            endDate: '2024-01-22',
        },
        isFavorite: false,
    },
];

/**
 * @description Generate a unique id
 * @param {Number} length length of unique id
 * @param {String} seed seed to resolve Hydration attribute mismatch on server side
 * @returns {String} A unique string ID
 */
export const generateUniqueId = (length: number=10, seed: string=''): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result: string = '';
    const characterLength = characters.length;

    for (let i = 0; i < characterLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characterLength));
    }

    return `${seed}-${result}`;
};