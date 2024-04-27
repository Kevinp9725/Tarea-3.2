<<<<<<< HEAD
const z = require('zod')

const agregar = z.object({
    title: z.string(),
    year: z.number().int().min(1000).max(9999),
    director: z.string(),
    duration: z.number().positive(),
    poster: z.string().url(),
    genre: z.array(z.string()),
    rate: z.number()
  })

const agregarDatos = (pelicula) => {
  return agregar.safeParse(pelicula)
} 

module.exports = {
  agregarDatos
=======
const z = require('zod')

const agregar = z.object({
    title: z.string(),
    year: z.number().int().min(1000).max(9999),
    director: z.string(),
    duration: z.number().positive(),
    poster: z.string().url(),
    genre: z.array(z.string()),
    rate: z.number()
  })

const agregarDatos = (pelicula) => {
  return agregar.safeParse(pelicula)
} 

module.exports = {
  agregarDatos
>>>>>>> 862605a7ed85f9c2bdc7b25fdbf564429716060e
}