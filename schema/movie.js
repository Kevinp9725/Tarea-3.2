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
}
