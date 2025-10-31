const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())

//---------------------------Conexion a la base de datos--------------------------//
const MONGODB_URI = 'mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/daniel_mendez';


const conectarDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Base de datos conectada')
    } catch (error) {
    console.log('Error conectando con Mongo')
    process.exit(1);
    }
}

conectarDB();

const Tarea = require('./modelos/tarea.js');
//---------------------------Metodo get---------------------------//
app.get('/tareas', async(req,res) => {
    const tareas = await Tarea.find()
    res.send(tareas)
})

//-------------------------Metodo Post--------------------------//
app.post('/tareas', async (req, res) => {
    const nombre = req.body.nombre;
    const hora = req.body.hora;

    const tarea = {
        nombre: nombre,
        hora: hora
    }

    const nuevaTarea = new Tarea(tarea)

    const tareaGuardada = await nuevaTarea.save()
    
    res.send(tareaGuardada)
});

//---------------------------Metodo put---------------------------//
app.put('/tareas/:id', async(req,res) => {
    const nombre = req.body.nombre;
    const id = req.params.id;
    if (!id) {
        return res.send('debes mandar el id')
    }

        const tarea = {
        nombre: nombre
    }
    
    const tareaActualizada = await Tarea.findByIdAndUpdate(id, tarea, {new: true})

    res.send(tareaActualizada)
})

//--------------------------Metodo delete---------------------------//
app.delete('/tareas/:id', async(req,res) => {
    const id = req.params.id;
    if (!id) {
        return res.send('debes mandar el id')
    }

    const tareaActualizada = await Tarea.findByIdAndDelete(id)

    res.send(tareaActualizada)
})


//--------------------------Ejecutar servidor---------------------------//
app.listen(3000, () => {
    console.log('Servidor ejecutandose en http://localhost:3000');
})