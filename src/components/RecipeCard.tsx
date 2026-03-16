import React from "react";
import type {Recipe} from "../types/recipe.ts";
import {Link} from "react-router-dom";

type Props = {
    recipe: Recipe;
};

function RecipeCard({ recipe }: Props) {
    return (
        <li className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.category}</p>
                <span>{recipe.prepTime} min</span>
            </Link>
        </li>
    );
}

export default React.memo(RecipeCard);