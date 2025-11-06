import { useState } from 'react'
import { Link, Routes } from "react-router"

function Header() {


  return (
    <>
      <header>
        <h1 className='Header_Title'>GameTracker</h1>
        <div className='Header_Search'>
          <input type="text" name="" id="" placeholder="Buscar..." className='Header_SearchBar'></input>
          <Link to="/search"><button className='Header_Button'>Buscar</button></Link>
        </div>
        <nav className='Header_Nav'>
          <ul className='Header_UlNav'>
            <li className='Header_Link'><Link to="/" className='Link'>Menu Principal</Link></li>
            <li className='Header_Link'><Link to="/addJuego" className='Link'>Añadir un juego</Link></li>
            <li className='Header_Link'><Link to="/addResena" className='Link'>Añadir una Reseña</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header