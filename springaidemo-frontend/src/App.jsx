import { useState } from "react"
import ImageGenerator from "./components/ImageGenerator";
import Chat from "./components/Chat";
import RecipeGenerator from "./components/RecipeGenerator";



function App() {

  const [activeTab, setActiveTab] = useState('image-generator');


  const handleTabChange = (tab) => {
   
    setActiveTab(tab);
  }


  return (
    <div className="min-h-screen bg-black">
      <div className="flex justify-center">
        <button className={`p-2 mx-2 mt-10 rounded-2xl cursor-pointer text-white ${activeTab === 'image-generator' ? 'bg-blue-600' : 'bg-slate-900'}`} onClick={() => handleTabChange('image-generator')}>Image Generator</button>
        <button className={`p-2 mx-2 mt-10 rounded-2xl cursor-pointer text-white ${activeTab === 'chat' ? 'bg-blue-600' : 'bg-slate-900'}`} onClick={() => handleTabChange('chat')}>Ask AI</button>
        <button className={`p-2 mx-2 mt-10 rounded-2xl cursor-pointer text-white ${activeTab === 'recipe-generator' ? 'bg-blue-600' : 'bg-slate-900'}`} onClick={() => handleTabChange('recipe-generator')}>Recipe Generator</button>


      </div>



      <div className="text-white text-5xl font-bold text-center mt-2">
        {activeTab === 'image-generator' && <ImageGenerator/>}
        {activeTab === 'chat' && <Chat/>}
        {activeTab === 'recipe-generator' && <RecipeGenerator />}
      </div>

    </div>
  )
}

export default App
