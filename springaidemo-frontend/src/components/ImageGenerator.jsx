import { useState } from "react";
import axios from "axios";

function ImageGenerator(){

    const [prompt,setPrompt] = useState('');
    const [image,setImage] = useState(null);
    const [loading,setLoading] = useState(false);


    const generateImage = async() => {
        // if(!prompt.trim()){
        //     alert("Please enter a prompt first!");
        //     return;
        // }

        try{
            setLoading(true);
            setImage(null);

            const response = await axios.get(`http://localhost:8080/generate-image?prompt=${prompt}`,{
                responseType:'text'
            });

            const base64 = response.data;
            setImage(`data:image/jpeg;base64,${base64}`)
        }catch(error){
            console.error("Error Genrating image: ",error);
        }finally{
            setLoading(false);
        }
    }


    return(
        <>
        <div className="flex flex-col items-center gap-6 p-6">
            <h2 className="text-5xl font-bold">Image Generator</h2>
            <input className="w-full h-10 p-2 max-w-lg rounded-xl border  border-gray-300 text-base focus:outline-none "
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt for image."
                />
            
            <button className="px-3 py-1 bg-blue-600 text-base text-white rounded-xl cursor-pointer " onClick={generateImage} disabled={loading || !prompt.trim()}>{loading ? "Generating Image":"Generate Image"}</button>



            <div className="w-full max-w-lg flex justify-center">
                {loading && <p className="text-gray-500 text-lg">Please wait, this may take some time</p>}
                {image && <img src={image} alt="Generated" className="rounded-2xl w-full"/>}
                {!image && !loading && (
                    <div className="w-full h-80 rounded-2xl border-2  border-gray-300 flex items-center justify-center text-gray-400">
                        Your image will appear here
                    </div>
                )}
            </div>


        </div>
        
        </>
    )
}

export default ImageGenerator;
