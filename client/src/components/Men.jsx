import { useContext, useEffect, useState } from "react"
import cart from "../assets/cart_icon.png"
import axios from "axios"
import Footer from "./Footer"
import { Link, useNavigate } from "react-router-dom"
import auth from "../firebase/config"
import { signOut } from "firebase/auth"
import { Cardcontext } from "../App"

function Men() {
  const [collection, setCollection] = useState([])
  const [log, setlog] = useState(false)
  const [open,setopen]=useState(false)
  const navigate=useNavigate()

  const {cardarr,setcardarr} =useContext(Cardcontext)
  console.log(cardarr)


  const [newItem, setNewItem] = useState({ img: "", description: "", price: "", discount: "", size: "" });
  const [admin,setadmin]=useState(false)




  useEffect(() => {
    axios.post("https://e-commerce-mern-rutg.onrender.com/showarr").then((data) => {
      console.log(data.data)
      setCollection(data.data)

    })
  }, [])
  useEffect(()=>{
    auth.onAuthStateChanged(function(user){
        if(user)
        {
          if(user.uid==="GewR9zQ2fnM6DTuDLy1Fvep9N1r1")
          {
            setadmin(true)
            console.log("He is an Admin")
          }

            console.log("User Logged In")
            setlog(true)
        }
        else
        {
            console.log("User not Logged in")
        }
    })

},[])

const addToCart = (item) => {
  setcardarr((prev) => [...prev, item]); 
  // console.log("Cart after add:", cardarr);
};


function Logout()
{
  signOut(auth)
  navigate("/")
}






  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return
    }
    if (file) {
      setNewItem({ ...newItem, img: URL.createObjectURL(file) });
    }

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "dress_images")

    const res = await fetch("https://api.cloudinary.com/v1_1/dl0qctpk2/image/upload", {
      method: "POST",
      body: data
    })

    const responseurl = await res.json()
    console.log(responseurl.url)


    setNewItem((prev) => ({ ...prev, img: responseurl.url }));
    console.log(newItem)

  };

  const handleSubmit = () => {


    if (!newItem.img || !newItem.description || !newItem.price || !newItem.discount || !newItem.size) {
      alert("Error Please Fill the Necessary Details")
      return
    }



    
    

    setCollection([...collection, newItem])

    axios.post("https://e-commerce-mern-rutg.onrender.com/addnew", { "newItem": newItem }).then(() => {
      console.log("Data Successfully sent to Data")
    }).catch(() => {
      console.log("Issue")
    })





    setNewItem({ img: "", description: "", price: "", discount: "", size: "" })
    console.log(newItem)
    


    




  }

  return (<div>
    <div className="bg-slate-300 p-5 fixed top-0 left-0 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-mono">Luxemart</h1>
        <div className="space-x-10 items-center hidden md:flex">
          <Link to={"/home"}> <p className="text-2xl font-bold">Home</p></Link>
          <Link to={"/men"}><p className="text-2xl font-bold">Men</p></Link>
          <Link to={"/female"}><p className="text-2xl font-bold">Female</p></Link>
          <Link to={"/kids"}><p className="text-2xl font-bold">Kids</p></Link>
        </div>
        <div className="items-center space-x-10 hidden md:flex">
          <Link to={"/card"}><img src={cart} alt="no_img" /></Link>

          {
            log ? <button className="bg-[#2a52f5] p-2 text-white rounded-md" onClick={Logout}>Log Out</button> : <button className="bg-[#2a5f] p-2 text-white rounded-md"><Link to={"/log"}>Login</Link></button>
          }

        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}} onClick={()=>{setopen(true)}} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 md:hidden">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>

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
    {/* Collection Display */}
    <div className="mt-[100px]">
      <h1 className="font-bold text-3xl text-center mt-6">Gents' Hub</h1>

      {/* ✅ Grid with 4 Columns Per Row */}
      <div className="grid grid-cols-2 mt-10  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-5 ">
        {collection.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg text-center">
            {/* ✅ Fix: Image width & height correctly set */}
            <img
              src={item.image}
              alt="Item"
              className="w-full h-[250px] object-contain rounded-md"
            />
            <p className="font-serif text-xl mt-2">{item.description}</p>

            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="font-mono text-lg font-bold text-green-600">₹{item.price}</p>
              <p className="line-through text-lg font-mono text-gray-500">₹{item.discount}</p>
            </div>

            <p className="text-sm text-gray-700">Size: {item.size}</p>
            <p className="text-xs text-gray-400">Luxemart Approved</p>

            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" onClick={()=>{addToCart(item)}}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    {
      admin?<div >
      <h1 className="text-3xl font-bold font-mono text-center mt-[20px] m-auto ml-[15%] p-3 w-[80%] bg-red-400">Upload New Item</h1>
      <div className="flex flex-col w-[70%] items-center justify-center m-auto ml-[15%]  mt-[20px] p-5">
        <input type="file" onChange={handleImageUpload} className="border-4 border-dashed border-black p-[20px] w-[70%]" />
        {newItem.img && <img src={newItem.img} alt="Preview" width="200" />}
        <input type="text" name="description" value={newItem.description} onChange={handleChange} placeholder="Description" className="border-2 mt-4 p-2 w-[70%] border-black" />
        <input type="number" name="price" value={newItem.price} onChange={handleChange} placeholder="Offer Price" className="border-2 mt-4 p-2 w-[70%] border-black" />
        <input type="number" name="discount" value={newItem.discount} onChange={handleChange} placeholder="Actual Price" className="border-2 mt-4 p-2 w-[70%] border-black" />
        <input type="text" name="size" value={newItem.size} onChange={handleChange} placeholder="Size Available" className="border-2 mt-4 p-2 w-[70%] border-black" />
        <button onClick={handleSubmit} className="p-2 w-[50%] mt-4 bg-blue-100 font-mono text-2xl" style={{ "box-shadow": 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px' }}>Add to Collection Page</button>

      </div>
      <Footer></Footer>
    </div>:""
    }
 <Footer/>
  </div>)
}

export default Men