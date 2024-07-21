const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const hbs = require("hbs");
const uploadRouter = require("./routes/uploadRoutes"); // Importa el router de upload
const axios = require('axios'); //Axios para consumir API
const bodyParser = require('body-parser');

// Cargar variables de entorno
dotenv.config();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Middleware para analizar datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Middleware para manejar rutas de carga de archivos
app.use("/upload", uploadRouter);

// Ruta principal con consumo de API usando axios
app.get("/", async (req, res) => {
  try {
    const response = await axios.get('https://dragonball-api.com/api/characters');
    
    // Envía la respuesta de la API externa al cliente
    res.render("index", {
      layout: "layouts/main",
      title: "Inicio",
      message: "Bienvenidos a nuestra aplicación de carga de archivos",
      characters: response.data.items,
    });
    
  } catch (error) {
      console.error('Error al consumir la API externa:', error.message);
      res.status(500).json({ message: 'Error al consumir la API externa' });
  }
  
});

// Rutas
app.get("/contacto", (req, res) => {
res.render("contacto", {
    title: "Contacto",
    message: "Bienvenidos a contacto",
  });
});

app.get("/buscar", (req, res) => {
res.render("buscar", {
    character: null,
    title: "Buscador",
    message: "Bienvenidos al buscador de personajes",
  });
});

// Ruta para manejar el envío del formulario
app.post('/buscar', async (req, res) => {
  const name = req.body.name;
  const response = await axios.get(`https://dragonball-api.com/api/characters?name=${name}`);
  const character = response.data; // Ajusta esto según la estructura de la respuesta de tu API

  if(character.length > 0){
    console.log(response.data)
    res.render('buscar', { 
      character, 
      title: "Buscador Personajes",
      message: "Bienvenidos al buscador de personajes", 
    });
  } else {
    res.render('buscar', { 
      character: null, 
      title: "Buscador Personajes",
      message: "Bienvenidos al buscador de personajes", 
      error: 'Personaje no encontrado.' 
    });
  }
  
});

// Ruta para consumir una API externa usando Axios
// app.get('/api/data', async (req, res) => {
  
// });
 

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render("error404", { title: "Página no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
