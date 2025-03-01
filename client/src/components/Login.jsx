import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import auth from "../firebase/config"
import google from "../assets/google.png"

function Login()
{
    const[user,setuser]=useState("")
    const[pass,setpass]=useState("")
    const[error,seterror]=useState("")
    const navigate=useNavigate()


    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
            if(user)
            {
                navigate("/home")

            }
        })
    },[])



    function loggedin()
    {
        signInWithEmailAndPassword(auth,user,pass).then((data)=>{
            navigate("/home")
            console.log(data)
        }).catch(()=>
        {
            seterror("User Not Registered...Please Sign-in")
        })
        seterror("")
    }


    function googlelog()
    {
        const provider = new GoogleAuthProvider
        signInWithPopup(auth,provider).then(()=>{
            console.log("User added via Google Successfully")
            navigate("/home")
            console.log(auth)
        }).catch(()=>{
            console.log("User not added...")
        })


    }
    
    function forgetemail()
    {
        sendPasswordResetEmail(auth,user).then(()=>{
            alert("Reset link have sent successfully")
            console.log("Reset link have sent successfully")
        }).catch((err)=>{
            console.log("Error",err);
            
        })
    }



    return(<div>
        <div className="bg-amber-50 h-screen overflow-hidden">
            <div className="bg-red-800 bg-opacity-5 sm:w-[30%] m-auto mt-[10%] rounded-2xl p-4">
                <h1 className="text-center text-3xl font-serif p-2">Authify</h1>
            <div className="flex flex-col justify-center items-center flex-wrap">
            <input type="email" placeholder="your email" value={user} onChange={(e)=>[setuser(e.target.value)]} className="w-[70%] p-2 m-2 bg-transparent border-b-2 border-black focus:outline-none" />
            <input type="password" placeholder="your password" value={pass} onChange={(error)=>{setpass(error.target.value)}} className="w-[70%] p-2 m-2 bg-transparent border-b-2 border-black focus:outline-none" />
            </div>
            <div className="flex justify-end">
            <button className="text-right mr-[15%] text-blue-600" onClick={forgetemail}>Forget password</button>
            </div>
            
            <p className={` text-s ml-[65px]`}>Don't have an account? <Link to={"/new"}>Register</Link></p>
            {
                error && <p className="ml-[13%] p-2 text-red-700">{error}</p>

            }
            <div className="flex justify-center items-center m-2">
            <button className="w-[70%] bg-blue-500 text-white p-2 rounded text-center text-xl" onClick={loggedin}>Login</button>
            </div>
            <p className="text-center p-2">or</p>
            <div className="bg-[#2A52F5] text-white w-[70%] m-auto rounded-md">
                <div className="flex justify-center items-center">
                <img src={google}/>
                <button className="text-xl p-2" onClick={googlelog}>Sign in with Google</button>
                </div>
                   </div>
             </div>
        
        </div>
    </div>)

}
export default Login