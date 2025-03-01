import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase/config";
import cart from "../assets/cart_icon.png";
import { Cardcontext } from "../App";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Fixed Import

function Card() {
    const [totalPrice, setTotalPrice] = useState(0);
    const { cardarr, setcardarr } = useContext(Cardcontext); 
    const [showQR, setShowQR] = useState(false);
    const [open,setopen]=useState(false)
    
    // UPI Payment Link (Dynamically Uses totalPrice)
    const upiID = "Luxemart Private Limited@okhdfcbank";
    const upiURL = `upi://pay?pa=${upiID}&pn=Luxemart&mc=0000&tid=123456&tr=987654321&tn=Order Payment&am=${totalPrice}&cu=INR`;

    console.log("Cart Items:", cardarr);

    function Logout() {
        signOut(auth);
    }

    const removeFromCart = (index) => {
        setcardarr((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(()=>{
       auth.onAuthStateChanged(function(user){
            if(user)
            {
                setlog(true)
            }
        })
    })

    useEffect(() => {
        const total = cardarr.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }, [cardarr]);

    useEffect(() => {
        console.log("Cart Updated:", cardarr);
    }, [cardarr]);

    const [log, setlog] = useState(false);

    return (
        <div>
            {/* Navbar */}
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
                        <img src={cart} alt="Cart Icon" />
                        { log 
                            ? <button className="bg-[#2a52f5] p-2 text-white rounded-md" onClick={Logout}>Log Out</button> 
                            : <button className="bg-[#2a5f] p-2 text-white rounded-md"><Link to={"/log"}>Login</Link></button>
                        }
                    </div>
                    <svg onClick={()=>{setopen(true)}} style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
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

            {/* Cart Section */}
            <div className="flex flex-col mt-40">
                {cardarr.length === 0 ? (
                    <p className="text-center mt-[5%] text-6xl text-red-500">Your cart is empty.</p>
                ) : (
                    <div className="mt-[10%]">
                        {cardarr.map((item, index) => (
                            <div key={index} className="m-5 p-5 bg-gray-100 rounded-md shadow-md flex items-center justify-around">
                                <img src={item.image} alt="Product" className="w-40 h-40 object-contain" />
                                <p className="text-lg">{item.description}</p>
                                <p className="text-green-600 font-bold">₹{item.price}</p>
                                <p className="line-through text-gray-500">₹{item.discount}</p>
                                <button onClick={() => removeFromCart(index)} className="text-red-500 font-bold text-xl">X</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            

            {/* Cart Total */}
            <div className="m-5 p-10 w-[60%]">
                <h1 className="text-3xl font-serif p-2">Cart Total</h1>
                <div className="flex items-center justify-between border-b-4 border-gray-400 p-2">
                    <p className="text-2xl font-bold font-serif">Subtotal:</p> 
                    <p className="text-2xl font-bold font-serif">₹{totalPrice}</p>
                </div>
                <div className="flex items-center justify-between border-b-4 border-gray-400 p-2">
                    <p className="text-2xl font-bold font-serif">Shipping Amount:</p> 
                    <p className="text-2xl font-bold font-serif">Free</p>
                </div>
                <div className="flex items-center justify-between p-2">
                    <p className="text-2xl font-bold font-serif">Grand Total:</p>
                    <p className="text-2xl font-bold font-serif">₹{totalPrice}</p>
                </div>

                {/* Proceed to Pay Button */}
                <button 
                    className="w-[70%] bg-blue-800 text-white p-3 m-20 text-2"
                    onClick={() => setShowQR(true)}
                    disabled={totalPrice === 0} // Prevents opening QR if cart is empty
                >
                    Proceed to Pay
                </button>

                {/* QR Code Display */}
                {showQR && totalPrice > 0 ? 
                    <div className="mt-5 flex flex-col items-center">
                        <h2 className="text-2xl font-bold">Scan to Pay</h2>
                        <QRCodeCanvas value={upiURL} size={200} />
                        <p className="text-lg text-gray-600 mt-3">UPI ID: {upiID}</p>
                        <p>Total Amount to Pay:{totalPrice}</p>
                    </div>:""
                }
            </div>
        </div>
    );
}

export default Card;
