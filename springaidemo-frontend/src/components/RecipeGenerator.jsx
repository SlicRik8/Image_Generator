import axios from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');

    const [cuisine, setCuisine] = useState('any');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('no');
    const [recipe, setRecipe] = useState('');


    const createRecipe = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/create-recipe?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`)
            const data = response.data;

            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe: ", error);
        }
    }


    return (
        <>
            <div className="flex flex-col items-center gap-6 p-6">
                <h2 className="text-5xl font-bold">Create a Recipe</h2>


                <input className="w-full max-w-lg p-3 rounded-xl border border-gray-3000 text-base text-gray-300 focus:outline-none"
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Enter Ingredients (comma seperated)"
                />
                <input className="w-full max-w-lg p-3 rounded-xl border border-gray-3000 text-base text-gray-300 focus:outline-none"
                    type="text"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="Enter cuisine type"
                />
                <input className="w-full max-w-lg p-3 rounded-xl border border-gray-3000 text-base text-gray-300 focus:outline-none"
                    type="text"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="Enter dietary restrictions"
                />

                <button className="px-4 py-2 text-base bg-blue-600 text-white rounded-xl cursor-pointer " onClick={createRecipe}>Create Recipe</button>

                {recipe && (
                    <div className="w-full max-w-[700px] bg-gray-400 rounded-xl p-4 text-left text-black text-sm">
                        <ReactMarkdown>{recipe}</ReactMarkdown>
                    </div>
                )}



            </div>

        </>
    )
}

export default RecipeGenerator;
