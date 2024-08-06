const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/")); // Directorio donde se guardan los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre original del archivo subido
  },
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

// Ruta para mostrar el formulario de carga de archivos
router.get("/", (req, res) => {
  res.render("upload-form", {
    layout: "layouts/main",
    title: "Carga de archivos",
    message: "Formulario de carga de archivos.",
  });
});

// Ruta para manejar la carga de archivos con validaciones
router.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
      const fileExtension = path.extname(req.file.originalname);

      res.render("upload-success", {
      title: "Carga Exitosa",
      message: "Archivo cargado exitosamente",
      filename: req.file.filename,
      fileExt: fileExtension,

    });
  } else {
      res.render("upload-failure", {
      title: "Carga Fallida",
      message: "Fallo la carga del archivo. Archivo no seleccionado o extension no permitida.",
    
    });
  }
});

module.exports = router;
