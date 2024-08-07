const Personaje = require('../models/personajesModel');

const getAllCharacters = async (req, res) => {
  try {
    const dbCharacters = await Personaje.find();
    //console.log(dbCharacters)
    res.render("misPersonajes", { layout: "layouts/main", dbCharacters, formAction: "misPersonajes/buscar" });

  } catch (error) {
    console.error("Error al obtener personajes:", error);
    res.status(500).send("Hubo un error al obtener los personajes");

  }
};

const createPersonaje = async (req, res) => {
  const { name, ki, maxKi, race, gender, description, affiliation, image } = req.body; //formulario creacion personaje
  const imagenPath = req.file ? req.file.filename : ''; // Ruta de la imagen guardada en el servidor

  try {
    const nuevoPersonaje = new Personaje({
      name: name,
      ki: ki,
      maxKi: maxKi, 
      race: race,
      gender, gender,
      description: description, 
      affiliation: affiliation,
      image: imagenPath
    });

    await nuevoPersonaje.save();

    res.redirect("/misPersonajes");

  } catch (error) {
    console.error("Error al crear el personaje:", error);
    res.status(500).send("Hubo un error al crear el personaje");

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
  const { name, ki, maxKi, race, gender, description, affiliation } = req.body;
  //const imagenPath = req.file ? req.file.filename : ''; 

  let imagenPath = ''; 

  if(req.file){
    imagenPath = req.file.filename;
  } else {
    const personaje = await Personaje.findById(req.params.id);
    imagenPath = personaje.image;
  }

  try {
    await Personaje.findByIdAndUpdate(req.params.id, {
      name,
      ki,
      maxKi,
      race,
      gender,
      description,
      image: imagenPath,
      affiliation,
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
    await Personaje.findByIdAndDelete(req.params.id);
    res.redirect("/misPersonajes");
  } catch (error) {
    console.error("Error al eliminar el personaje:", error);
    res.status(500).send("Hubo un error al eliminar el personaje");
  }
};

const searchCharacter = async (req, res) => {
  const nameSearched = req.body.name;
  
  try {
    // Busca personajes en la base de datos que coincidan con el nombre
    const dbCharacters = await Personaje.find({ name: nameSearched });

    console.log(dbCharacters)
    if (dbCharacters.length > 0) {
      
      res.render("misPersonajes", { 
        layout: "layouts/main",
        formAction: "misPersonajes/buscar",
        dbCharacters,
        // title: "Buscador Personajes",
        // message: "Bienvenidos al buscador de personajes", 
      });
    } else {
      res.render("misPersonajes", { 
        layout: "layouts/main",
        // characters: null, 
        // title: "Buscador Personajes",
        // message: "Bienvenidos al buscador de personajes", 
        error: 'Personaje no encontrado.' 
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al realizar la consulta.');
  }
  
};

module.exports = {
  getAllCharacters,
  createPersonaje,
  editPersonaje,
  updatePersonaje,
  deletePersonaje,
  searchCharacter
};