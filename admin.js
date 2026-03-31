let numerosDisponibles=[];
let numerosCantados=[];


// seguridad básica
let clave="1234";

let acceso=prompt("Clave admin");

if(acceso!==clave){

document.body.innerHTML="Acceso denegado";

}



// crear tablero visual
function crearTablero(){

let tablero=document.getElementById("tablero");

tablero.innerHTML="";

// letras
let letras=["B","I","N","G","O"];

letras.forEach(l=>{

let head=document.createElement("div");

head.className="letra";

head.innerText=l;

tablero.appendChild(head);

});

// números
for(let i=1;i<=75;i++){

let cell=document.createElement("div");

cell.className="bola";

cell.id="n"+i;

cell.innerText=i;

tablero.appendChild(cell);

}

}



// iniciar partida
function iniciarPartida(){

numerosDisponibles=[];

numerosCantados=[];

for(let i=1;i<=75;i++){

numerosDisponibles.push(i);

}

crearTablero();

document.getElementById("ultimoNumero").innerText="-";

}



// cantar número aleatorio
async function cantarNumero(){

if(numerosDisponibles.length==0){

alert("Ya no hay números");

return;

}

// animación previa
for(let i=0;i<15;i++){

let fake=Math.floor(Math.random()*75)+1;

mostrarUltimo(fake);

await esperar(50);

}

// número real
let index=Math.floor(Math.random()*numerosDisponibles.length);

let numero=numerosDisponibles.splice(index,1)[0];

numerosCantados.push(numero);

marcarNumero(numero);

mostrarUltimo(numero);

}

function marcarNumero(numero){

document

.getElementById("n"+numero)

.classList.add("activo");

}


function mostrarUltimo(numero){

let ultimo=document.getElementById("ultimoNumero");

ultimo.innerText=numero;

ultimo.classList.add("animar");

setTimeout(()=>{

ultimo.classList.remove("animar");

},300);

}


function esperar(ms){

return new Promise(r=>setTimeout(r,ms));

}


// reiniciar
function reiniciarNumeros(){

numerosDisponibles=[];

numerosCantados=[];

crearTablero();

document.getElementById("ultimoNumero").innerText="-";

}



// crear tablero al cargar
window.onload=crearTablero;


//verificar ganador
async function verificarGanador(){

let codigo=document.getElementById("codigoGanador").value;

let url=scriptURL+"?codigo="+codigo;

let res=await fetch(url);

let data=await res.json();

if(!data.cartilla){

alert("Código no encontrado");

return;

}

let ganador=verificarBingo(data.cartilla);

document.getElementById("resultadoVerificacion")

.innerText=

ganador

? "🎉 BINGO válido"

: "❌ No cumple patrón";

}



//logica

function verificarBingo(cartilla){

// filas
for(let r=0;r<5;r++){

let ok=true;

for(let c=0;c<5;c++){

let n=cartilla[c][r];

if(n!="FREE" && !numerosCantados.includes(n))

ok=false;

}

if(ok) return true;

}


// columnas
for(let c=0;c<5;c++){

let ok=true;

for(let r=0;r<5;r++){

let n=cartilla[c][r];

if(n!="FREE" && !numerosCantados.includes(n))

ok=false;

}

if(ok) return true;

}


// diagonales

let diag1=true;

let diag2=true;

for(let i=0;i<5;i++){

if(cartilla[i][i]!="FREE" && !numerosCantados.includes(cartilla[i][i]))

diag1=false;


if(cartilla[i][4-i]!="FREE" && !numerosCantados.includes(cartilla[i][4-i]))

diag2=false;

}

return diag1 || diag2;

}

//gurada data

fetch(scriptURL,{
method:"POST",
body:JSON.stringify({
nombre,
partida,
codigo,
cartilla
})
});