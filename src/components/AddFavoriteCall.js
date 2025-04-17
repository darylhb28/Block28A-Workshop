


export default async function AddFavoriteCall (recipe){
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
              console.log(res)
              return res

        } catch (error) {
            console.log(error)
        }       
}
