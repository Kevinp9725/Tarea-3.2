const express = require('express')
const peliculas = require('./movies.json')
const { agregarDatos } = require('./schema/movie.js')
const { v4: uuidv4, validate: validateUUID } = require('uuid');
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.send("Cargando peliculas")
})

app.get('/peliculas', (req, res) => {
    res.json(peliculas)
})

app.get('/peliculas/:id', (req, res) => {
    const {id} = req.params

    const peliculaID = id

    if (!validateUUID(peliculaID)) {
        res.status(400).json({error: true, message: 'Datos Incorrectos'})
    }

    const peli = peliculas.filter(({id}) => id === peliculaID)
    
    res.json(peli)
})

app.post('/peliculas', (req, res) => {
    let data = req.body

    const verificar = agregarDatos(data)

    if(verificar.success){
        data = {
            id: uuidv4(),
            ...data
        }

        peliculas.unshift(data)
        res.status(201).json(peliculas)
    }else{
        res.status(400).json({
            error: true,
            message: 'Datos invalidos'
        })
    }
} )

app.put('/peliculas/:id', (req, res) => {
    const { id } = req.params;
    const newData = req.body;


    const i = peliculas.findIndex(pelicula => pelicula.id === id);

    if (i === -1) {
        return res.status(404).json({ error: true, message: 'Película no encontrada' });
    }

    peliculas[i] = { ...peliculas[i], ...newData };

    fs.writeFile('movies.json', JSON.stringify(peliculas, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
            return res.status(500).json({ error: true, message: 'Error al modificar la película' });
        }

        res.status(200).json(peliculas[i]);
    });
});

app.delete('/peliculas/:id', (req, res) => {
    const { id } = req.params;

    const i = peliculas.findIndex(pelicula => pelicula.id === id);

    if (i === -1) {
        return res.status(404).json({ error: true, message: 'Película no encontrada' });
    }

    const deletedMovie = peliculas.splice(i, 1)[0];

    fs.writeFile('movies.json', JSON.stringify(peliculas, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
            return res.status(500).json({ error: true, message: 'Error al eliminar la película' });
        }

        res.status(200).json(deletedMovie);
    });
});

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`)
})
