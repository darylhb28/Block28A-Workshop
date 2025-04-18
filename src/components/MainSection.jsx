import { Routes, Route, Link } from "react-router-dom"
import Recipes from "./Recipes"
import Favorites from "./Favorites"
import LogIn from "./LogIn"
import SelectedRecipe from "./SelectedRecipe"
import Home from "./Home"
import Random from "./Random"
import CreateRecipe from "./CreateRecipe"


export default function MainSection ({}){
    return (
        <div id="mainSection">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path = "/recipes" element={<Recipes/>} />
                <Route path = "/favorites" element={<Favorites/>} />
                <Route path = "/login" element={<LogIn/>} />
                <Route path = "/recipes/:id" element={<SelectedRecipe/>}/>
                <Route path = "/random" element={<Random/>}/>
                <Route path="/myrecipes" element={<CreateRecipe />}/>
            </Routes>
        </div>


    )

}