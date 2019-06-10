
const { writeFile, readFileSync } = require("fs");
const path = require("path");
const DB = path.join(__dirname, "../json_files/");

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
        modality: course.modalidad,
        description: course.descripcion
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

const mostrar = () => {
    listar();
    let html = `<hr/><p>A continuación se detallan los cursos registrados hasta el momento:</p><br><table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre Curso</th>
        <th scope="col">Valor</th>
        <th scope="col">Modalidad</th>
        <th scope="col">Descripción</th>
      </tr>
    </thead>
    <tbody>{{content}}</tbody></table><br><br><hr/>`;
    let additional = "";
    listadoCursos.forEach(curso => {
        additional += `<tr><th scope="row">${curso.id}</th><td>${curso.name}</td><td>${curso.value}</td><td>${curso.modality}</td><td>${curso.description}</td></tr>`;
    });
    if (!additional) {
        return "";
    } else {
        html = html.replace("{{content}}", additional);
        return html;
    }
};

module.exports = {
    suscribir,
    mostrar
}