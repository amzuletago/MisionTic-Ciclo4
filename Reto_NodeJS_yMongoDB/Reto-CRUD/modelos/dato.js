const mongoose = require("mongoose");

let DatoSchema= new mongoose.Schema({
	id: Number,
	tipo: String,
	documento: Number,
	nombres: String,
	apellidos: String,
	direccion: String,
	correo: String,
	fijo: Number,
	celular: Number,
	enlace: String,
	perfil: String
});

module.exports = mongoose.model("dato", DatoSchema, "datos");