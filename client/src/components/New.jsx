import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import auth from "../firebase/config"
import { createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"
function Newuser()
{
    const[error,seterror]=useState(false)
    const[user,setuser]=useState("")
    const[pass,setpass]=useState("")
    const[correctpass,setcorrectpass]=useState("")

    const navigate=useNavigate()



    
    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
            if(user)
            {
                navigate("/home")

            }
        })
    },[])


    function createuser()
    {
        if(pass !== correctpass)
        {
            seterror("Password Doesn't Match")
            return
        }
        seterror("")
        try{
            createUserWithEmailAndPassword(auth,user,pass).then((res)=>{
                setuser("")
                setpass("")
                setcorrectpass("")
                console.log("User added Successfully:",res)
                navigate("/log")
        })
        }
        catch{
                alert("Please Fill Necessary Details")
                console.log("User not added Successfully")

        }

          


        
    }



    return(<div>
        <div className="bg-blue-200 h-screen overflow-hidden">
            <div className="bg-gray-400 rounded w-[35%] p-2 m-auto mt-[15%] bg-opacity-15">
                <h1 className="text-center text-2xl font-mono font-bold">Join LuxeMart</h1>
                <div className="flex flex-col justify-center items-center flex-wrap">
                <input type="email" placeholder="your email" className="p-2 m-2 w-[80%] border-b-2 border-black bg-transparent" value={user} onChange={(e)=>{setuser(e.target.value)}} required/>
                <input type="password" placeholder="your password" className="p-2 m-2 w-[80%] border-b-2 border-black bg-transparent" value={pass} onChange={(e)=>{setpass(e.target.value)}} required/>
                <input type="password" placeholder="confirm password" className="p-2 m-2 w-[80%] border-b-2 border-black bg-transparent" value={correctpass} onChange={(e)=>{setcorrectpass(e.target.value)}} required/>
            </div>    
                {
                    error&&<p className="text-red-700 ml-[10%]">{error}</p>

                }
                <p className="ml-[10%]">Already have an account ? <Link to={"/login"}>Login</Link></p>
                <div className="flex justify-center items-center p-2 m-2 flex-wrap">
                <button onClick={createuser} className="bg-red-800 text-white p-2 rounded-md " >Register</button>


                </div>
                
            </div>
            
        </div>
    </div>)

}
export default Newuser 