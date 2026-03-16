import type {Recipe} from "../types/recipe.ts";
import type {ReactNode} from "react";

type Props = {
    addRecipe: (recipe: Recipe) => void,
    recipes: Recipe[]
    isLoggedIn: boolean,
}

const withAuth = (WrappedComponent: (props: Props) => ReactNode) => {
    return function ComponentWithAuth(props: Props) {
        if (props.isLoggedIn) {
            return <WrappedComponent {...props} />
        }
    }
}

    export default withAuth;
