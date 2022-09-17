let arregloNuevo = [];
let inputPalabra = document.querySelector(".input-nuevaP");
let botonNuevaP = document.querySelector('.nuevaP');
let botonCancelarP = document.querySelector(".cancelar-nuevaP");
let pasarcadena;
const resultado = document.querySelector('#resultado');
let mensajeParrafo = document.querySelector(".mensaje-validacion");


//funcion que limpia el localStorage si hay algun elemento en el
function funcionLimpiadora(){
    if(localStorage.length == 4 ){
        localStorage.clear();
        console.log("Se limpio el storage");
    }
    
}

//al cargar la pagina llama a una funcion que borra el localStorage por si hay algun dato 
window.onload = funcionLimpiadora;

function ingresarNuevaPalabra(){
    if(!inputPalabra.checkValidity() ) {  //validar si esta vacio o no pasa validacion de minusculas manda mensaje
        //alert("INGRESO DE DATOS INCORRECTO, SIN MAYUSCULAS NI CAMPO VACIO!!");
        mensajeParrafo.classList.add("contenedor-mensaje");
        mensajeParrafo.innerHTML = "INGRESO DE DATOS INCORRECTO, SIN MAYUSCULAS NI CAMPO VACIO!!";
        setTimeout(() => {
            mensajeParrafo.classList.remove("contenedor-mensaje");
            mensajeParrafo.innerHTML = "";
            inputPalabra.value = "";
        }, 1500);
    } else if(inputPalabra.value == ""){
        alert("No puede dejar campo en blanco!!");
    } else{
        arregloNuevo.push(inputPalabra.value);
    alert("Ingreso exitosamente una nueva palabra, redireccionando");
    Spinner();
    localStorage.setItem("palabra",arregloNuevo);
    pasarcadena = localStorage.getItem("palabra");
    setTimeout(() => {
        window.location.href="juego.html";
    }, 2000);
    }
    
}

function Spinner(){
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;
    resultado.appendChild(divSpinner);
}

function fnCancelarNuevaP(){
    inputPalabra.value = "";
    mensajeParrafo.classList.add("contenedor-mensaje");
    mensajeParrafo.innerHTML = "Se cancelo la operacion";

    setTimeout(() => {
        mensajeParrafo.classList.remove("contenedor-mensaje");
        mensajeParrafo.innerHTML = "";
        location.href = "index.html";
    }, 999);
}



botonNuevaP.addEventListener('click', ingresarNuevaPalabra);
botonCancelarP.addEventListener('click',fnCancelarNuevaP);
//console.log(palabraRandom + " " + palabraOculta);
