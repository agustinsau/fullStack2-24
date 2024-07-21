const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const personajesController = require("../src/controllers/articulosController");

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads/")); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
  }
});
const upload = multer({ storage: storage });

// Ruta para mostrar todos los articulos
router.get("/articulos", articulosController.getAllArticulos);

// Ruta para mostrar el formulario
router.get("/crear", (req, res) => {
  res.render("formulario", { layout: "layouts/main" });
});

// Ruta para manejar la creación de un nuevo articulo
router.post("/crear", upload.single("imagen"), articulosController.createArticulo);

module.exports = router;