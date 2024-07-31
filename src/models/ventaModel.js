const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
  fecha: { type: String, required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio_unitario: { type: Number, required: true },
  total: { type: Number, required: true },
  //imagen: { type: String, default: '' } // Ruta de la imagen
});

const Venta = mongoose.model('Venta', ventaSchema);

module.exports = Venta;