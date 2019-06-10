const hbs = require("hbs");
const path = require("path");
const { readFileSync } = require("fs");
const DB = path.join(__dirname,"../json_files/");
const base = require("../functions/cursos");
const estados = require("../functions/estados");
const modalidades = require("../functions/modalidades");
const enroll = require("../functions/enroll")

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

hbs.registerHelper("cargarCursos",()=>{
    let array = [];
    let html="<option disabled>Selecciona...</option>";
    try{
        array =  base.mostrar();
        array = array.filter(buscar => buscar.status != "2");
        array.forEach(item => {
            html+=`<option value="${item.id}">${item.name}</option>`;
        });
    }catch(ex){
        console.log(ex);
        array=[];
    }    
    return html;
});

hbs.registerHelper("viewEnroll",()=>{
    let registrados = [];
    let cursos= [];
    let gne= `<div class="accordion" id="accordionExample">{{content}}</div><br><br>`
    let ghtml=`<div class="card">
            <div class="card-header" id="handing{{id}}">
                <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse{{id}}" aria-expanded="true" aria-controls="collapse{{id}}">
                    Registrados en el curso: {{name}}
                </button>
                </h2>
            </div>
            <div id="collapse{{id}}" class="collapse" aria-labelledby="collapse{{id}}" data-parent="#accordionExample">
                <div class="card-body">
                    <table class="table">
                        <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre Candidato</th>
                            <th scope="col">Email</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Liberar Cupo</th>
                        </tr>
                        </thead>
                        <tbody>{{content}}</tbody>
                    </table>
                </div>
            </div>
        </div>`;
    let returns="";
    try{
        cursos =  base.mostrar();
        cursos = cursos.filter(buscar => buscar.status != "2");
        registrados =  enroll.mostrar();
        cursos.forEach(curso => {
            let table= registrados.filter(regi=> regi.course == curso.id);
            let nombreCurso= base.mostrar(curso.id).name;
            let html="";
            table.forEach(item => {
                html += `<tr><th scope="row">${item.id}</th><td>${item.name}</td><td>${item.email}</td><td>${item.phone}</td><td><a class="btn btn-danger btn-block" href="/enroll/delete/?user=${item.id}&course=${curso.id}">Si</a></td></tr>`;
            });
            var find = '{{id}}';
            var re = new RegExp(find, 'g');
            returns+= ghtml.replace("{{content}}", html);
            returns = returns.replace(re, curso.id).replace("{{name}}", nombreCurso);
        });
    }catch(ex){
        console.log(ex);
        array=[];
    }    
    return  gne.replace("{{content}}",returns);
});