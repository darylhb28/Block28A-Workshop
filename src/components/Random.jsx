import { useState, useEffect } from "react"
import AddFavoriteCall from "./AddFavoriteCall"
    

export default function Random ({}){
    const [recipe, setRecipe] = useState(null)


useEffect(()=>{
    async function getRandom(){
        try {
            const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes/random") 
            const res = await response.json()
            setRecipe (res)

        }catch (error){
            console.log(error)
        } 
    }
    getRandom()
},[])

 async function addFavorite(recipe){
    const response = await AddFavoriteCall(recipe)
    console.log(response)
                   
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