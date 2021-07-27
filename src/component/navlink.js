import react,{component,useState} from 'react';
import {Link ,NavLink} from 'react-router-dom'
import "./comp.css"


function navlink(){
    return(
            <ul className="ul">
                <Link className="a" to="/categ">التصنيفات</Link>
                <Link className="a" to="/post">المنشورات</Link>
            </ul>  

    )
}

export default navlink;