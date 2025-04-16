import { useState } from "react"

export default function SignUp({}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

   async function handleSubmit(event){
        event.preventDefault();
        try{ 
            const response = await fetch ("https://fsa-recipe.up.railway.app/api/auth/register",
            { 
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify (
                    {
                        username: username, 
                        password: password
                    })
            } )
            const result = await response.json()
            console.log(result)
            localStorage.setItem("token", result.token)
            setSuccessMessage("Account Created!")



        } catch(error) {
            console.log(error)
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}> 
            <label>
                Create a Username 
                <input 
                name="username" 
                onChange={(event)=> setUsername(event.target.value)} 
                value = {username}
                />
            </label>
            <br/>
            <label>
                Create a Password 
                <input name="Password" 
                onChange={(event) => setPassword(event.target.value)}
                value = {password}
                />
            </label>
            {
                (password && password.length <= 6) && 
                <p><strong>Password must be longer than 6 characters.</strong></p>
            }
            <br/>
            <button>Sign Up!</button>
        </form>
        {
            successMessage && <p>{successMessage}</p>
        }
        </>
    )
}