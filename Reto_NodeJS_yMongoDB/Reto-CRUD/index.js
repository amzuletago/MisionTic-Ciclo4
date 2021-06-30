const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const DatoSchema = require("./modelos/dato.js");

const app = express();
const router = express.Router();
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* Operaciones CRUD */
router.get("/", (req, res) => {
  res.send("El inicio de mi API.");
});

router.post("/dato", (req, res) => {
  const nuevoDato = new DatoSchema({
  	id: req.body.id,
	tipo: req.body.tipo,
	documento: req.body.documento,
	nombres: req.body.nombres,
	apellidos: req.body.apellidos,
	direccion: req.body.direccion,
	correo: req.body.correo,
	fijo: req.body.fijo,
	celular: req.body.celular,
	enlace: req.body.enlace,
	perfil: req.body.perfil
  });
  nuevoDato.save(function(err) {
  	if (err)
  	{
  		console.log(err);
  	}
  	res.send("Datos almacenados correctamente.");
  });
});
app.use(router);

router.get("/dato", (req, res) => {
  DatoSchema.find(function(err, datos) {
  	if (err)
  	{
  		console.log("Error leyendo los datos");
  	}
  	else
  	{
  		res.send(datos);
  	}
  })
});

/*router.get("/dato", (req, res) => {
  DatoSchema.findOne({id: req.body.id}, function(err, datos) {
  	if (err)
  	{
  		console.log(err);
  	}
  	else
  	{
  		res.send(datos);
  	}
  })
});*/

router.put("/dato", (req, res) => {
	DatoSchema.findOneAndUpdate({id: req.body.id},
	   {
		tipo: req.body.tipo,
		documento: req.body.documento,
		nombres: req.body.nombres,
		apellidos: req.body.apellidos,
		direccion: req.body.direccion,
		correo: req.body.correo,
		fijo: req.body.fijo,
		celular: req.body.celular,
		enlace: req.body.enlace,
		perfil: req.body.perfil
	  }, function(err) {
		  	if (err)
		  	{
		  		console.log(err);
		  	}
		  	else
		  	{
		  		res.send("Datos actualizados correctamente");
		  	}
		  });
});

router.delete("/dato", (req, res) => {
  DatoSchema.findOneAndDelete({id: req.body.id}, function(err) {
  	if (err)
  	{
  		console.log(err);
  	}
  	else
  	{
  		res.send("Datos borrados correctamente");
  	}
  })
});

/* Conexión a base de datos */
mongoose.connect("mongodb+srv://admin:Grupo3BD@clusterprogweb.xzuj2.mongodb.net/NEWBD?retryWrites=true&w=majority")
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});