import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AddFavoriteCall from "./AddFavoriteCall"

export default function Recipes ({}){
    const [recipes, setRecipes] = useState([])
    const [selectRecipe, setSelectedRecipe] = useState([])

    useEffect(()=>{
        async function getRecipes (){
            try {
                const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes")
                const res = await response.json()
                setRecipes(res)

            } catch (error) {
                console.log(error)
            }
        }
        getRecipes()
    },[])

    const navigate = useNavigate()

    function handleClick(recipe){
        setSelectedRecipe(recipe.idMeal)
        navigate(`/recipes/${recipe.idMeal}`)
    }

 async function addFavorite(recipe){
    const response = await AddFavoriteCall(recipe)
    console.log(response)
                   
    }
    

    const token = localStorage.getItem("token")


    if (!token) {
        return (
            <div className="container">
            {
                recipes.map((recipe)=>
                    <div className="recipeCard" key={recipe.idMeal}>
                        <h2><strong>{recipe.strMeal}</strong></h2>
                        <img src = {recipe.strMealThumb} style = {{height: "200px"}} />
                        <br/>
                        <button onClick={()=>handleClick(recipe)}>View Details</button>
                        <br/>
                    </div>
                )
            }

        </div>
        )
    }

    return (
        
        <div className="container">
            {
                recipes.map((recipe)=>
                    <div className="recipeCard" key={recipe.idMeal}>
                        <h2><strong>{recipe.strMeal}</strong></h2>
                        <img src = {recipe.strMealThumb} style = {{height: "200px"}} />
                        <br/>
                        <button onClick={()=>handleClick(recipe)}>View Details</button>
                        <br/>
                        <br/>
                        <button onClick={()=>addFavorite(recipe)}>Add to Favorites</button>
                    </div>
                )
            }

        </div>


    )
}
