export interface Listing {
    id: string;
    images: ImageProps[];
    title: string;
    description: string;
    rating: GLfloat;
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    price: number;
    country: string;
    latlng: number[];
    region: string;
}

export interface ListCardProps {
    data: Listing;
    reservation?: {
        id?: string;
        startDate: string;
        endDate: string;
    };
    isFavorite: boolean;
}

export interface ImageProps {
    src: string;
    alt: string;
}

export interface IFilterQueryParams {
    [key: string]: string | null;
}