import Navlink from "./navlink";
import { BiMenu } from "react-icons/bi";
import {MdClose} from "react-icons/md";
import  { useState, component, useEffect,useCallback } from 'react';
import "./comp.css"



function Humburker() {
    const [open,setopen]=useState(false);
    const humbrker=<BiMenu className="humburker" 
    onClick={()=>setopen(!open)}
    />
    const closehumbrker=<MdClose className="humburker" 
    onClick={()=>setopen(!open)}
    />

    return (
        <nav className="mobile">
            {open? closehumbrker:humbrker}
            {open&&<Navlink />}
        </nav>
    )
}

export default Humburker;