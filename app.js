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
const ventasRouter = require("./routes/ventaRoutes"); // Importa el router de ventas

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
app.get("/ventas", ventasRouter);

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
  const character = response.data; 

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

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render("error404", { title: "Página no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
