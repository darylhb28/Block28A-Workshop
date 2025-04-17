import { Routes, Route, Link } from "react-router-dom"

export default function NavBar ({}){

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/recipes"> Recipes </Link>
            <Link to="/login"> Log In </Link>
            <Link to ="/favorites"> My Favorites </Link>
            <Link to = "/random">Recipe of the Day</Link>
        </div>


    )

}