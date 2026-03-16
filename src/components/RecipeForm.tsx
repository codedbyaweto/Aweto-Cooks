import { useState, type SubmitEvent } from "react";
import { type Recipe, type Category } from "../types/recipe";
import IngredientInput from "./IngredientInput";

type Props = {
    addRecipe: (recipe: Recipe) => void;
    recipes: Recipe[];
};

export default function RecipeForm({ addRecipe, recipes }: Props) {
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<Category | "">("");
    const [prepTime, setPrepTime] = useState<number>(0);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    function addIngredient(ingredient: string) {
        setIngredients([...ingredients, ingredient]);
    }

    function removeIngredient(index: number) {
        setIngredients(ingredients.filter((_t, i) => i !== index));
    }

    function handleSubmit(e: SubmitEvent) {

        e.preventDefault();
        if (!title.trim()) return setError("Title required");
        if (recipes.some(recipe => recipe.title === title.trim()))
            return setError("Title must be unique");

        if (!category) return setError("Select category");

        if (prepTime <= 0) return setError("Prep time must be positive");

        if (ingredients.length === 0)
            return setError("Add at least one ingredient");

        const newRecipe: Recipe = {
            id: Date.now(),
            title,
            category,
            prepTime,
            ingredients
        };

        addRecipe(newRecipe);

        setTitle("");
        setCategory("");
        setPrepTime(0);
        setIngredients([]);
        setError("");
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <input
                placeholder="Recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
            >
                <option value="">Select category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>

            <input
                type="number"
                placeholder="Prep time"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
            />

            <IngredientInput addIngredient={addIngredient} />

            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient}
                        <button type="button" onClick={() => removeIngredient(index)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <button type="submit">Add Recipe</button>
        </form>
    );
}