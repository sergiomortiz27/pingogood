//Login Tokens
const API_URL = "https://script.google.com/macros/s/AKfycbwHMSoz1v8yzpkY-2W1IL8wNq-CFb_psYDib7nNkpQMUiXzsEH94xtUzx4SMGsfPxO_/exec";

async function login(){

  const pass = document.getElementById("adminPass").value;
  const error = document.getElementById("loginError");

  error.innerText = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      mode: "cors", // Importante
      body: new URLSearchParams({
        login: 1,
        password: pass
      })
    });

    const data = await res.json();

    if(data.success){

      localStorage.setItem("token", data.token);
      mostrarPanel();

    }else{
      error.innerText = "Clave incorrecta";
    }

  }catch(e){
    error.innerText = "Error de conexión";
  }
}


// Validar Sesion al Ingresar
document.addEventListener("DOMContentLoaded", ()=>{

  const token = localStorage.getItem("token");

  if(token){
    mostrarPanel();
    crearTablero();
    iniciarJuego();
  }else{
    mostrarLogin();
  }

});

// Mostrar - Ocultar
function mostrarLogin(){
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("adminPanel").style.display = "none";
}


// Logout
function logout(){
  localStorage.removeItem("token");
  location.reload();
}


function mostrarPanel(){
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";

  crearTablero();
  iniciarJuego();
}


// Variables
let modo = "manual";
let numeros = [];
let usados = [];


// 🔀 cambiar modo
function setModo(m){
  modo = m;
  alert("Modo: " + m);
}


// ▶️ iniciar juego
function iniciarJuego(){
  crearTablero();

  numeros = Array.from({length:75}, (_,i)=>i+1);
  usados = [];

  document.getElementById("bigNumber").innerText = "--";

  document.querySelectorAll(".bola").forEach(b=>{
    b.classList.remove("activo");
  });


  // 🔥 OCULTAR PREVIEWCARTILLA
  const preview = document.getElementById("previewCartilla");
  preview.classList.add("hidden");
  preview.innerHTML = ""; // limpia contenido

}


// 🔄 reiniciar
function reiniciar(){
  if(confirm("¿Reiniciar partida?")){
    iniciarJuego();
  }
}


// 🎲 automático
function cantarNumero(){

  if(modo === "manual"){
    alert("Estás en modo manual");
    return;
  }

  if(numeros.length === 0){
    alert("Fin del juego");
    return;
  }

  const big = document.getElementById("bigNumber");

  let contador = 0;

  big.classList.add("animando");

  const anim = setInterval(()=>{

    const random = Math.floor(Math.random()*75)+1;
    big.innerText = random;

    contador++;

    if(contador > 15){

      clearInterval(anim);

      big.classList.remove("animando");

      const index = Math.floor(Math.random() * numeros.length);
      const num = numeros.splice(index,1)[0];

      usados.push(num);

      marcar(num);
    }

  }, 60);
}


// 🖐️ manual
function clickBola(num){

  if(modo !== "manual") return;

  const index = usados.indexOf(num);
  const bola = document.getElementById("bola-"+num);

  // 🔁 SI YA ESTÁ MARCADO → DESMARCAR
  if(index !== -1){

    usados.splice(index,1); // quitar del array

    if(bola){
      bola.classList.remove("activo");
    }

    // opcional: limpiar número grande
    document.getElementById("bigNumber").innerText = "--";

    return;
  }

  // ✅ SI NO ESTÁ → MARCAR
  usados.push(num);
  marcar(num);
}

// 🔥 marcar número
function marcar(num){

  document.getElementById("bigNumber").innerText = num;

  const bola = document.getElementById("bola-"+num);

  if(bola){
    bola.classList.add("activo");
  }

}

// 🎱 crear tablero
function crearTablero(){

  const letras = {
    B: [1,15],
    I: [16,30],
    N: [31,45],
    G: [46,60],
    O: [61,75]
  };

  Object.keys(letras).forEach(l=>{

    const cont = document.getElementById("col-"+l);
    cont.innerHTML = "";

    for(let i=letras[l][0]; i<=letras[l][1]; i++){

      const div = document.createElement("div");

      div.className = "bola";
      div.id = "bola-"+i;
      div.innerText = i;

      div.onclick = ()=>clickBola(i);

      cont.appendChild(div);
    }

  });

}

// 🧾 verificador (valida codigo de cartilla)
async function verificarCartilla(){

  const codigo = document.getElementById("codigoCartilla").value.trim();

  if(!codigo){
    alert("Ingrese código");
    return;
  }

  try{

    // 🔐 Tokens + Acceso
    const token = localStorage.getItem("token");

    const url = "https://script.google.com/macros/s/AKfycbwHMSoz1v8yzpkY-2W1IL8wNq-CFb_psYDib7nNkpQMUiXzsEH94xtUzx4SMGsfPxO_/exec"
      + "?codigo=" + codigo + "&token=" + token;

    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow' // Indispensable para Apps Script
    });
    const data = await res.json();

    // 🔥 SI NO AUTORIZADO
    if(data.error){
      alert("🔒 Sesión inválida, vuelve a iniciar sesión");
      logout();
      return;
    }

    if(!data.encontrado){
      alert("❌ Cartilla no encontrada");
      return;
    }

     // Validamos que exista la cartilla 
    if(!data.cartilla) {
      alert("❌ Error: Los datos de la cartilla están vacíos en Excel");
      return;
    }
    const matriz = JSON.parse(data.cartilla);
    mostrarCartilla(matriz);

    const resultado = verificarPatrones(matriz);
    if(resultado){
      alert("🎉 GANADOR: " + resultado);
    }else{
      alert("❌ No cumple patrón ganador");
    }

  }catch(err){
    console.error(err);
    alert("Error al verificar");
  }

}


// 🧾 vizualiza la cartilla seleccionada
function mostrarCartilla(matriz){

  const cont = document.getElementById("previewCartilla");

  cont.classList.remove("hidden");

  let html = `
    <div class="cartilla-preview">
      <div class="cartilla-grid">
        <div class="header-preview">B</div>
        <div class="header-preview">I</div>
        <div class="header-preview">N</div>
        <div class="header-preview">G</div>
        <div class="header-preview">O</div>
  `;

  matriz.forEach(fila=>{
    fila.forEach(valor=>{

      let activo = "";

      if(valor === "FREE" || usados.includes(valor)){
        activo = "activo";
      }

      html += `<div class="cell-preview ${activo}">${valor}</div>`;
    });
  });

  html += `</div></div>`;

  cont.innerHTML = html;
}





// Detecta Patrones
function verificarPatrones(m){

  // convertir FREE a marcado
  const check = m.map(fila =>
    fila.map(v => v === "FREE" || usados.includes(v))
  );

  // 🔴 HORIZONTALES
  for(let i=0;i<5;i++){
    if(check[i].every(v=>v)) return "Línea horizontal";
  }

  // 🔵 VERTICALES
  for(let j=0;j<5;j++){
    if(check.every(f=>f[j])) return "Línea vertical";
  }

  // 🔶 DIAGONAL 1
  if([0,1,2,3,4].every(i => check[i][i])){
    return "Diagonal ↘";
  }

  // 🔶 DIAGONAL 2
  if([0,1,2,3,4].every(i => check[i][4-i])){
    return "Diagonal ↙";
  }

  return null;
}



function limpiarVerificador(){

  // 🔥 limpiar input
  document.getElementById("codigoCartilla").value = "";

  // 🔥 ocultar preview
  const preview = document.getElementById("previewCartilla");
  preview.classList.add("hidden");
  preview.innerHTML = "";

}


