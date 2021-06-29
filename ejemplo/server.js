console.log("Hola mundo desde NodejS")

const express = require('express');
const mongoose = require ('mongoose');
const TareaSchema = require("./modelos/Tarea.js");
const app=express();
const router=express.Router();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//conexion a base de datos
mongoose.connect("mongodb+srv://pro_web:Aura2020.@clusterproweb.gbxmb.mongodb.net/ActividadesDB?retryWrites=true&w=majority");

//operaciones CRUD
router.get('/',(req,res)=>{
    res.send("el inicio de mi API");
});

router.post('/tarea',(req,res)=>{
    let nuevaTarea=new TareaSchema({
        idTarea:req.body.id,
        nombreTarea: req.body.nombre,
        detalleTarea:req.body.detalle
    });

    nuevaTarea.save(function(err,datos){
        if(err){
            console.log(err);
        }
        res.send("Tarea almacenada correctamente.")
    })
});

app.use(router);

router.get('/tarea', (req,res)=> {
    TareaSchema.find(function(err,datos){
        if(err){
            console.log("error leyendo las tareas");
        }else{
            res.send(datos);
        }
    })
});

app.listen(3000,()=>{
    console.log("servidor corriendo en el puerto 3000")
});
