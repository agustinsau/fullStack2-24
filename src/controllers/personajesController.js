const MisPersonajes = require('../models/personajesModel');

const getAllCharacters = async (req, res) => {
  try {
    const dbCharacters = await MisPersonajes.find();
    console.log(dbCharacters)
    res.render("misPersonajes", { layout: "layouts/main", dbCharacters });

  } catch (error) {
    console.error("Error al obtener personajes:", error);
    res.status(500).send("Hubo un error al obtener los personajes");

  }
};

const createVenta = async (req, res) => {
  const { producto, fecha, cantidad, precio_unitario, total, imagen } = req.body; //formulario creacion venta
  const imagenPath = req.file ? req.file.filename : ''; // Ruta de la imagen guardada en el servidor

  try {
    const nuevaVenta = new Venta({
        producto: producto,
        fecha: fecha,
        cantidad: parseInt(cantidad),
        precio_unitario: parseInt(precio_unitario),
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
    res.render("editVenta", { layout: "layouts/main", venta});

  } catch {
    console.error("Error al obtener la venta:", error);
  }
};

const updateVenta = async (req, res) => {
  const { producto, fecha, cantidad, precio_unit, total, imagen } = req.body;
  const imagenPath = req.file ? req.file.filename : ''; 

  try {
    await Venta.findByIdAndUpdate(req.params.id, {
      producto,
      fecha,
      cantidad,
      precio_unit,
      total,
      imagen: imagenPath,
    });
    res.redirect("/ventas");

  } catch (error) {
    console.error("Error al actualizar la personaje:", error);
    res.status(500).send("Hubo un error al actualizar el personaje");
  }
}

//Elimina un personaje
const borrarArticulo = async (req, res) => {
  try {
    await Venta.findByIdAndDelete(req.params.id);
    res.redirect("/ventas");
  } catch (error) {
    console.error("Error al eliminar el personaje:", error);
    res.status(500).send("Hubo un error al eliminar el personaje");
  }
};

module.exports = {
  getAllCharacters,
  createVenta,
  editVenta,
  updateVenta,
  borrarArticulo
};