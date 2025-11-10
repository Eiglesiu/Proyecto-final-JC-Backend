const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")

const app = express();
const PORT = 3000;

// Conexión a MongoDB
const MONGODB_URI = 'mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/daniel_mendez';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

app.use(express.json());
app.use(cors())

// ============================================
// ESQUEMAS DE MONGOOSE
// ============================================
// Estructura de un videojuego
// 
//   _id: ObjectId,            //Lo trae el mismo MongoDB
//   titulo: String,
//   genero: String,           // "Acción", "RPG", "Estrategia", etc.
//   plataforma: String,       // "PC", "PlayStation", "Xbox", etc.
//   añoLanzamiento: Number,
//   desarrollador: String,
//   imagenPortada: String,    // URL de la imagen
//   descripcion: String,
//   completado: Boolean,
//   fechaCreacion: Date
//  -------------------------------------------
// Estructura de una reseña
//  -------------------------------------------
//   _id: ObjectId,
//   juegoId: ObjectId,        // Referencia al videojuego
//   puntuacion: Number,       // 1-5 estrellas
//   textoReseña: String,
//   horasJugadas: Number,
//   dificultad: String,       // "Fácil", "Normal", "Difícil"
//   recomendaria: Boolean,
//   fechaCreacion: Date,
//   fechaActualizacion: Date          
// ============================================

// Esquema de Videojuegos
const videojuegoSchema = new mongoose.Schema({

  titulo: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  plataforma: {
    type: String,                                                                           
    required: true
  },
  anoLanzamiento: {
    type: Number,
    required: true
  },
  desarrollador: {
    type: String,
    required: true
  },
  imagenPortada: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

// Esquema de Reseñas
const resenaSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Videojuegos',
    required: true
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  textoResena: {
    type: String,
    required: true
  },
  horasJugadas: {
    type: Number,
    required: true
  },
  dificultad: {
    type: String,
    enum: ['Fácil', 'Normal', 'Difícil'],
    required: true
  },
  recomendaria: {
    type: Boolean,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Modelos
const Videojuego = mongoose.model('Videojuegos', videojuegoSchema);
const Resena = mongoose.model('Resenas', resenaSchema);

// ============================================
// RUTAS PARA VIDEOJUEGOS
// ============================================

// GET - Obtener todos los videojuegos
app.get('/api/videojuegos', async (req, res) => {
  try {
    const videojuegos = await Videojuego.find();
    res.json(videojuegos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener videojuegos', detalle: error.message });
  }
});

// GET - Obtener un videojuego por ID
app.get('/api/videojuegos/:id', async (req, res) => {
  try {
    const videojuego = await Videojuego.findById(req.params.id);
    
    if (!videojuego) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    
    res.json(videojuego);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener videojuego', detalle: error.message });
  }
});

// POST - Crear un nuevo videojuego
app.post('/api/videojuegos', async (req, res) => {
  try {
    const videojuegoData = req.body.videojuego;

    const nuevoVideojuego = new Videojuego(videojuegoData);
    
    const videojuegoGuardado = await nuevoVideojuego.save();
    res.status(201).json(videojuegoGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear videojuego', detalle: error.message });
  }
});

// PUT - Actualizar un videojuego
app.put('/api/videojuegos/:id', async (req, res) => {
  try {
    const videojuegoActualizado = await Videojuego.findByIdAndUpdate(
      req.params.id,
      {
        titulo: req.body.titulo,
        genero: req.body.genero,
        plataforma: req.body.plataforma,
        anoLanzamiento: req.body.anoLanzamiento,
        desarrollador: req.body.desarrollador,
        imagenPortada: req.body.imagenPortada,
        descripcion: req.body.descripcion,
        completado: req.body.completado
      },
      { new: true } // Retorna el documento actualizado
    );
    
    if (!videojuegoActualizado) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    
    res.json(videojuegoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar videojuego', detalle: error.message });
  }
});

// DELETE - Eliminar un videojuego
app.delete('/api/videojuegos/:id', async (req, res) => {
  try {
    const videojuegoEliminado = await Videojuego.findByIdAndDelete(req.params.id);
    
    if (!videojuegoEliminado) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    
    // También eliminar todas las reseñas asociadas
    await Resena.deleteMany({ juegoId: req.params.id });
    
    res.json({ mensaje: 'Videojuego y sus reseñas eliminados exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar videojuego', detalle: error.message });
  }
});

// ============================================
// RUTAS PARA RESEÑAS
// ============================================

// GET - Obtener todas las reseñas
app.get('/api/resenas', async (req, res) => {
  try {
    const resenas = await Resena.find().populate('juegoId');
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas', detalle: error.message });
  }
});

// GET - Obtener reseñas de un videojuego específico
app.get('/api/resenas/juego/:juegoId', async (req, res) => {
  try {
    const resenas = await Resena.find({ juegoId: req.params.juegoId }).populate('juegoId');
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas del juego', detalle: error.message });
  }
});

// GET - Obtener una reseña por ID
app.get('/api/resenas/:id', async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id).populate('juegoId');
    
    if (!resena) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    
    res.json(resena);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseña', detalle: error.message });
  }
});

// POST - Crear una nueva reseña
app.post('/api/resenas', async (req, res) => {
  try {
    const nuevaResena = new Resena({
      juegoId: req.body.juegoId,
      puntuacion: req.body.puntuacion,
      textoResena: req.body.textoResena,
      horasJugadas: req.body.horasJugadas,
      dificultad: req.body.dificultad,
      recomendaria: req.body.recomendaria
    });
    
    const resenaGuardada = await nuevaResena.save();
    res.status(201).json(resenaGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear reseña', detalle: error.message });
  }
});

// PUT - Actualizar una reseña
app.put('/api/resenas/:id', async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id,
      {
        juegoId: req.body.juegoId,
        puntuacion: req.body.puntuacion,
        textoResena: req.body.textoResena,
        horasJugadas: req.body.horasJugadas,
        dificultad: req.body.dificultad,
        recomendaria: req.body.recomendaria,
        fechaActualizacion: Date.now()
      },
      { new: true }
    );
    
    if (!resenaActualizada) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    
    res.json(resenaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar reseña', detalle: error.message });
  }
});

// DELETE - Eliminar una reseña
app.delete('/api/resenas/:id', async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    
    if (!resenaEliminada) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    
    res.json({ mensaje: 'Reseña eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar reseña', detalle: error.message });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '🎮 API de Videojuegos funcionando correctamente' });
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔗 Conectado a MongoDB Atlas`);
});