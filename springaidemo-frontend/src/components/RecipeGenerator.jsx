import axios from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const createRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/create-recipe?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Error generating recipe: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">Recipe Generator</h2>
      <p className="text-gray-500 text-sm -mt-2">Tell us what you have and we'll do the rest</p>

      <div className="flex gap-6 mt-4">

        
        <div className="w-2/5 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
          <label className="text-sm text-gray-400 font-medium">Ingredients</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="tomato, onion, cheese..."
          />

          <label className="text-sm text-gray-400 font-medium">Cuisine Type</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="Italian, Indian, Continental..."
          />

          <label className="text-sm text-gray-400 font-medium">Dietary Restrictions</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all"
            type="text"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            placeholder="gluten-free, vegan, none..."
          />

          <button
            onClick={createRecipe}
            disabled={loading || !ingredients}
            className="w-full mt-2 py-3 bg-white text-black text-sm font-semibold rounded-full cursor-pointer hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
            {loading ? "Creating Recipe..." : "Create Recipe"}
          </button>
        </div>

        
        <div className="w-3/5">
          {loading && (
            <div className="w-full h-full min-h-96 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 text-sm animate-pulse">
              Cooking up your recipe...
            </div>
          )}
          {recipe && (
            <div className="w-full h-full bg-gray-900 border border-gray-800 rounded-2xl p-6 text-gray-200 text-sm leading-relaxed overflow-y-auto [scrollbar-width:none] prose prose-invert max-h-[600px]">
              <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>
          )}
          {!recipe && !loading && (
            <div className="w-full h-full min-h-96 rounded-2xl border border-dashed border-gray-800 flex items-center justify-center text-gray-600 text-sm">
              Your recipe will appear here
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default RecipeGenerator;