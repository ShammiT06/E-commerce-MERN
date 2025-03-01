import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import auth from "../firebase/config"
function Navbar()
{

    const navigate=useNavigate()

    useEffect(function(){
        auth.onAuthStateChanged(function(user){
            if(user)
            {
                navigate("/home")

            }
        })
    },[])




    return(<div>
        <div className="bg-slate-500 w-screen h-screen overflow-hidden">
            <div className="bg-white flex flex-col gap-5 flex-wrap items-center justify-evenly p-10 mt-[15%] rounded-md m-14">
                <h1 className="text-5xl  font-mono font-bold">Hello</h1>
                <h1 className="text-4xl font-mono font bold">Welcome to LuxeMart</h1>
                <h1 className="text-3xl font-bold">Please Login to Enjoy Your Shopping 🛍️</h1>
                <button className="bg-[#1877F2] text-white p-3 rounded-md w-[20%] text-2xl font-medium"><Link to={"/log"}>Login</Link></button>
              
                

            </div>

        </div>
    </div>)
}












export default Navbar