import { useState, useMemo } from "react";
import { type Recipe, type Category } from "../types/recipe";
import RecipeCard from "../components/RecipeCard";

type Props = {
    recipes: Recipe[];
};

export default function RecipeList({ recipes }: Props) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<Category | "">("");
    const filteredRecipes = useMemo(() => {

        let result = recipes;

        if (search) {
            result = result.filter(res =>
                res.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            result = result.filter(res => res.category === category);
        }

        return result;

    }, [recipes, search, category]);

    return (
        <div className="recipe-list-container">

            <div className="filter-bar">

                <input
                    placeholder="Search recipe"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                >
                    <option value="">All categories</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>

            </div>

            <ul className="recipe-grid">
                {filteredRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </ul>

        </div>
    );
}