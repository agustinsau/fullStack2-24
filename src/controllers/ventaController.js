const Venta = require('../models/ventaModel');

const getAllVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    console.log(ventas)
    res.render("ventas", { layout: "layouts/main", ventas });

  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).send("Hubo un error al obtener los ventas");

  }
};

const createVenta = async (req, res) => {
  const { producto, fecha, cantidad, precio_unit, total, imagen } = req.body; //formulario creacion venta
  const imagenPath = req.file ? req.file.filename : ''; // Ruta de la imagen guardada en el servidor

  try {
    const nuevaVenta = new Venta({
        producto: producto,
        fecha: fecha,
        cantidad: parseInt(cantidad),
        precio_unit: parseInt(precio_unit),
        total: parseInt(total),
        imagen: imagenPath,
    });

    await nuevaVenta.save();

    res.redirect("/ventas");

  } catch (error) {
    console.error("Error al crear el venta:", error);
    res.status(500).send("Hubo un error al crear el venta");

  }
};

const editVenta = async (req, res) => {
  try{
    const venta = await Venta.findById(req.params.id);
    if(!venta){
      return res.status(404).send("Venta no encontrado");
    }
    res.render("editVenta", { layout: "layout/main", venta});

  } catch {
    console.error("Error al obtener la venta:", error);
  }
};

// const actualizarVenta = async (req, res) => {
//   const { producto, fecha, cantidad, precio_unit, total, imagen } = req.body;
//   const imagenPath = req.file ? req.file.filename : ''; 
//   try {

//   }
// }

// const borrarVenta = async (req, res) => {
//   try {
//     await Venta = await Venta.findByIdAndDelete(req.params.id);
// }

module.exports = {
  getAllVentas,
 //createVenta,
  editVenta,
  //actualizarVenta
};