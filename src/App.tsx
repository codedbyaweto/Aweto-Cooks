import {useState, lazy, Suspense} from "react";
import {Link, Routes, Route} from "react-router-dom";
import {type Recipe} from "./types/recipe";
import RecipeForm from "./components/RecipeForm";
import withAuth from "./hoc/withAuth";
import "./App.css"

const RecipeList = lazy(() => import("./pages/RecipeList"));
const RecipeDetail = lazy(() => import("./pages/RecipeDetails"));

const ProtectedForm = withAuth(RecipeForm);

export default function App() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    function addRecipe(recipe: Recipe) {
        setRecipes([...recipes, recipe]);
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="logo">
                    <Link to="/" className="logo-link">Aweto Cooks</Link>
                </h1>

                <button
                    className="logout-btn"
                    onClick={() => setIsLoggedIn(!isLoggedIn)}
                >
                    {isLoggedIn ? "Logout" : "Login"}
                </button>
            </header>

            <ProtectedForm
                addRecipe={addRecipe}
                recipes={recipes}
                isLoggedIn={isLoggedIn}
            />

            {isLoggedIn && (
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route
                            path="/"
                            element={<RecipeList recipes={recipes}/>}
                        />
                        <Route
                            path="/recipe/:id"
                            element={<RecipeDetail recipes={recipes}/>}
                        />
                        <Route path="*"
                               element={<p>Error 404, Page not found.<Link to="/">Back to Home Page</Link></p>}
                        />
                    </Routes>
                </Suspense>
            )}
        </div>
    );
}