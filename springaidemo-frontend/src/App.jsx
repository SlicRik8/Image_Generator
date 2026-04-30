import { useState } from "react";
import Landing from "./components/Landing";
import ImageGenerator from "./components/ImageGenerator";
import Chat from "./components/Chat";
import RecipeGenerator from "./components/RecipeGenerator";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home" },
    { id: "image-generator", label: "Images" },
    { id: "chat", label: "Chat" },
    { id: "recipe-generator", label: "Recipes" },
  ];

  return (
    <div className="min-h-screen bg-[#f4efe7] text-[#15120f]">
      <header className="sticky top-0 z-50 border-b border-[#15120f]/10 bg-[#f4efe7]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button onClick={() => setActiveTab("home")} className="text-left">
            <h1 className="font-serif text-2xl italic tracking-tight">Imagine</h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#8c6f4f]">
              Creative tools
            </p>
          </button>

          <nav className="flex gap-2 rounded-full bg-[#15120f]/5 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeTab === tab.id
                    ? "bg-[#15120f] text-white shadow-sm"
                    : "text-[#5f554c] hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {activeTab === "home" && <Landing setActiveTab={setActiveTab} />}
        {activeTab === "image-generator" && <ImageGenerator />}
        {activeTab === "chat" && <Chat />}
        {activeTab === "recipe-generator" && <RecipeGenerator />}
      </main>
    </div>
  );
}

export default App;