import banner from "../assets/banner1.jpg"
import add from "../assets/adidas.png"
import behance from "../assets/behance.png"
import simple from "../assets/simple.png"
import twitch from "../assets/allen.png"
import puma from "../assets/puma.png"
import laddies from "../assets/p_img1.png"
import popcorn from "../assets/p_img2.png"
import jeans from "../assets/p_img7.png"
import star from "../assets/star_icon.png"
import len from "../assets/p_img6.png"
import cart from "../assets/cart_icon.png"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Favourite from "./Favourtie"
import Footer from "./Footer"
import auth from "../firebase/config"
import { signOut } from "firebase/auth"

function Home() {

    var [pop, setpop] = useState(40)
    var [lad, setlad] = useState(30)
    var [pan, setpan] = useState(50)
    var [lap, setlap] = useState(55)
    const navigate = useNavigate()

    const [log, setlog] = useState(false)
    const [open, setopen] = useState(false)


    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("User Logged In")
                setlog(true)
            }
            else {
                console.log("User not Logged in")
            }
        })

    }, [])



    function Logout() {
        signOut(auth)
        navigate("/")
    }




    function increment() {
        setpop(pop++)
    }
    function increlad() {
        setlad(lad++)
    }
    function increpan() {
        setpan(pan++)
    }
    function increlap() {
        setlap(lap++)
    }




    return (<div>
        <div className="m-10 grid sm:grid-cols-2 md:grid-cols-1 justify-center lg:grid-cols-1">
            <div className="bg-slate-300 p-5 fixed top-0 left-0 w-full z-20">
                <div className="flex items-center justify-around">
                    <h1 className="text-3xl font-bold font-mono">Luxemart</h1>
                    <div className="space-x-10 items-center hidden md:flex">
                        <Link to={"/home"}><p className="text-2xl font-bold">Home</p></Link>
                        <Link to={"/men"}><p className="text-2xl font-bold">Men</p></Link>
                        <Link to={"/female"}><p className="text-2xl font-bold">Female</p></Link>
                        <Link to={"/kids"}><p className="text-2xl font-bold">Kids</p></Link>
                    </div>

                    <div className="items-center justify-around space-x-10 hidden md:flex">
                    <Link to={"/card"}><img src={cart} alt="no_img" /></Link> 
                        {
                            log ? <button className="bg-[#2a52f5] p-2 text-white rounded-md" onClick={Logout} >Log Out</button> : <button className="bg-[#2a5f] p-2 text-white rounded-md"><Link to={"/log"}>Login</Link></button>
                        }
                    </div>
                    <button><svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setopen(true) }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 md:hidden">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg ></button>
                </div>
            </div>
            {
                open ? <p>hello</p> : ""
            }
            <div>
            <div className={`bg-slate-300 fixed w-[250px] h-screen  z-30  top-0 ${open ? "right-0" : "-right-[550px]"}`} style={{transition:"2s"}}>  
                    <div className="flex flex-col items-center space-y-5 p-3 mt-[50px]">
                    <button className="text-3xl bg-red-600 p-2 rounded-lg text-white" onClick={()=>{setopen(false)}}>X</button>
                        <Link to={"/home"}><p className="text-2xl font-bold">Home</p></Link>
                        <Link to={"/men"}><p className="text-2xl font-bold">Men</p></Link>
                        <Link to={"/female"}><p className="text-2xl font-bold">Female</p></Link>
                        <Link to={"/kids"}><p className="text-2xl font-bold">Kids</p></Link>
                        <Link to={"/card"}><img src={cart} alt="no_img" /></Link> 
                       {
                            log ? <button className="bg-[#2a52f5] p-2 text-white rounded-md" onClick={Logout} >Log Out</button> : <button className="bg-[#2a5f] p-2 text-white rounded-md"><Link to={"/log"}>Login</Link></button>
                        }
                    </div>

                </div>
            </div>
            <div id="heading" className="p-3 mt-[100px] border rounded-md">
                <img src={banner} alt="" />
            </div>
            <div>
                <h1 className="p-4 text-3xl font-bold">Brands</h1>
                <div id="rtx" className="flex flex-wrap justify-around bg-slate-200 p-2 bg-opacity-30 rounded-md">
                    <img src={add} alt="" />
                    <img src={behance} alt="" />
                    <img src={puma} alt="" />
                    <img src={simple} alt="" />
                    <img src={twitch} alt="" />
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <h1 className="text-3xl p-4 font-bold mt-4">Trending Now</h1>
            <div className="flex flex-wrap">
                <div id="brand_1" className="p-3">
                    <img src={popcorn} alt="No such images" />
                    <div id="logo" className="flex justify-center items-center gap-5 sm:justify-center">
                        <p className="text-xl">Premium Drop Shoulder</p>
                        <div className="flex gap-1 flex-wrap">
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                        </div>

                    </div>

                    <button className="cursor-pointer" onClick={increment}>❤️{pop} Likes</button>
                </div>
                <div id="brand_1" className="p-3">
                    <img src={laddies} alt="no such images" />
                    <div id="logo" className="flex justify-between items-center gap-5">
                        <p className="text-xl">Printed Top</p>
                        <div className="flex gap-1">
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                        </div>
                    </div>

                    <button className="cursor-pointer" onClick={increlad}>❤️{lad} Likes</button>
                </div>
                <div id="brand_1" className="p-3">
                    <img src={jeans} alt="no such image" />
                    <div id="logo" className="flex justify-between items-center">
                        <p className="text-xl">Formal Pant's</p>
                        <div className="flex gap-1 flex-wrap">
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                            <img src={star} alt="no image" />
                        </div>
                    </div>
                    <button className="cursor-pointer" onClick={increpan}>❤️{pan} Likes</button>
                </div>
                <div id="brand_1" className="p-3">
                    <img src={len} alt="no such images" className="bg-slate-100" />
                    <div id="logo" className="flex justify-between items-center flex-wrap">
                        <p className="text-xl">Lenovo LOQ i5</p>
                        <div>
                            <div className="flex gap-1 flex-wrap">
                                <img src={star} alt="no image" />
                                <img src={star} alt="no image" />
                                <img src={star} alt="no image" />
                                <img src={star} alt="no image" />
                                <img src={star} alt="no image" />
                            </div>
                        </div>
                    </div>
                    <button className="cursor-pointer" onClick={increlap}>❤️{lap} Likes</button>

                </div>
            </div>
        </div>
        <div>
            <h1 className="text-3xl p-4 mt-[5px] font-bold text-center">Best Selling</h1>
            <div>
                <div className="flex justify-center flex-wrap">
                    <Favourite />
                </div>
            </div>
        </div>
        <div>
            <Footer />
        </div>

    </div>)

}
export default Home