const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port= process.env.PORT || process.env.port || "3000";
const currect_directory =  path.join(__dirname,"../public");
const dirNode_modules = path.join(__dirname , '../node_modules');
const partials = path.join(__dirname,"../src/partials");
const base= require("./functions/cursos");
const enroll= require("./functions/enroll");

/**
 * Inicialización de la aplicación de express
 */
app.use(bodyParser.urlencoded({extended: true}));

hbs.registerPartials(partials);
app.set('views', __dirname + '/views');
app.set("view engine", "hbs");
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
app.use('/img', express.static(currect_directory + '/img'));
app.use('/css', express.static(currect_directory + '/css'));
app.use('/js', express.static(currect_directory + '/js'));
require("./helpers/functions");

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/course/create",(req,res)=>{
    res.render("courseCreate");
})
app.post("/course/createStatus",(req,res)=>{
    let result = base.suscribir(req.body);
    res.render("courseCreateStatus", result);
});
app.get("/course/view",(req,res)=>{
    res.render("courseView");
});
app.get("/course/edit/:id(\\d+)/",(req,res)=>{
    let course = base.mostrar(req.params.id);
    if (course){
        res.render("courseEdit", course);
    }else{
        res.redirect("/");
    }
});
app.post("/course/editStatus",(req,res)=>{    
    let result = base.actualizar(req.body);
    res.render("courseCreateStatus", result);
});
app.get("/enroll/suscribe",(req,res)=>{    
    res.render("suscribe");
});
app.post("/enroll/enrollStatus",(req,res)=>{   
    let result = enroll.suscribir(req.body);
    res.render("enrollStatus",result);
});
app.get("/enroll/view",(req,res)=>{   
    res.render("viewSuscribe");
});
app.get("/enroll/delete",(req,res)=>{   
    let result = enroll.eliminar(req.query.user, req.query.course);
    res.render("enrollStatus",result);
});


app.use("*",(req,res)=>{
    res.status(404).send("Error");
})

/**
 * Inicialización de escucha de express por el puerto especificado en l
 * variable port || PORT.
 */
app.listen(port,(err)=>{
    if (err) throw err;
    console.log("Express server se encuentra corriendo en el puerto: " + port)  
});
