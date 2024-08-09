const express = require("express");
const connectDB = require("./src/config/db");
const app = express();
const axios = require('axios'); //Axios para consumir API
const bodyParser = require('body-parser');
const path = require("path");
const dotenv = require("dotenv");
const hbs = require("hbs");

// Conectar a la base de datos MongoDB
connectDB();

//Rutas
const uploadRouter = require("./routes/uploadRoutes"); // Importa el router de upload
const personajesRoutes = require("./routes/personajesRoutes"); // Importa el router de personajes de la bdd

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

// Middleware para manejar rutas de ventas
app.use("/misPersonajes", personajesRoutes);

// Ruta principal con consumo de API usando axios
app.get("/", async (req, res) => {
  try {
    const response = await axios.get('https://dragonball-api.com/api/characters');
    //console.log(response.data.items)
    // Envía la respuesta de la API externa al cliente
    res.render("index", {
      layout: "layouts/main",
      title: "Inicio",
      message: "Bienvenidos a nuestra aplicación",
      characters: response.data.items,
    });
    
  } catch (error) {
      console.error('Error al consumir la API externa:', error.message);
      res.status(500).json({ message: 'Error al consumir la API externa' });
  }
  
});

// Ruta para manejar busqueda de personajes por api
app.post('/', async (req, res) => {
  const name = req.body.name;
  const response = await axios.get(`https://dragonball-api.com/api/characters?name=${name}`);
  const characters = response.data; 

  if(characters.length > 0){
    //console.log(response.data)
    res.render("index", { 
      layout: "layouts/main",
      characters, 
    });

  } else {
    res.render("index", { 
      layout: "layouts/main", 
      error: 'Personaje no encontrado.' 
    });
  }
  
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render("error404", { title: "Página no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
