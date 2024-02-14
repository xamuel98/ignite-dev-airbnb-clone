export interface IDestinationItemProps {
    id?: number;
    name: string;
    imageURL: string;
    slug: string;
    title: string;
}   

export interface IDestinationItemEmits {
    (event: "input", payload: string): string
}

export interface IDestinationValueEmits {
    (event: "getDestination", payload: string): string
}