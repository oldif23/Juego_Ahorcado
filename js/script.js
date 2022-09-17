let cadena = ['logica','github','estudio','habitos'];
let secreto = Math.round(Math.random()*10);
let palabraRandom;      //cadena[Math.floor(Math.random()*cadena.length)];
let palabraConGuiones;  //palabraRandom.replace(/./g,"_");
const maxErrores = 7;
let intento = 0;
let mostrarFrase = document.querySelector(".frase");
let parrafoMensaje = document.querySelector(".mensaje-alerta");
let mostrarLetrasUsadas = document.querySelector(".letras-usadas");
let botonDesistir = document.querySelector(".desistir-juego");
let botonNuevoJ = document.querySelector(".nuevo-juego");
let letrasUtilizadas = [];
let filtrarUtilizadas = [];
let inputMobil = document.querySelector(".texto-mobil");


//creando el canvas
var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    let numero = 0;  
    pincel.fillStyle = "#E5E5E5";
    pincel.fillRect(0, 0, 1200, 800);


    function funcionLlamadora(){
        agregarPalabra();
        sortearPalabra();
        Enfocar();
    }

    function agregarPalabra(){
        if(localStorage.length > 0 ){  //determinar si en localstore hay alguna palabra almacenada para asi pasarla al arreglo si la hay
            cadena.push(localStorage.getItem("palabra"));
        }
    }

    function sortearPalabra(){
        if(localStorage.length == 1 ){
            palabraRandom = cadena[Math.floor(Math.random()*cadena.length)];
            palabraConGuiones = palabraRandom.replace(/./g,"_ ");
            mostrarFrase.innerHTML = palabraConGuiones;
        } else if(localStorage.length == 0){
            palabraRandom = cadena[Math.floor(Math.random()*cadena.length)];
            palabraConGuiones = palabraRandom.replace(/./g,"_ ");
            mostrarFrase.innerHTML = palabraConGuiones;
        }
        console.log(palabraRandom);
        console.log(palabraRandom + "-" + palabraConGuiones);
    }

    function EnfocarSiempre() {
        setTimeout(() => {
            inputMobil.focus();
        }, 100);
    }


    window.onload = funcionLlamadora;

    let fallo = true;
    let acierto = false;
    let contador;  
    let letraPresionada;
    let evaluarLetraoNumero;
    let booleanaFinalizar = false;

    String.prototype.replaceAt=function(index, character) { 
        return this.substring(0,index) + character + this.substring(index + character.length);}


    inputMobil.addEventListener('input',pasarValorMobil);
    
    let valorMobil;
    let evaluarletraMobil;

    function pasarValorMobil(e){
        valorMobil = e.srcElement.value;
    //     letraPresionada = valorMobil;
    //     evaluarletraMobil = isNaN(valorMobil);
    //     console.log(evaluarletraMobil);
    //     console.log(valorMobil);
    //     if(evaluarletraMobil){
    //         console.log("Valor mobil es: " + valorMobil);
    //         evaluarLetras();
    //         mostrarLetrasPresionadas(valorMobil);
    //         inputMobil.value = '';
    //     } else if(evaluarletraMobil == false){
    //         alert("Presiono un numero, dato invalido");
    //     }
    }

    document.addEventListener("keyup", function   //tecla que se preciona en el documento
    (event){
        
        if(booleanaFinalizar == false /* && inputMobil.value == ""*/){
            // letraPresionada = event.key;
            letraPresionada = valorMobil.toLowerCase();
            evaluarLetraoNumero = isNaN(letraPresionada);
            //console.log(letraPresionada);
            if(evaluarLetraoNumero){
                evaluarLetras();
                inputMobil.value = '';
                mostrarLetrasPresionadas(letraPresionada);  //funcion para mostrar las letras que el usuario ha tecleado
            } else if(evaluarLetraoNumero == false){
                alert("Presiono un numero, dato invalido");
                letraPresionada = ""; /*si se evalua un numero se reinicia las variables*/
                valorMobil = ""; /*si se evalua un numero se reinicia las variables*/
                inputMobil.value = ''; /*si se evalua un numero se reinicia las variables*/

            } 
        }
    })

    //funcion para filtrar, imprimir las letras utilizadas
    function mostrarLetrasPresionadas(letra){
        letrasUtilizadas.push(letra);
        filtrarUtilizadas = [...new Set(letrasUtilizadas)];
        //console.log(filtrarUtilizadas);
        mostrarLetrasUsadas.classList.add("mostrar-letras");
        mostrarLetrasUsadas.innerHTML = ("Las letras que ha usado son: " + filtrarUtilizadas);
    }

    function evaluarLetras(){
        for(let i in palabraRandom){
            if(letraPresionada == palabraRandom[i]){
                alert("Acerto");
                //console.log(palabraRandom[i]);
                palabraConGuiones = palabraConGuiones.replaceAt(i*2,letraPresionada);
                //acierto = true;
                fallo = false;
                }                  
            }

        sumarError(fallo);
        anunciarGano(palabraConGuiones,palabraRandom);
        console.log("reemplazo " + palabraConGuiones);
        //console.log(intento);
        mostrarFrase.innerHTML = palabraConGuiones;
        
    }

    function anunciarGano(palabraConGuiones,palabraRandom){
        if(palabraConGuiones.replace(/\s+/g, '') == palabraRandom){
            parrafoMensaje.classList.add("mensaje-gano");
            mostrarLetrasUsadas.classList.remove("mostrar-letras");
            booleanaFinalizar = true;
            parrafoMensaje.innerHTML = "GANO!! muchas felicidades!!!";
            //alert("Llego al maximo de errores permitidos");
            setTimeout(() => {
                parrafoMensaje.classList.remove("mensaje-perdio");
                location.reload();
            }, 1000);
            //alert("Usted Gano el juego!!!! Felicidades");
        }
    }
    
    //funcion para sumar cuando el usuario no acierta y si excede el maximo de intentos el juego termina
    function sumarError(boolFallo){
        if(boolFallo == true && intento <= 6){
            intento++;
            alert("Fallo, lleva " + intento  + " de 7 intentos");
            dibujarAhorcado(intento);
        }  if(intento == maxErrores){
            parrafoMensaje.classList.add("mensaje-perdio");
            mostrarLetrasUsadas.classList.remove("mostrar-letras");
            booleanaFinalizar = true;
            parrafoMensaje.innerHTML = "PERDIO!! Llego al maximo de errores permitidos";
            //alert("Llego al maximo de errores permitidos");
            setTimeout(() => {
                location.href = "index.html";
            }, 1000);
        }
        fallo = true;
    }

    function fndesistirJuego(){
        parrafoMensaje.classList.add("mensaje-desistio");
        mostrarLetrasUsadas.classList.remove("mostrar-letras");
        mostrarLetrasUsadas.innerHTML = "";
        parrafoMensaje.innerHTML = "Desistio!! La palabra secreta es: " + palabraRandom;

        setTimeout(() => {
            location.href = "index.html";
        }, 300);
    }

    function Enfocar() {
        document.getElementById("enfocarTeclado").focus();
    }

    function fnNuevoJuego(){
        location.reload();
    }
    
    //botones y llamados de funciones
    botonDesistir.addEventListener('click',fndesistirJuego);
    botonNuevoJ.addEventListener('click',fnNuevoJuego);


    //funciones para dibujar el muñeco, segun un contador va dibujando una parte a la vez
    function dibujarBase(){
        //dibujar la base de la horca   
    pincel.beginPath();
    pincel.moveTo(150,250);
    pincel.lineTo(150,50);
    pincel.lineTo(880,50);
    pincel.lineTo(880,750);
    pincel.lineTo(150,750);
    pincel.lineWidth = 6;
    pincel.strokeStyle = "#0A3871";
    pincel.stroke();
    pincel.closePath();
    }

    function dibujarCabeza(){
    pincel.beginPath();
    pincel.arc(150, 310, 60, 0, Math.PI * 2);
    pincel.lineWidth = 5;
    pincel.stroke();
    pincel.closePath();
    }

    function dibujarTorso(){
    pincel.beginPath();
    pincel.moveTo(150,370);
    pincel.lineTo(150,480);
    pincel.lineWidth = 5;
    pincel.stroke();
    pincel.closePath();
    }

    function dibujarBrazoIzquierdo(){
    pincel.beginPath();
    pincel.moveTo(120,440);
    pincel.lineTo(150,368);
    pincel.lineWidth = 5;
    pincel.stroke();
    pincel.closePath();
    }


    function dibujarBrazoDerecho(){
    pincel.moveTo(150,370);
    pincel.lineTo(180,438);
    pincel.lineWidth = 5;
    pincel.stroke();
    pincel.closePath();
    }

    function dibujarPiernaIzquierda(){
    pincel.beginPath();
    pincel.moveTo(120,550);
    pincel.lineTo(150,478);
    pincel.lineWidth = 5;
    pincel.stroke();
    pincel.closePath();
    }

    function dibujarPiernaDerecha(){
    pincel.moveTo(150,482)
    pincel.lineTo(180,550);
    pincel.lineWidth = 5;
    pincel.stroke();
    pincel.closePath();
    }

    function dibujarAhorcado(intento){
        if(intento == 1){
            dibujarBase();    
            }
        
            else if(intento == 2){
                dibujarBase();
                dibujarCabeza();
            }
        
            else if(intento == 3){
                dibujarBase();
                dibujarCabeza();
                dibujarTorso();
            }
            
            else if(intento == 4){
                dibujarBase();
                dibujarCabeza();
                dibujarTorso();
                dibujarBrazoIzquierdo();
            }
            
        
            else if(intento == 5){
                dibujarBase();
                dibujarCabeza();
                dibujarTorso();
                dibujarBrazoIzquierdo();
                dibujarBrazoDerecho();
            }
        
            else if(intento == 6){
                dibujarBase();
                dibujarCabeza();
                dibujarTorso();
                dibujarBrazoIzquierdo();
                dibujarBrazoDerecho();
                dibujarPiernaIzquierda();
            }
        
            else if(intento == 7){
                dibujarBase();
                dibujarCabeza();
                dibujarTorso();
                dibujarBrazoIzquierdo();
                dibujarBrazoDerecho();
                dibujarPiernaIzquierda();
                dibujarPiernaDerecha();
            }
    }

    


