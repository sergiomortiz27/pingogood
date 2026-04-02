const scriptURL="https://script.google.com/macros/s/AKfycbwHMSoz1v8yzpkY-2W1IL8wNq-CFb_psYDib7nNkpQMUiXzsEH94xtUzx4SMGsfPxO_/exec";


let historialCartillas=[];



function obtenerPartidaActiva(){

return {

id:"PG-2026-03",

precio:5

};

}



function mostrarPago(){

let nombre=document.getElementById("playerName").value;

let cantidad=document.getElementById("numCards").value;


if(nombre=="" || cantidad<1){

alert("Completa los datos");

return;

}


let partida=obtenerPartidaActiva();

let total=cantidad*partida.precio;


document.getElementById("montoTotal")

.innerHTML="S/ "+total;


document.getElementById("detallePago")

.innerHTML=

cantidad+" cartilla(s) × S/ "+partida.precio;


document

.getElementById("paymentPanel")

.classList.remove("hidden");

}



function limpiar(){

document.getElementById("playerName").value="";
document.getElementById("numCards").value=1;
document.getElementById("cards").innerHTML="";
document.getElementById("paymentPanel").classList.add("hidden");

// 🔥 REACTIVAR BOTÓN AQUÍ
const btn = document.getElementById("btnGenerar");
btn.disabled = false;
btn.innerText = "Ya pagué, generar cartillas";

}




function generarCartillas(btn){

if(btn.disabled) return;

btn.disabled = true;
btn.innerText = "Generando cartillas...";

document.getElementById("cards").innerHTML="";

let nombre=document.getElementById("playerName").value;
let cantidad=document.getElementById("numCards").value;
let partida=obtenerPartidaActiva().id;

let todasLasCartillas = [];

for(let i=0;i<cantidad;i++){

  let card = generarBingoUnico();
  let code = generarCodigo(partida);

  // 🔥 SOLO UI
  crearCartillaVisual(nombre, partida, code, card);

  // 🔥 SOLO DATA
  todasLasCartillas.push({
    nombre,
    partida,
    codigo: code,
    cartilla: card,
    estado: "PAGADO"
  });

}

// 🔥 ENVÍO
guardarTodas(todasLasCartillas);

btn.innerText="Cartillas generadas ✔";

}








function crearCartillaVisual(nombre, partida, code, card){

let div=document.createElement("div");
div.className="card";

div.innerHTML=`

<div class="mini-logo">
<img src="img/pingogood.svg">
</div>

<p class="tagline">play • win • enjoy</p>

<div class="grid">

<div class="cell header">P</div>
<div class="cell header">I</div>
<div class="cell header">N</div>
<div class="cell header">G</div>
<div class="cell header">O</div>

${generarCeldas(card)}

</div>

<div class="code">
⭐ Código: ${code} ⭐
</div>

<button onclick="descargar(this)">
Descargar
</button>

`;

document.getElementById("cards").appendChild(div);

}



//envio de data modo de lista

function guardarTodas(lista){

const form = document.createElement("form");

form.method = "POST";
form.action = scriptURL;
form.target = "hidden_iframe";

const input = document.createElement("input");
input.type = "hidden";
input.name = "data";
input.value = JSON.stringify(lista);

form.appendChild(input);

document.body.appendChild(form);
form.submit();

setTimeout(() => {
  document.body.removeChild(form);
}, 2000);

}


/* funcion guardar antigua, luego quitar */

function guardar(nombre,partida,code,card){

const form = document.createElement("form");

form.method = "POST";
form.action = scriptURL;
form.target = "hidden_iframe";

function addField(name, value){
const input = document.createElement("input");
input.type = "hidden";
input.name = name;
input.value = value;
form.appendChild(input);
}

addField("nombre", nombre);
addField("partida", partida);
addField("codigo", code);
addField("cartilla", JSON.stringify(card));
addField("estado", "PAGADO");

document.body.appendChild(form);
form.submit();

// ⏱️ limpiar iframe (evita error 403 visible)
setTimeout(() => {
document.querySelector('iframe[name="hidden_iframe"]').src = "about:blank";
}, 1500);

// ⏱️ eliminar form después (no antes)
setTimeout(() => {
document.body.removeChild(form);
}, 2000);

}



function generarCodigo(partida){

let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let random="";


for(let i=0;i<6;i++){

random+=chars.charAt(

Math.floor(Math.random()*chars.length)

);

}


return `${partida}-${random}`;

}



function generarBingoUnico(){

let card;


do{

card=generarBingo();

}

while(

historialCartillas.includes(

JSON.stringify(card)

)

);


historialCartillas.push(

JSON.stringify(card)

);


return card;

}



function generarBingo(){

let rangos=[

[1,15],

[16,30],

[31,45],

[46,60],

[61,75]

];


let card=[];


for(let c=0;c<5;c++){

let nums=[];


while(nums.length<5){

let n=rand(

rangos[c][0],

rangos[c][1]

);


if(!nums.includes(n))

nums.push(n);

}


card.push(nums);

}


card[2][2]="FREE";


return card;

}



function generarCeldas(card){

let html="";


for(let r=0;r<5;r++){

for(let c=0;c<5;c++){

html+=`<div class="cell">

${card[c][r]}

</div>`;

}

}


return html;

}



function rand(min,max){

return Math.floor(

Math.random()*(max-min+1)

)+min;

}



function descargar(btn){

let card = btn.parentElement;

html2canvas(card,{
scale:3, // aumenta resolución
useCORS:true,
backgroundColor:null,
scrollY:-window.scrollY
})

.then(canvas=>{

let link=document.createElement("a");

link.download="cartilla_pingogoog.png";

link.href=canvas.toDataURL("image/png",1);

link.click();

});

}


function crearParticulas(){
  const container = document.getElementById("particles");

  for(let i=0;i<40;i++){
    let p = document.createElement("div");
    p.className="particle";

    p.style.left = Math.random()*100 + "vw";
    p.style.animationDuration = (6 + Math.random()*6) + "s";
    p.style.opacity = Math.random();

    container.appendChild(p);
  }
}

// 🔥 SIEMPRE AL FINAL
document.addEventListener("DOMContentLoaded", ()=>{

  crearParticulas();

  document.addEventListener("mousemove", (e)=>{

    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;

  });

});



