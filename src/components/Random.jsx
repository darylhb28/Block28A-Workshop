import { useState, useEffect } from "react"
    

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