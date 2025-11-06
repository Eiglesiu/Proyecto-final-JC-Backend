import { useState, useEffect } from 'react'
import { Link, Routes } from "react-router"
import download from "../assets/download.jpeg"

const API_URL = "https://690131c7ff8d792314bcca49.mockapi.io/Videojuegos"



function Home() {

    const [videojuegos, setVideojuegos] = useState([])
    const [titulo, setTitulo] = useState("")
    const [genero, setGenero] = useState("")
    const [plataforma, setPlataforma] = useState("")
    const [anoLanzamiento, setAnoLanzamiento] = useState()
    const [desarrollador, setDesarrollador] = useState("")
    const [imagenPortada, setImagenPortada] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [completado, setCompletado] = useState(false)
    const [fechaCreacion, setFechaCreacion] = useState("")
    const [editando, setEditando] = useState(null)

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setVideojuegos(data))
    }, [])




    return (
        <main>
            <div className='Home_Introduce'>
                <h1 className='Home_Title'>Bienvenido a GameTracker</h1>
                <p className='Home_Text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid sit, laudantium animi mollitia cum deserunt eveniet excepturi. Molestias libero repellat iusto, voluptatibus eaque deserunt modi saepe distinctio laborum unde.</p>
            </div>
            <div className='Home_Games'>
                <section className='Home_Section'>
                    <h1 className='Home_Section_Title'>Prueba</h1>
                    <article className='Home_Article'>
                        {videojuegos.map(videojuego => (
                            <div key={videojuego.id} className="Videogame">
                                <div className='Home_Article_Title'>
                                    <h3>Gta VI</h3>
                                    <p>Plataforma</p>
                                </div>
                                <img src={download} alt="Imagen" className='Home_Article_Img' />
                            </div>))}
                    </article>
                </section>

                <section className='Home_Section'>
                    <h1 className='Home_Section_Title'>Terror</h1>
                    <article className='Home_Article'>
                        {videojuegos.map(videojuego => (
                            <div key={videojuego.id} className="videojuego">
                                <h3>{videojuego.titulo}</h3>
                                <p>Plataforma{videojuego.plataforma}</p>
                                <p>Imagen de la portada{videojuego.imagenPortada}</p>
                            </div>))}
                    </article>
                </section>

                <section className='Home_Section'>
                    <h1 className='Home_Section_Title'>Diversion</h1>
                    <article className='Home_Article'>
                        {videojuegos.map(videojuego => (
                            <div key={videojuego.id} className="videojuego">
                                <h3>{videojuego.titulo}</h3>
                                <p>Plataforma{videojuego.plataforma}</p>
                                <p>Imagen de la portada{videojuego.imagenPortada}</p>
                            </div>))}
                    </article>
                </section>
            </div>





        </main>
    )
}

export default Home