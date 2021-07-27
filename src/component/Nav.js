import react,{component,useState} from 'react';
import {Link ,NavLink} from 'react-router-dom'
import "./comp.css"
import Humburker from './Humburker';
import Navication from './Navication';


function Nav(){
    return(
        <div className="navebar">
                < Humburker />
                <Navication />


        </div>
    )
}

export default Nav;