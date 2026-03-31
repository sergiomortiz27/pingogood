const scriptURL="https://script.google.com/macros/s/AKfycbwHMSoz1v8yzpkY-2W1IL8wNq-CFb_psYDib7nNkpQMUiXzsEH94xtUzx4SMGsfPxO_/exec";


let historialCartillas=[];



function obtenerPartidaActiva(){

return {

id:"PG-2026-001",

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

}




function generarCartillas(btn){

// evitar múltiples clics
if(btn.disabled) return;

// bloquear botón
btn.disabled = true;
btn.innerText = "Generando cartillas...";

document.getElementById("cards").innerHTML="";

let nombre=document.getElementById("playerName").value;
let cantidad=document.getElementById("numCards").value;

for(let i=0;i<cantidad;i++){

crearCartilla(nombre);

}

// cambiar texto final
btn.innerText="Cartillas generadas ✔";

}




function crearCartilla(nombre){

let partida=obtenerPartidaActiva().id;


let card=generarBingoUnico();


let code=generarCodigo(partida);


let div=document.createElement("div");

div.className="card";


div.innerHTML=`

<div class="mini-logo">
<img src="img/pingogood.svg" alt="PINGOGoog">
</div>

<p class="tagline">

play • win • enjoy

</p>


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


document.getElementById("cards")

.appendChild(div);


guardar(nombre,partida,code,card);

}



//envio de data
function guardar(nombre,partida,code,card){

const data = new URLSearchParams();

data.append("nombre", nombre);
data.append("partida", partida);
data.append("codigo", code);
data.append("cartilla", JSON.stringify(card));
data.append("estado", "PAGADO");

fetch(scriptURL, {
method: "POST",
body: data
})
.then(() => console.log("enviado"))
.catch(err => console.error(err));

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



