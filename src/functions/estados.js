const { writeFile, readFileSync } = require("fs");
const path = require("path");
const DB = path.join(__dirname, "../json_files/");
let estadosFN = "estados.json";
let listadoEstados = [];


const listar = () => {
    try {
        listadoEstados = JSON.parse(readFileSync(DB + estadosFN));
    } catch (ex) {
        listadoEstados = [];
    }
};

const mostrar = () => {
    listar();
    return listadoEstados;
};

const nombre = (id) => {
    listar();
    let estado = listadoEstados.find(estado => estado.id == id);
    if (estado) {
        return estado.name;
    } else {
        return "na";
    }
};

module.exports = {
    mostrar,
    nombre
}