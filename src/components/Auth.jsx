import { useState } from "react"

export default function Auth({}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    async function handleSubmit(event){
        event.preventDefault()

        try{
            const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: username,
                  password: password
                })
              });
                const result = await response.json()
                console.log(result)
                localStorage.setItem("token", result.token)
                setSuccessMessage("User Authenticated!")
                
        } catch (error){
            console.log(error)
        }

    }


    return(
        <>
        <form onSubmit={handleSubmit}> 
            <label>
                Username 
                <input 
                name="username" 
                onChange={(event)=> setUsername(event.target.value)} 
                value = {username}
                />
            </label>
            <br/>
            <label>
                Password 
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
            <button>Log In</button>
        </form>
        {
            successMessage && <p>{successMessage}</p>
        }
        </>
        
    )
}