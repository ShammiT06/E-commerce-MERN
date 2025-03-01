import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Newuser from "./components/New";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import Men from "./components/Men";
import Female from "./components/Female";
import Kids from "./components/Kids";
import Card from "./components/Card";
import { createContext, useState } from "react";


const Cardcontext=createContext()

function App()
{
  const [cardarr,setcardarr]=useState([])
 
  


  return(<div>
    <BrowserRouter>
    <Cardcontext.Provider value={{cardarr,setcardarr}}> 
    <Routes>
      <Route path="/" element={<Navbar/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/log" element={<Login/>}></Route>
      <Route path="/new" element={<Newuser/>}></Route>
      <Route path="/men" element={<Men/>}></Route>
      <Route path="/card" element={<Card/>}></Route>
      <Route path="/female" element={<Female/>}></Route>
      <Route path="/kids" element={<Kids/>}></Route>
     
    </Routes>
    </Cardcontext.Provider> 
    </BrowserRouter>

  </div>)

}
export default App
export {Cardcontext}