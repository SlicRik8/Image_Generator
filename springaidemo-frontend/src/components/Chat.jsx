import axios from "axios";
import { useState } from "react";

function Chat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    try {
      setLoading(true);
      setResponse('');
      const res = await axios.get(`http://localhost:8080/ask-ai-options?prompt=${prompt}`);
      setResponse(res.data);
    } catch (error) {
      console.error("Error generating response: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading && prompt) askAI();
  }

  return (
    <div className="flex flex-col gap-4 h-[75vh]">
      <h2 className="text-3xl font-bold tracking-tight">Ask AI</h2>
      <p className="text-gray-500 text-sm -mt-2">Ask a question and get an instant response</p>

    
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 overflow-y-auto">
        {!response && !loading && (
          <div className="h-full flex items-center justify-center text-gray-600 text-sm">
            Ask something to get started...
          </div>
        )}
        {loading && (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm animate-pulse">
            Thinking...
          </div>
        )}
        {response && (
          <p className="text-gray-200 text-sm leading-relaxed">{response}</p>
        )}
      </div>

      
      <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-full px-5 py-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 text-sm text-white placeholder-gray-500 focus:outline-none bg-transparent"
        />
        <button
          onClick={askAI}
          disabled={loading || !prompt}
          className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full cursor-pointer hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          Send
        </button>
      </div>

    </div>
  )
}

export default Chat;