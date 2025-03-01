import facebook from "../assets/face.png"
import whats from "../assets/whats.png"
import insta from "../assets/instagram.png"
import { Link} from "react-router-dom"

function Footer()
{
    return(
        <div className=" bg-zinc-500 bg-opacity-25 p-5 mt-5 md:w-screen sm:w-[50%] text-black">
            <div className="flex justify-around">
            <div className="p-2">
                <h1 className="text-2xl font-bold">About Our Store</h1>
                <p>About</p>
                <p>Press & Media</p>
                <p>Career</p>
                <p>Trust & Safety</p>
                <p>Contact Us</p>
                <p>Accessibility Statement</p>
            </div>
            <div className="p-2">
                <h1 className="text-2xl font-bold">Explore & Engage</h1>
                <p>Write a Review</p>
                <p>Add a Product</p>
                <p>Join our Community</p>
                <p>Sustainability and Green Initatives</p>
                <p>Shopping Guides</p>
                <p>Customer Choice Awards</p>
            </div>
            <div>
                <h1 className="text-2xl font-bold"> Help & Resources</h1>
                <p>FAQ and Help Center</p>
                <p>Return and Refund Policy</p>
                <p>Shipping and Delivery Info</p>
                <p>Payment & Security</p>
                <p>Terms and Condition</p>
                <p>Privacy Policy</p>
            </div>
          
            </div>
            <div className="mt-14">
                <div className="flex justify-around space-x-9 items-center">
                <p className="text-5xl font-serif font-thin">Luxemart</p>
                <div className="flex space-x-4">
                <Link to={"https://web.whatsapp.com/"}><img src={whats} className="w-[30px] h-[30px]"></img></Link>
                <Link to={"https://www.facebook.com/"}><img src={facebook} className="w-[30px] h-[30px]"></img></Link>
                <Link to={"https://www.instagram.com/"}><img src={insta} className="w-[30px] h-[30px]"></img></Link>
                </div>
            </div>
            <h1 className="text-center text-xs mt-8">&copy;2025 All Rights Reserved</h1>
            </div>
         </div> )

}
export default Footer