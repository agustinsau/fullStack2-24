const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personajesDbSchema = new Schema({
  name: { type: String, required: true },
  ki: { type: String, required: true },
  maxKi: { type: String, required: true },
  race: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' }, // Ruta de la imagen
  affiliation: { type: String, required: true },
});

const Personaje = mongoose.model('misPersonajes', personajesDbSchema); // 'misPersonajes' = nombre del esquema o tabla en la bdd

module.exports = Personaje;