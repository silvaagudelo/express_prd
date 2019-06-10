const { writeFile, readFileSync } = require("fs");
const path = require("path");
const DB = path.join(__dirname, "../json_files/");
const curso = require("./cursos");
let enrollFN = "enrollment.json";
let listadoEnrolamientos = [];

const listar = () => {
    try {
        listadoEnrolamientos = JSON.parse(readFileSync(DB + enrollFN));
    } catch (ex) {
        listadoEnrolamientos = [];
    }
};

const guardar = () => {
    let datos = JSON.stringify(listadoEnrolamientos);
    let err = writeFile(DB + enrollFN, datos, (err) => {
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
            message: "Registrado correctamente"
        }
    }
};

const suscribir = (person) => {
    listar();
    let curso = {
        id: person.id,
        name: person.name,
        email: person.email,
        phone: person.phone,
        course: person.curso,
    }
    if (!listadoEnrolamientos.find(enroll => enroll.id == person.id && enroll.course == person.curso)){
        listadoEnrolamientos.push(curso);
        result = guardar();
        return result;
    } else {
        return {
            status: false,
            message: "Lo siento, no he podido realizar la inscripción  en el  curso porque ya se encuentra registrado."
        }
    }
};

const mostrar = (id) => {
    listar();
    if (!id){
        return listadoEnrolamientos;
    }else{
        let enroll = listadoEnrolamientos.find(enroll => enroll.id == id);
        if (enroll){
            return enroll;
        }else{
            return "";
        }
    }
};

const eliminar = (id,course) =>{
    if (!id || !course){
        return{
            status: false,
            message: "Información requerida para realizar el proceso no suministrada"
        }      
    }else{
        listar();
        let est = listadoEnrolamientos.filter(buscar => buscar.id != id && buscar.id.course != course );
        if (!est){
            return{
                status: false,
                message: "Alumno a eliminar no se encuentra registrado"
            }
        }else{
            if (est.length != listadoEnrolamientos.length){
                listadoEnrolamientos=est;
                guardar();
                return{
                    status: true,
                    message: "Proceso realizado correctamente"
                }
            }        
        }
    }
}

module.exports= {
    suscribir,
    mostrar,
    eliminar
}
