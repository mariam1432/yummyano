export interface Recipe {
    title: string;
    difficultyLevel: string;
    category: string;
    servingPortions: string;
    prepTime: string;
    description: string;
    ingredients: Ingredient[];
    directions: Direction[];
    archived?: boolean;
    approved?: boolean;
}

export interface Ingredient {
    id: string;
    ingredient: string;
    quantity: string;
    unit: string;
}

export interface Direction {
    id: string;
    step: string;
}