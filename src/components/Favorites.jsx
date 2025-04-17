import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"


export default function Favorites ({}){
    const [favorites, setFavorites] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const token = localStorage.getItem("token")

    async function getFavorites(){
        try {
            const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            const res = await response.json()
            console.log(res.data)
            setFavorites(res.data)
    
        } catch (error) {
            console.log(error)
        }
        }    

    useEffect (()=>{

        getFavorites()

    },[])

    async function removeFavorite(recipe){
        const token = localStorage.getItem("token")

        try {
            const response = await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${recipe.id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              const res = await response.json()
              if (response.ok) {
              await getFavorites()}

        } catch (error) {
            console.log(error)
        }
         
}

const navigate = useNavigate()

function handleClick(recipe){
    setSelectedRecipe(recipe.idMeal)
    navigate(`/recipes/${recipe.idMeal}`)
}


    if (!token) {
        return (
            <p>Need to sign up or log in for access to favorites</p>
        )
    }

    return (
        <div className="container">
            {
                favorites.map((recipe)=>
                    <div className="recipeCard" key={recipe.idMeal}>
                        <h2><strong>{recipe.strMeal}</strong></h2>
                        <img src = {recipe.strMealThumb} style = {{height: "200px"}} />
                        <br/>
                        <button onClick={()=>handleClick(recipe)}>View Details</button>
                        <br/>
                        <br/>
                        <button onClick={()=>removeFavorite(recipe)}>Remove from Favorites</button>
                    </div>
                )
            }

        </div>


    )
}
