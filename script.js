const divData = document.getElementById("div-data");
const divRelogio = document.getElementById("div-relogio");
const btnAtivar = document.getElementById("btn-ativar");
const btnParar = document.getElementById("btn-parar");
const tmpAlarme = document.getElementById("tmp-alarme");
const horaAlarme = document.getElementById("hora-alarme");
const timer = document.getElementById("timer");

const somAlarme = new Audio("som/alarme.mp3");
somAlarme.loop = 1;

let tsAtual = null;
let tsAlarme = null;
let alarmeAtivado = false;
let alarmeTocando = false;

btnAtivar.addEventListener("click", () => {
  tsAtual = Date.now();
  tsAlarme = tsAtual + tmpAlarme.value * 1000;
  alarmeAtivado = true;
  const dtAlarme = new Date(tsAlarme);
  let hora = dtAlarme.getHours();
  hora = hora < 10 ? "0" + hora : hora;
  let minutos = dtAlarme.getMinutes();
  minutos = minutos < 10 ? "0" + minutos : minutos;
  let segundos = dtAlarme.getSeconds();
  segundos = segundos < 10 ? "0" + segundos : segundos;
  horaAlarme.innerHTML = `Hora do Alarme: ${hora}:${minutos}:${segundos}`;
});
btnParar.addEventListener("click", () => {
  alarmeAtivado = false;
  alarmeTocando = false;
  horaAlarme.innerHTML = "Hora do Alarme:";
  tmpAlarme.value = 0;
  somAlarme.pause();
  somAlarme.currentTime = 0;
  timer.classList.remove("ativo");
});

const data = new Date();

function exibeData() {
  let dia = data.getDate();
  dia = dia < 10 ? "0" + dia : dia;
  let mes = data.getMonth() + 1;
  mes = mes < 10 ? "0" + mes : mes;
  const dataCompleta = `${dia}/${mes}/${data.getFullYear()}`;
  divData.innerHTML = dataCompleta;
}
function exibeRelogio() {
  const data = new Date();
  let hora = data.getHours();
  hora = hora < 10 ? "0" + hora : hora;
  let minuto = data.getMinutes();
  minuto = minuto < 10 ? "0" + minuto : minuto;
  let segundo = data.getSeconds();
  segundo = segundo < 10 ? "0" + segundo : segundo;
  const horaCompleta = `${hora}:${minuto}:${segundo}`;
  divRelogio.innerHTML = horaCompleta;
  if (alarmeAtivado && !alarmeTocando) {
    if (data.getTime() >= tsAlarme) {
      alarmeTocando = true;
      timer.classList.add("ativo");
      somAlarme.play();
    }
  }
}
const intevalo = setInterval(exibeRelogio, 100);

exibeData();
