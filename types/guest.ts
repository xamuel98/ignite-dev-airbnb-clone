export interface IGuestItemProps {
    id?: number;
    title: string;
    subtitle: string;
    min: number;
    max: number;
}   

export interface IGuestItemEmits {
    (event: "updateCounts", category: string, count: number): { [key: string]: number }
}

export interface IGuestCategoryCountEmits {
    (event: "getCategory", payload: { [key: string]: number }): { [key: string]: number }
}