const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ventaController = require("../src/controllers/ventaController");

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

// Ruta para mostrar todas las ventas
router.get("/ventas", ventaController.getAllVentas);

// Ruta para mostrar el formulario
router.get("/crear", (req, res) => {
  res.render("crearVenta", { layout: "layouts/main" });
});

// Ruta para manejar la creación de un nueva venta
//router.post("/crear", upload.single("imagen"), ventasController.createVenta);

// Ruta para mostrar el formulario de editar venta
router.get("/editar/:id", ventaController.editVenta);

// Ruta para eliminar la venta
//router.get("/borrar/:id", ventasController.borrarArticulo);

module.exports = router;