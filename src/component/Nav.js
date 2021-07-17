import react,{component,useState} from 'react';
import {Link ,NavLink} from 'react-router-dom'
import "./comp.css"


function Nav(){
    return(
        <div className="navebar">
            <div className="continet">
            <ul className="ul">
                <Link className="a" to="/categ">التصنيفات</Link>
                <Link className="a" to="/post">المنشورات</Link>
            </ul>  
            </div>

        </div>
    )
}

export default Nav;