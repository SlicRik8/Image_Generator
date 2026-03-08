import axios from "axios";
import { useState } from "react";

function Chat(){


    const [prompt,setPrompt] = useState('');
    const [chatResponse,setChatResponse] = useState('');
    const[loading,setLoading] = useState(false);


    const askAI = async()=> {
        try{
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/ask-ai-options?prompt=${prompt}`)
            const data = response.data;
            console.log(data);
            
            setChatResponse(data);

        }catch(error){
            console.error("Error generating response : ",error);
        }finally{
            setLoading(false);
        }
    }


    return(

        <>
        <div className="flex flex-col items-center gap-6 p-6">
            <h2 className="text-5xl font-bold">Talk to AI</h2>
            <input className="w-full max-w-lg p-3 rounded-xl border border-gray-300 text-base text-gray-300 focus:outline-none"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter a Prompt for AI"
                />

                <button onClick={askAI} disabled = {loading || !prompt} className="px-4 py-2 text-base bg-blue-600 text-white rounded-xl cursor-pointer">
                    {loading ? "Please Wait":"Ask AI"}
                    </button>

                {chatResponse &&(
                <div className="w-full max-w-[700px] bg-gray-400 rounded-xl p-4 text-left text-black text-sm">
                    <p>{chatResponse}</p>
                </div>
)}
        </div>
        </>
    )
}

export default Chat;