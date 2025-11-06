import { useState, useEffect } from "react"
import axios from "axios";

const API_URL = "https://690131c7ff8d792314bcca49.mockapi.io/Videojuegos"

function Crud_videojuegos() {

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

  const agregarVideojuego = () => {
    const nuevoVideojuego = {
        titulo: titulo,
        genero: genero,           // "Acción", "RPG", "Estrategia", etc.
        plataforma: plataforma,       // "PC", "PlayStation", "Xbox", etc.
        anoLanzamiento: anoLanzamiento,
        desarrollador: desarrollador,
        imagenPortada: imagenPortada,    // URL de la imagen
        descripcion: descripcion,
        completado: completado,
        fechaCreacion: fechaCreacion,
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(nuevoVideojuego)
    })
    .then(res => res.json())
    .then(data => {
      setVideojuegos([...videojuegos, data])
      //Limpiar formulario
      setTitulo("")
      setGenero("")
      setPlataforma("")
      setAnoLanzamiento("")
      setDesarrollador("")
      setImagenPortada("")
      setDescripcion("")
      setCompletado(false)
      setFechaCreacion("")
    })
  }
  
  const eliminarVideojuego = (id) => {    //Cambiar a Axios
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      //Quitar de la lista
      setVideojuegos(videojuegos.filter(v => v.id !== id))
    })
  }

  const preparaEdicion = (videojuego) => {
    setEditando(videojuego.id)
    setTitulo(videojuego.titulo)
    setGenero(videojuego.genero)
    setPlataforma(videojuego.plataforma)
    setAnoLanzamiento(videojuego.anoLanzamiento)
    setDesarrollador(videojuego.desarrollador)
    setImagenPortada(videojuego.imagenPortada)
    setDescripcion(videojuego.descripcion)
    setCompletado(videojuego.completado)
    setFechaCreacion(videojuego.fechaCreacion)
  }

  const actualizarVideojuego = () => {
    const videojuegoActualizado = {
        titulo: titulo,
        genero: genero,           // "Acción", "RPG", "Estrategia", etc.
        plataforma: plataforma,       // "PC", "PlayStation", "Xbox", etc.
        anoLanzamiento: anoLanzamiento,
        desarrollador: desarrollador,
        imagenPortada: imagenPortada,    // URL de la imagen
        descripcion: descripcion,
        completado: completado,
        fechaCreacion: fechaCreacion,
    }

    fetch(`${API_URL}/${editando}`, {
      method: "PUT",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(videojuegoActualizado) 
  })

  .then(res => res.json())
  .then(data => {
    
    //Actualizar lista de videojuegos
    setVideojuegos(videojuegos.map(v => v.id === editando ? data : v))

    //Limpiar datos
    setEditando(null)
    setTitulo("")
    setGenero("")
    setPlataforma("")
    setAnoLanzamiento("")
    setDesarrollador("")
    setImagenPortada("")
    setDescripcion("")
    setCompletado(false)
    setFechaCreacion("")
  })}


  return (
    <div className="app">
      <h1>CRUD de videojuegos</h1>

       {/* Formulario para crear */}
      <div className="formulario">
        <h2>Crear Videojuego</h2>
        <input
          type="text"
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <input
          type="text"
          placeholder="Plataforma"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
        />
        <input
          type="text"
          placeholder="Año de Lanzamiento"
          value={anoLanzamiento}
          onChange={(e) => setAnoLanzamiento(e.target.value)}
        />
        <input
          type="text"
          placeholder="Desarrollador"
          value={desarrollador}
          onChange={(e) => setDesarrollador(e.target.value)}
        />
        <input
          type="text"
          placeholder="Imagen de la portada"
          value={imagenPortada}
          onChange={(e) => setImagenPortada(e.target.value)}
        />
        <input
          type="text"
          placeholder="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Completado"
          value={completado}
          onChange={(e) => setCompletado(e.target.value)}
        />
              <input
          type="text"
          placeholder="fecha de creacion"
          value={fechaCreacion}
          onChange={(e) => setFechaCreacion(e.target.value)}
        />
        {editando ? 
        (<button onClick={actualizarVideojuego}>Actualizar</button>) 
        : 
        (<button onClick={agregarVideojuego}>Crear</button>)}

        {editando && (
          <button onClick={() => {
            setEditando(null)
            setTitulo("")
            setGenero("")
            setPlataforma("")
            setAnoLanzamiento("")
            setDesarrollador("")
            setImagenPortada("")
            setDescripcion("")
            setCompletado(false)
            setFechaCreacion("")
          }}>Cancelar</button>
        )}
      </div>

      <div className="Lista">
        <h2>Lista de videojuegos</h2>
        {videojuegos.map(videojuego => (
          <div key={videojuego.id} className="videojuego">
            <h3>{videojuego.titulo}</h3>
            <p>Genero: ${videojuego.genero}</p>
            <p>Plataforma: ${videojuego.plataforma}</p>
            <p>Año de Lanzamiento: ${videojuego.anoLanzamiento}</p>
            <p>Desarrollador: ${videojuego.desarrollador}</p>
            <p>Imagen de la portada: ${videojuego.imagenPortada}</p>
            <p>Descripcion: ${videojuego.descripcion}</p>
            <p>Completado: ${videojuego.completado}</p>
            <p>Fecha de creacion: ${videojuego.fechaCreacion}</p>
            <button onClick={() => preparaEdicion(videojuego)}>Editar</button>
            <button onClick={() => eliminarVideojuego(videojuego.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  )}


export default Crud_videojuegos
