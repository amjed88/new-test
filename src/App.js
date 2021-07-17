import logo from './logo.svg';
import react,{component,useState} from 'react';
import './App.css';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Categ from './component/categ';
import Post from './component/postes';
import Nav from './component/Nav'




function App() {

  return (
      <BrowserRouter>
        <div >
          <Nav />
          <Route path="/categ" component={Categ}></Route>
          <Route path="/post" component={Post}></Route>
        </div>
      </BrowserRouter>


  );

}

export default App;
