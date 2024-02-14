import type { IDestinationItemProps as Destination } from "~/types/destination";
import type { IGuestItemProps as Guest } from "~/types/guest";

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
]