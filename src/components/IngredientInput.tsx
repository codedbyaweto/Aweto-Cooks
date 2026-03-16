import {type ChangeEvent, useState} from "react";

type Props = {
    addIngredient: (ingredient: string) => void;
};

export default function IngredientInput({addIngredient}: Props) {
    const [value, setValue] = useState("");
    function handleAdd() {

        if (!value.trim()) return;
        addIngredient(value.trim());
        setValue("");
    }

    return (
        <div>
            <input
                placeholder="Add ingredient"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>
                Add Ingredient
            </button>
        </div>
    );
}