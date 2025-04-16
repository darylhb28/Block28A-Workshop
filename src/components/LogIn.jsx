import { Routes, Route, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import SignUp from "./SignUp"
import Auth from "./Auth"

export default function LogIn ({}){
    const [username, setUsername] = useState(null)
    const token = localStorage.getItem("token")

    useEffect(()=>{
        async function getUsername(){
        try {
            const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/me", {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              const res = await response.json()
              console.log(res)
              setUsername(res.username)

        } catch (error) {
            console.log(error)
        }
        }
        if (token) {
            getUsername()
          }
    },[token])


    if (!token) {
        return (
            <div>
              <h1>Sign Up to be a User</h1>
              <SignUp />
              <br />
              <h1>Already a user? Sign in here</h1>
              <Auth />
            </div>
          )
    }
    

    return (
      <div>
        <p>Logged in as {username}</p>
      </div>
    )
}

