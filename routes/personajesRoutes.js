const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const personajesController = require("../src/controllers/personajesController");

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/")); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
  }
});

const fileFilter = (req, file, cb) => { 
  //Criterio aceptacion archivo: solo imagenes con formato jpeg, png o jpg
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(null, false); // Rechazar el archivo
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Ruta para mostrar todas los personajes personales
router.get("/", personajesController.getAllCharacters);

// Ruta para manejar busqueda de personajes por bdd
router.post('/buscar', personajesController.searchCharacter);

// Ruta para mostrar el formulario de creacion
router.get("/crear", (req, res) => {
  res.render("crearPersonaje", { layout: "layouts/main" });
});

// Ruta para mostrar el formulario de editar personaje
router.get("/editar/:id", personajesController.editPersonaje);

// Ruta para manejar la creación de un nuevo personaje
router.post("/crear", upload.single("image"), personajesController.createPersonaje);

// Ruta para manejar la actualización de un personaje
router.post("/editar/:id", upload.single("image"), personajesController.updatePersonaje);

// Ruta para eliminar la venta
router.get("/borrar/:id", personajesController.deletePersonaje);

module.exports = router;
