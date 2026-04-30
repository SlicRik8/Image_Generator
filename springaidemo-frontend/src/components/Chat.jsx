import axios from "axios";
import { useState } from "react";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);
      setResponse("");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/ask-ai-options?prompt=${encodeURIComponent(prompt)}`
      );

      setResponse(res.data);
    } catch (error) {
      console.error("Error generating response: ", error);
      alert("Chat request failed. Check backend logs or browser console.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading && prompt.trim()) {
      askAI(e);
    }
  };

  return (
    <section className="mx-auto max-w-4xl py-8">
      <div className="mb-10">
        <p className="mb-4 text-sm text-[#8c6f4f]">Chat tool</p>
        <h2 className="font-serif text-6xl leading-none tracking-tight">
          Ask anything.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#63584e]">
          A clean little space for questions, ideas, rewrites, plans, and random
          thoughts.
        </p>
      </div>

      <div className="min-h-[460px] rounded-[3rem] bg-[#fffaf2] p-5 shadow-[0_30px_90px_rgba(40,30,20,0.12)]">
        <div className="flex min-h-[420px] flex-col rounded-[2.5rem] bg-white/70 p-6">
          <div className="flex-1 overflow-y-auto">
            {!response && !loading && (
              <div className="flex h-full items-center justify-center text-sm text-[#8d8176]">
                Ask something to get started
              </div>
            )}

            {loading && (
              <div className="flex h-full items-center justify-center text-sm text-[#8d8176]">
                Thinking...
              </div>
            )}

            {response && (
              <div className="max-w-2xl rounded-[2rem] bg-[#15120f] px-6 py-5 text-sm leading-7 text-[#fffaf2] whitespace-pre-wrap">
                {response}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-full border border-[#15120f]/10 bg-[#f4efe7] px-4 py-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 bg-transparent px-2 text-sm text-[#15120f] placeholder-[#8d8176] outline-none"
            />

            <button
              type="button"
              onClick={askAI}
              disabled={loading || !prompt.trim()}
              className="rounded-full bg-[#15120f] px-6 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chat;