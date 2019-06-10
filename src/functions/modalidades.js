const { writeFile, readFileSync } = require("fs");
const path = require("path");
const DB = path.join(__dirname, "../json_files/");
let modalidadesFN = "modalidades.json";
let listadoModalidades = [];


const listar = () => {
    try {
        listadoModalidades = JSON.parse(readFileSync(DB + modalidadesFN));
    } catch (ex) {
        listadoModalidades = [];
    }
};

const mostrar = () => {
    listar();
    return listadoModalidades;
};

const nombre = (id) => {
    listar();
    let modalidad= listadoModalidades.find(modalidad => modalidad.id == id);
    if (modalidad){
        return modalidad.name;
    }
    else{
        return "na";
    }
};

module.exports ={
    mostrar,
    nombre
}