import axios from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const createRecipe = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/create-recipe?ingredients=${encodeURIComponent(
          ingredients
        )}&cuisine=${encodeURIComponent(cuisine)}&dietaryRestrictions=${encodeURIComponent(
          dietaryRestrictions
        )}`
      );

      setRecipe(response.data);
    } catch (error) {
      console.error("Error generating recipe: ", error);
      alert("Recipe request failed. Check backend logs or browser console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="pt-8">
        <p className="mb-4 text-sm text-[#8c6f4f]">Recipe tool</p>
        <h2 className="font-serif text-6xl leading-none tracking-tight">
          What can I cook?
        </h2>
        <p className="mt-5 max-w-md text-lg leading-8 text-[#63584e]">
          Drop in whatever is in your kitchen and get something that actually
          sounds worth making.
        </p>

        <div className="mt-10 space-y-5">
          <div>
            <label className="text-sm text-[#6f604f]">Ingredients</label>
            <input
              className="mt-2 w-full rounded-full border border-[#15120f]/10 bg-white/70 px-5 py-4 text-sm text-[#15120f] outline-none transition focus:border-[#15120f]/30 focus:bg-white"
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="tomato, onion, cheese..."
            />
          </div>

          <div>
            <label className="text-sm text-[#6f604f]">Cuisine</label>
            <input
              className="mt-2 w-full rounded-full border border-[#15120f]/10 bg-white/70 px-5 py-4 text-sm text-[#15120f] outline-none transition focus:border-[#15120f]/30 focus:bg-white"
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Indian, Italian, Thai..."
            />
          </div>

          <div>
            <label className="text-sm text-[#6f604f]">Dietary notes</label>
            <input
              className="mt-2 w-full rounded-full border border-[#15120f]/10 bg-white/70 px-5 py-4 text-sm text-[#15120f] outline-none transition focus:border-[#15120f]/30 focus:bg-white"
              type="text"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              placeholder="vegan, high protein, no nuts..."
            />
          </div>

          <button
            type="button"
            onClick={createRecipe}
            disabled={loading || !ingredients.trim()}
            className="rounded-full bg-[#15120f] px-7 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {loading ? "Cooking it up..." : "Make recipe"}
          </button>
        </div>
      </div>

      <div className="relative pt-10">
        <div className="absolute right-10 top-0 h-64 w-64 rounded-full bg-[#d8a15f]/25 blur-3xl" />

        <div className="relative rounded-[3rem] bg-[#fffaf2] p-5 shadow-[0_30px_90px_rgba(40,30,20,0.12)] -rotate-1">
          {loading && (
            <div className="flex min-h-[560px] items-center justify-center rounded-[2.5rem] bg-white/70 text-sm text-[#8d8176]">
              Writing your recipe...
            </div>
          )}

          {recipe && (
            <div className="min-h-[560px] max-h-[620px] overflow-y-auto rounded-[2.5rem] bg-white/80 p-8 text-sm leading-7 text-[#3d352e] [scrollbar-width:none] prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-[#15120f] prose-strong:text-[#15120f]">
              <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>
          )}

          {!recipe && !loading && (
            <div className="flex min-h-[560px] items-center justify-center rounded-[2.5rem] border border-dashed border-[#15120f]/15 bg-[#f4efe7] text-sm text-[#8d8176]">
              Your recipe will show up here
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecipeGenerator;