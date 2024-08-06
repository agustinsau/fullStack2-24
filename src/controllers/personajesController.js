const Personaje = require('../models/personajesModel');

const getAllCharacters = async (req, res) => {
  try {
    const dbCharacters = await Personaje.find();
    console.log(dbCharacters)
    res.render("misPersonajes", { layout: "layouts/main", dbCharacters });

  } catch (error) {
    console.error("Error al obtener personajes:", error);
    res.status(500).send("Hubo un error al obtener los personajes");

  }
};

const createPersonaje = async (req, res) => {
  const { name, maxKi, race, gender, description, image, affiliation } = req.body; //formulario creacion personaje
  const imagenPath = req.file ? req.file.filename : ''; // Ruta de la imagen guardada en el servidor

  try {
    const nuevoPersonaje = new MisPersonajes({
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

const editPersonaje = async (req, res) => {
  try{
    const character = await Personaje.findById(req.params.id);
    if(!character){
      return res.status(404).send("Personaje no encontrado");
    }
    res.render("editPersonaje", { layout: "layouts/main", character});

  } catch {
    console.error("Error al obtener el personaje:", error);
  }
};

const updatePersonaje = async (req, res) => {
  const { name, ki, maxKi, race, gender, description, affiliation, image  } = req.body;
  const imagenPath = req.file ? req.file.filename : ''; 

  try {
    await Personaje.findByIdAndUpdate(req.params.id, {
      name,
      ki,
      maxKi,
      race,
      gender,
      description,
      affiliation,
      image: `uploads/${imagenPath}`,
    });
    res.redirect("/misPersonajes");

  } catch (error) {
    console.error("Error al actualizar la personaje:", error);
    res.status(500).send("Hubo un error al actualizar el personaje");
  }
}

//Elimina un personaje
const deletePersonaje = async (req, res) => {
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
  createPersonaje,
  editPersonaje,
  updatePersonaje,
  deletePersonaje
};