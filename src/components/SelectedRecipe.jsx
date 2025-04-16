import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

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