import { Link, useParams } from "react-router-dom";
import { type Recipe } from "../types/recipe";

type Props = {
    recipes: Recipe[];
};

export default function RecipeDetail({ recipes }: Props) {
    const { id } = useParams();
    const recipe = recipes.find(recipe => recipe.id === Number(id));

    if (!recipe) return <p>Recipe not found</p>;

    return (
        <div className="recipe-detail">
            <Link to="/" className="back-link">← Back to Recipes</Link>
            <h2>{recipe.title}</h2>
            <p>Category: {recipe.category}</p>
            <p>Prep time: {recipe.prepTime} minutes</p>
            <h4>Ingredients</h4>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
}