import { useState, useEffect } from "react"

export default function CreateRecipe({}){

    const token = localStorage.getItem("token")

    const [recipeName, setRecipeName] = useState("")
    const [category, setCategory] = useState("")
    const [area, setArea] = useState("")
    const [instructions, setInstructions] = useState("")
    const [image, setImage] = useState("")
    const [tags, setTags] = useState("")
    const [youtube, setYoutube] = useState("")
    const [ingredients, setIngredients] = useState("")

    const [successMessage, setSuccessMessage] = useState("")

async function handleSubmit(event){
    event.preventDefault();

    try {
        const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes/user-recipes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              strMeal: recipeName,
              strCategory: category,
              strArea: area,
              strInstructions: instructions,
              strMealThumb: image,
              strTags: tags,
              strYoutube: youtube,
              ingredients: ingredients,
            })
          });

          const res = await response.json()
          console.log(res)
          if (response.ok) setSuccessMessage("Recipe Succesfully Uploaded!")

    } catch (error) {
        console.log(error)
    }

}

    if (!token) {
        return (
            <p>Need to sign up or log in to add your own recipes</p>
        )
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Recipe Name
                <input 
                name="recipe name" 
                onChange={(event) => setRecipeName(event.target.value)}
                value = {recipeName}
                />
            </label>
            <br />
            <label>
                Recipe Category
                <input 
                name="category" 
                onChange={(event) => setCategory(event.target.value)}
                value = {category}
                />
            </label>
            <br />
            <label>
                Type of Cuisine
                <input 
                name="cuisine" 
                onChange={(event) => setArea(event.target.value)}
                value = {area}
                />
            </label>
            <br />
            <label>
                Intructions (seperate each instruction by comma)
                <input 
                name="instructions" 
                onChange={(event) => setInstructions(event.target.value)}
                value = {instructions}
                />
            </label>
            <br/>
            <label>
                Image URL
                <input 
                name="image" 
                onChange={(event) => setImage(event.target.value)}
                value = {image}
                />
            </label>
            <br />
            <label>
                Recipe Tags
                <input 
                name="recipe tags" 
                onChange={(event) => setTags(event.target.value)}
                value = {tags}
                />
            </label>
            <br/>
            <label>
                Youtube Link
                <input 
                name="youtube" 
                onChange={(event) => setYoutube(event.target.value)}
                value = {youtube}
                />
            </label>
            <br />
            <label>
                Ingredients (seperate each ingredient by comma)
                <input 
                name="ingredients" 
                onChange={(event) => setIngredients(event.target.value)}
                value = {ingredients}
                />
            </label>
            <br />
            <button >Upload Recipe</button>
        </form>
        {
            successMessage && <p>{successMessage}</p>
        }
    </>
    )
}