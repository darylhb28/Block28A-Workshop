import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AddFavoriteCall from "./AddFavoriteCall"

export default function SelectedRecipe({}){
    const [recipe, setRecipe] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        async function fetchSelectedRecipe (){
            try { 
                const response = await fetch(`https://fsa-recipe.up.railway.app/api/recipes/${id}`)
                const res = await response.json()
                console.log(res)
                setRecipe(res)

            } catch (error) {
                console.log(error)
            }
        }
        fetchSelectedRecipe()
    },[])
    

 async function addFavorite(recipe){
    const response = await AddFavoriteCall(recipe)
    console.log(response)
                   
    }
    
    const token = localStorage.getItem("token")


    if (!token) {
        return(
            <>
            {
        recipe && (
            <div id="singleRecipe" key={recipe.idMeal}>
                <h2><strong>{recipe.strMeal}</strong></h2>
                <img src = {recipe.strMealThumb} style = {{height: "200px"}} />
                <br/>
                <br />
                <p><strong>Ingredients:</strong></p>
                    {
                        recipe.ingredients.map((ingredient)=>
                            <ul key={ingredient}>
                                <li>{ingredient}</li>
                            </ul> 
                    )}
                <br />
                <p>{recipe.strInstructions} </p>
            </div> )


    }
    </>
        )
    }




    return(
        <>
                {
            recipe && (
                <div id="singleRecipe" key={recipe.idMeal}>
                    <h2><strong>{recipe.strMeal}</strong></h2>
                    <img src = {recipe.strMealThumb} style = {{height: "200px"}} />
                    <br/>
                    <button onClick={()=>addFavorite(recipe)}>Add to Favorites</button>
                    <br />
                    <br />
                    <p><strong>Ingredients:</strong></p>
                        {
                            recipe.ingredients.map((ingredient)=>
                                <ul key={ingredient}>
                                    <li>{ingredient}</li>
                                </ul> 
                        )}
                    <br />
                    <p>{recipe.strInstructions} </p>
                </div> )


        }
        </>


    )
}