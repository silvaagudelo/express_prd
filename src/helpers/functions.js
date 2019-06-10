const hbs = require("hbs");
const path = require("path");
const { readFileSync } = require("fs");
const DB = path.join(__dirname,"../json_files/");
const base = require("../functions/cursos");
const estados = require("../functions/estados");
const modalidades = require("../functions/modalidades");

/**
 * Lectura de estados desde los archivos .json
 */
hbs.registerHelper("leerEstados",(id)=>{
    let array = [];
    let html="";
    try{
        array =  estados.mostrar();
        array.forEach(item => {
            if (id == item.id){
                if (id == item.id){
                    html+=`<option selected value="${item.id}" >${item.name}</option>`;
                }
            }else{
                if (item.default){
                    html+=`<option value="${item.id}" selected>${item.name}</option>`;
                }else{
                    html+=`<option value="${item.id}" >${item.name}</option>`;
                }
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
hbs.registerHelper("leerModalidades",(id)=>{
    let array = [];
    let html="";
    if (!id){
        html="<option selected disabled>Selecciona...</option>";
    }else{
        html="<option disabled>Selecciona...</option>";
    }
    try{
        array =  modalidades.mostrar();
        array.forEach(item => {
            if (id == item.id){
                html+=`<option selected value="${item.id}">${item.name}</option>`;
            }else{
                html+=`<option value="${item.id}">${item.name}</option>`;
            }
        });
    }catch(ex){
        console.log(ex);
        array=[];
    }
    return html;
});

hbs.registerHelper("leerCursos",()=>{
    let result = base.mostrar();
    let html = `<hr/><p>A continuación se detallan los cursos registrados hasta el momento:</p><br><table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre Curso</th>
        <th scope="col">Valor</th>
        <th scope="col">Modalidad</th>
        <th scope="col">Estado</th>
        <th scope="col">Descripción</th>
      </tr>
    </thead>
    <tbody>{{content}}</tbody></table><br><br><hr/>`;
    let additional = "";
    result.forEach(curso => {
        let modalidadName = modalidades.nombre(curso.modality);
        let estadoName = estados.nombre(curso.status);
        additional += `<tr><th scope="row"><a href="/course/edit/${curso.id}">${curso.id}</a></th><td>${curso.name}</td><td>${curso.value}</td><td>${modalidadName}</td><td>${estadoName}</td><td>${curso.description}</td></tr>`;
    });
    if (!additional) {
        return "";
    } else {
        html = html.replace("{{content}}", additional);
        return html;
    }
});