import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

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
            const token = localStorage.getItem("token")

            try {
                const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                      mealId: `${recipe.idMeal}`,
                      name: `${recipe.strMeal}`,
                      imageUrl: `${recipe.strMealThumb}`,
                      strArea: `${recipe.strArea}`
                    })
                  });
                  const res = await response.json()
                  console.log(response)
    
            } catch (error) {
                console.log(error)
            }
                   
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
