import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    hora: {
        type: String
    }
})

export default mongoose.model("Tareas", tareaSchema);


// // 1. Videojuegos (Games) //
// const mongoose = require('mongoose');

// const tareaSchema = mongoose.Schema({
//   _id: ObjectId,
//   titulo: String,
//   genero: String,           // "Acción", "RPG", "Estrategia", etc.
//   plataforma: String,       // "PC", "PlayStation", "Xbox", etc.
//   añoLanzamiento: Number,
//   desarrollador: String,
//   imagenPortada: String,    // URL de la imagen
//   descripcion: String,
//   completado: Boolean,
//   fechaCreacion: Date
// })

// module.exports = mongoose.model('juego', juegoSchema);

