export interface ICategoryProps {
    name: string;
    slug: string;
    iconURL: string;
}

export interface ICategoryEmits {
    (event: "input", payload: string): string
}

export interface ICategoryValueEmits {
    (event: "getCategory", payload: string): string
}