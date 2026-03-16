// Define allowed categories for recipes
export type Category = "Breakfast" | "Lunch" | "Dinner" | "Snack";

// Define the structure of a Recipe object
export interface Recipe {

    id: number; // unique id for each recipe

    title: string; // recipe title

    category: Category; // recipe category

    prepTime: number; // preparation time in minutes

    ingredients: string[]; // list of ingredients
}