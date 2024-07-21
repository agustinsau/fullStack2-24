const Personaje = require('../models/articuloModel');

const getAllArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.find();
    res.render("articulos", { layout: "layouts/main", articulos });
  } catch (error) {
    console.error("Error al obtener articulos:", error);
    res.status(500).send("Hubo un error al obtener los articulos");
  }
};

const createArticulo = async (req, res) => {
  const { producto, fecha, cantidad, precio_unit, total, imagen } = req.body; //formulario creacion articulo
  const imagenPath = req.file ? req.file.filename : ''; // Ruta de la imagen guardada en el servidor

  try {

    const nuevoArticulo = new Articulo({
        producto,
        fecha,
        cantidad: parseInt(cantidad),
        precio_unit: parseInt(precio_unit),
        total: parseInt(total),
        imagen: imagenPath,
    });

    await nuevoArticulo.save();

    res.redirect("/articulos");

  } catch (error) {

    console.error("Error al crear el articulo:", error);
    res.status(500).send("Hubo un error al crear el articulo");

  }
};

module.exports = {
  getAllArticulos,
  createArticulo
};