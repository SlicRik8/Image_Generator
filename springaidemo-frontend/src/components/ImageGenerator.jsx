import { useState } from "react";
import axios from "axios";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    try {
      setLoading(true);
      setImage(null);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/generate-image?prompt=${prompt}`,
        { responseType: "text" }
      );
      setImage(`data:image/jpeg;base64,${response.data}`);
    } catch (error) {
      console.error("Error generating image: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="pt-8">
        <p className="mb-4 text-sm text-[#8c6f4f]">Image tool</p>
        <h2 className="font-serif text-6xl leading-none tracking-tight">
          Make an image.
        </h2>
        <p className="mt-5 max-w-md text-lg leading-8 text-[#63584e]">
          Describe what you want. Keep it loose, specific, weird, cinematic —
          whatever fits.
        </p>

        <div className="mt-10 max-w-lg">
          <label className="text-sm text-[#6f604f]">Your prompt</label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A moody coffee shop at night, rain on the windows, warm lamps..."
            rows={8}
            className="mt-3 w-full resize-none rounded-[2rem] border border-[#15120f]/10 bg-white/70 p-5 text-sm leading-6 text-[#15120f] shadow-sm outline-none transition focus:border-[#15120f]/30 focus:bg-white"
          />

          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="mt-4 rounded-full bg-[#15120f] px-7 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {loading ? "Making it..." : "Generate"}
          </button>
        </div>

        <div className="mt-12 max-w-sm border-l border-[#15120f]/15 pl-5 text-sm leading-7 text-[#75695e]">
          Try adding light, camera angle, place, mood, material, and a little
          imperfection. That usually makes it feel less generic.
        </div>
      </div>

      <div className="relative min-h-[620px]">
        <div className="absolute right-4 top-8 h-64 w-64 rounded-full bg-[#d8a15f]/30 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-[#809671]/20 blur-3xl" />

        <div className="relative mt-8 rounded-[3rem] bg-[#fffaf2] p-4 shadow-[0_30px_90px_rgba(40,30,20,0.14)] rotate-1">
          {loading && (
            <div className="flex min-h-[560px] items-center justify-center rounded-[2.5rem] bg-[#15120f] text-sm text-white/60">
              Working on it...
            </div>
          )}

          {image && (
            <img
              src={image}
              alt="Generated"
              className="min-h-[560px] w-full rounded-[2.5rem] object-cover"
            />
          )}

          {!image && !loading && (
            <div className="flex min-h-[560px] items-center justify-center rounded-[2.5rem] border border-dashed border-[#15120f]/15 bg-[#f4efe7] text-sm text-[#8d8176]">
              Image preview lands here
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ImageGenerator;