const hbs = require("hbs");
const path = require("path");
const { readFileSync } = require("fs");
const DB = path.join(__dirname,"../json_files/");
const base = require("./../functions/base");

/**
 * Lectura de estados desde los archivos .json
 */
hbs.registerHelper("leerEstados",()=>{
    let array = [];
    let html="";
    try{
        array =  JSON.parse(readFileSync(DB +"estados.json"));
        array.forEach(item => {
            if (item.default){
                html+=`<option value="${item.id}" selected>${item.name}</option>`;
            }else{
                html+=`<option value="${item.id}" >${item.name}</option>`;
            }
        });
    }catch(ex){
        console.log(ex);
        array=[];
    }
    return html;
});

/**
 * Lectura de la modalidades
 */
hbs.registerHelper("leerModalidades",()=>{
    let array = [];
    let html="<option selected disabled>Selecciona...</option>";
    try{
        array =  JSON.parse(readFileSync(DB +"modalidades.json"));
        array.forEach(item => {
            html+=`<option value="${item.id}">${item.name}</option>`;
        });
    }catch(ex){
        console.log(ex);
        array=[];
    }
    return html;
});

hbs.registerHelper("leerCursos",()=>{
    let result = base.mostrar();
    return result;
});