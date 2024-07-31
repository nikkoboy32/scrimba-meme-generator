import React, {useEffect, useState} from "react"

export default function MainComponent() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        memeImage: "https://i.imgflip.com/1bij.jpg"
    })

    const [allMeme, setAllMeme] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setAllMeme(data.data.memes))

    }, [])

 
    function handleClick() {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const memeArray = allMeme[randomNumber].url
       
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                memeImage: memeArray, 
                topText: "",
                bottomText: ""
            }
        })
    }

    function handleChange(e) {
       const {name, value} = e.target

       setMeme(prevMeme => {
        return {
            ...prevMeme,
            [name]: value
        }
       })
    }

    return (
        <main>
            <div className="meme_con">
                <div className="input_con"> 
                    
                    <input 
                    type="text" 
                    id="top_text" 
                    placeholder="Top Text"
                    onChange={handleChange}
                    name="topText"
                    value={meme.topText}
                    />
                    
                   
                    <input 
                    type="text" 
                    id="bottom_text" 
                    placeholder="Bottom Text"
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                    />
                   

                    <button onClick={handleClick} className="generate_meme_btn">Get a new meme image</button>
                </div>
                <div className="image_con">
                    <figure>
                        <img src={meme.memeImage} alt="meme-image"/>
                    </figure>
                    <h2 className="form_top_text">{meme.topText}</h2>
                    <h2 className="form_bottom_text">{meme.bottomText}</h2>
                </div>
           </div>
        </main>
    )
}