import { useState } from "react"
import ImageGenerator from "./components/ImageGenerator";
import Chat from "./components/Chat";
import RecipeGenerator from "./components/RecipeGenerator";

function App() {
  const [activeTab, setActiveTab] = useState('image-generator');

  return (
    <div className="min-h-screen bg-black text-white">
      
   
      <div className="flex items-center justify-between px-10 py-5 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-widest  text-white">✦ Brainrot.ai</h1>

        <div className="flex gap-2">
          {[
            { id: 'image-generator', label: 'Image Generator' },
            { id: 'chat', label: 'Ask AI' },
            { id: 'recipe-generator', label: 'Recipe Generator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                ${activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

     
      <div className="max-w-4xl mx-auto mt-10 px-6">
        {activeTab === 'image-generator' && <ImageGenerator />}
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'recipe-generator' && <RecipeGenerator />}
      </div>

    </div>
  )
}

export default App