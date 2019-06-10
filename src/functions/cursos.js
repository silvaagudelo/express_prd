
const { writeFile, readFileSync } = require("fs");
const path = require("path");
const DB = path.join(__dirname, "../json_files/");
const estado = require("./estados");
const modalidad = require("./modalidades");

let cursosFN = "cursos.json";
let listadoCursos = [];

/**
 * Lectura de modalidades disponibles del archivo json
 */
const listar = () => {
    try {
        listadoCursos = JSON.parse(readFileSync(DB + cursosFN));
    } catch (ex) {
        listadoCursos = [];
    }
};

const guardar = () => {
    let datos = JSON.stringify(listadoCursos);
    let err = writeFile(DB + cursosFN, datos, (err) => {
        if (err) {
            return err;
        }
    });
    if (err) {
        return {
            status: false,
            message: err
        }
    } else {
        return {
            status: true,
            message: "Curso almancenado con éxito"
        }
    }
};

const suscribir = (course) => {
    listar();
    let curso = {
        id: course.id,
        name: course.name,
        value: course.value,
        modality: course.modality,
        status: course.status,
        description: course.description
    }
    if (!listadoCursos.find(curso => curso.id == course.id)) {
        listadoCursos.push(curso);
        result = guardar();
        return result;
    } else {
        return {
            status: false,
            message: "Lo siento, no he podido realizar la creación del curso porque este ya existe"
        }
    }
};

const mostrar = (id) => {
    listar();
    if (!id){
        return listadoCursos;
    }else{
        let curso = listadoCursos.find(curso => curso.id == id);
        if (curso){
            return curso;
        }else{
            return "";
        }
    }
};

const actualizar = (info)=>{
    if (!info){
        return {
            status: false,
            message: "No se ha suministrado la información necesaria para actualizar la información"
        }       
    }else{
        listar();
        let curso = listadoCursos.find(curso => curso.id == info.id);
        if (!curso){
            return {
                status: false,
                message: "Curso no existe"
            }
        }else{
            curso.name=info.name;
            curso.value=info.value;
            curso.modality=info.modality;
            curso.status=info.status;
            curso.description=info.description;
            return guardar();
        }
    }
}

module.exports = {
    suscribir,
    mostrar,
    actualizar
}