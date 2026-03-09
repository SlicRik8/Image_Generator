import { useState } from "react";
import axios from "axios";

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    try {
      setLoading(true);
      setImage(null);
      const response = await axios.get(`http://localhost:8080/generate-image?prompt=${prompt}`, {
        responseType: 'text'
      });
      setImage(`data:image/jpeg;base64,${response.data}`);
    } catch (error) {
      console.error("Error generating image: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">Image Generator</h2>
      <p className="text-gray-500 text-sm -mt-2">Describe anything and watch it come to life</p>

      <div className="flex gap-6 mt-4">


        <div className="flex flex-col gap-4 w-2/5">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
            <label className="text-sm text-gray-400 font-medium">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city at sunset, cinematic lighting..."
              rows={5}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none transition-all"
            />
            <button
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
              className="w-full py-3 bg-white text-black text-sm font-semibold rounded-full cursor-pointer hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </div>

          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-xs font-medium mb-3">Prompt Tips</p>
            <ul className="text-gray-500 text-xs flex flex-col gap-2">
              <li>— Be descriptive and specific</li>
              <li>— Mention lighting (e.g. golden hour)</li>
              <li>— Add art style (e.g. photorealistic)</li>
              <li>— Include mood or atmosphere</li>
            </ul>
          </div>
        </div>

        
        <div className="w-3/5">
          {loading && (
            <div className="w-full h-full min-h-96 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 text-sm animate-pulse">
              Generating your image...
            </div>
          )}
          {image && (
            <img src={image} alt="Generated" className="rounded-2xl w-full border border-gray-800 shadow-lg" />
          )}
          {!image && !loading && (
            <div className="w-full h-full min-h-96 rounded-2xl border border-dashed border-gray-800 flex items-center justify-center text-gray-600 text-sm">
              Your image will appear here
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default ImageGenerator;