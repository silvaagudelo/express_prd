
const { writeFile, readFileSync } = require("fs");
let cursosFileName="";
let registradosFileName="";

/**
 * Lectura de modalidades disponibles del archivo json
 */
const leerModalidades=()=>{
    let modalidades = [];
    let html="<option>Selecciona...</option>";
    try{
        modalidades =  JSON.parse(readFileSync("./../src/json_files/modalidades.json"));
        modalidades.forEach(item => {
            html+=`<option value="${item.id}>${item.name}</option>`;
        });
    }catch(ex){
        console.log(ex);
        modalidades=[];
    }
    return html;
}

const suscribir = ()=>{

};