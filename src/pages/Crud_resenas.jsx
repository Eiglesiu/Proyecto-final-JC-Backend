import { useState, useEffect } from "react"
import axios from "axios";

const API_URL = "https://690131c7ff8d792314bcca49.mockapi.io/Resenas"

function Crud_resenas() {
  const [resenas, setResenas] = useState([])
  const [juegoId, setJuegoId] = useState("")
  const [puntuacion, setPuntuacion] = useState("")
  const [textoResena, setTextoResena] = useState("")
  const [horasJugadas, setHorasJugadas] = useState("")
  const [dificultad, setDificultad] = useState("")
  const [recomendaria, setRecomendaria] = useState("")
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setResenas(data))
  }, [])

const agregarResena = () => {
  const nuevaResena = {
    _id: ObjectId,
    juegoId: ObjectId,        // Referencia al videojuego
    puntuacion: Number,       // 1-5 estrellas
    textoReseña: String,
    horasJugadas: Number,
    dificultad: String,       // "Fácil", "Normal", "Difícil"
    recomendaria: Boolean,
    fechaCreacion: Date,
    fechaActualizacion: Date
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaResena)
  })
    .then(res => res.json())
    .then(data => {
      setResenas([...resenas, data])
      //Limpiar formulario
      setJuegoId("")
      setPuntuacion("")
      setTextoResena("")
      setHorasJugadas("")
      setDificultad("")
      setRecomendaria("")
    })
}

const eliminarResena = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
    setResenas(resenas.filter(v => v.id !== id)) //Quitar de la lista
  } catch (error) {
    console.log("Error eliminando la reseña", error)
  }
}

const preparaEdicion = (resena) => {
  setEditando(resena.id)
  setJuegoId(resena.juegoId)
  setPuntuacion(resena.puntuacion)
  setTextoResena(resena.textoResena)
  setHorasJugadas(resena.horasJugadas)
  setDificultad(resena.dificultad)
  setRecomendaria(resena.recomendaria)
}

const actualizarResena = () => {
  const resenaActualizada = {
    _id: ObjectId,
    juegoId: ObjectId,        // Referencia al videojuego
    puntuacion: Number,       // 1-5 estrellas
    textoResena: String,
    horasJugadas: Number,
    dificultad: String,       // "Fácil", "Normal", "Difícil"
    recomendaria: Boolean,
    fechaCreacion: Date,
    fechaActualizacion: Date
  }

  fetch(`${API_URL}/${editando}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resenaActualizada)
  })

    .then(res => res.json())
    .then(data => {

      //Actualizar lista de reseñas
      setResenas(resenas.map(v => v.id === editando ? data : v))
      //Limpiar datos
      setJuegoId("")
      setPuntuacion("")
      setTextoResena("")
      setHorasJugadas("")
      setDificultad("")
      setRecomendaria("")
    })
}

return (
  <div className="app">
    <h1>CRUD de Reseñas</h1>
    {/* Formulario para crear */}
    <div className="formulario">
      <h2>Crear Reseña</h2>
      <input
        type="text"
        placeholder="Nombre del juego"
        value={juegoId}
        onChange={(e) => setJuegoId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Puntuacion"
        value={puntuacion}
        onChange={(e) => setPuntuacion(e.target.value)}
      />

      <input
        type="text"
        placeholder="Texto de reseña"
        value={textoResena}
        onChange={(e) => setTextoResena(e.target.value)}
      /> 

      <input
        type="number"
        placeholder="Horas Jugadas"
        value={horasJugadas}
        onChange={(e) => setHorasJugadas(e.target.value)}
      />

      <input
        type="number"
        placeholder="Dificultad"
        value={dificultad}
        onChange={(e) => setDificultad(e.target.value)}
      />

      <input
        type="text"
        placeholder="Lo recomendarias?"
        value={recomendaria}
        onChange={(e) => setRecomendaria(e.target.value)}
      />

      {editando ?
        (<button onClick={actualizarResena}>Actualizar</button>)
        :
        (<button onClick={agregarResena}>Crear</button>)}

      {editando && (
        <button onClick={() => {
          setJuegoId("")
          setPuntuacion("")
          setTextoResena("")
          setHorasJugadas("")
          setDificultad("")
          setRecomendaria("")
        }}>Cancelar</button>
      )}
    </div>

    <div className="Lista">
      <h2>Lista de reseñas</h2>
      {resenas.map(resena => (
        <div key={resena.id} className="resena">
          <h3>{resena.JuegoId}</h3>
          <p>puntuacion: ${resena.puntuacion}</p>
          <p>Reseña: ${resena.textoResena}</p>
          <p>Horas Jugadas: ${resena.horasJugadas}</p>
          <p>Dificultad: ${resena.dificultad}</p>
          <p>Lo recomendarias?: ${resena.recomendaria}</p>
          <button onClick={() => preparaEdicion(resena)}>Editar</button>
          <button onClick={() => eliminarResena(resena.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  </div>
)}

export default Crud_resenas