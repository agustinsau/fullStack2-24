const mongoose = require('mongoose');

const articuloSchema = new mongoose.Schema({
  fecha: { type: String, required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  total: { type: Number, required: true },
  imagen: { type: String, default: '' } // Ruta de la imagen
});

const Articulo = mongoose.model('Articulo', articuloSchema);

module.exports = Articulo;