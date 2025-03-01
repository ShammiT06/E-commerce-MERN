import { useState } from "react"
import main from "../assets/p_img2.png"
import back from "../assets/p_img2_2.png"
import neck from "../assets/p_img2_3.png"
import last from "../assets/p_img2_4.png"
import axios from "axios"

const Favourite = () => {
    const images = [
        main,
        back,
        neck,
        last,
    ];

    const [selectedImage, setSelectedImage] = useState(images[0]); // Default first image

    var [count, setcount] = useState(20)

    function fav()
    {
        setcount(count++)

    }

    return (
        <div>
            <div className="flex gap-10 p-16">
                <div className="flex flex-col ml-[10%] p-4 flex-wrap gap-2 cursor-pointer">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="No such images"
                            className={`w-[100px] h-[100px] border-2 rounded-lg cursor-pointer transition-all ${selectedImage === img ? "border-blue-500" : "border-gray-300"
                                }`}
                            onClick={() => setSelectedImage(img)} // Click to change main image
                        />
                    ))}
                </div>
                {/* Large Display Image */}
                <div className="w-[300px] h-fit mt-[30px] border-2 border-black">
                    <img src={selectedImage} alt="Selected" className="object-contain " />
                </div>
                <div className="mt-[30px]">
                    <h1 className="text-3xl font-bold">Pastel Pink Polo Shirt</h1>
                    <p className="text-xl mt-2 font-mono">&#8377;1199</p>
                    <p className="line-through font-serif">&#8377;1499</p>
                    <div className="font-bold text-3xl">
                    <p>{count}❤️</p>
                    </div>
                    <div className="mt-5">
                        <button className="bg-blue-500 p-2 text-white w-[65%] text-xl" onClick={fav}>Add to Favourite</button>
                    </div>
                </div>
                <div>
                </div>


            </div>
        </div>
    );
};

export default Favourite