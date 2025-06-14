let mapa;
let datagrid;
let btnMapa;
let btnColetas;

function abrirMapa() {
	pegarElementos();

	mapa.classList.remove("none");
	datagrid.classList.add("none");
	btnColetas.classList.remove("selecionado");
	btnMapa.classList.add("selecionado");

	localStorage.setItem("ultimaAba", "mapa");
}

function pegarElementos() {
	mapa = document.getElementById("mapa");
	datagrid = document.getElementById("datagrid");

	btnColetas = document.getElementById("coletas");
	btnMapa = document.getElementById("mapasBtn");
}

function abrirColeta() {
	pegarElementos();

	mapa.classList.add("none");
	datagrid.classList.remove("none");
	btnColetas.classList.add("selecionado");
	btnMapa.classList.remove("selecionado");

	localStorage.setItem("ultimaAba", "coleta");
}

let ultimaAba = localStorage.getItem("ultimaAba");

if (ultimaAba == "mapa") abrirMapa();
else abrirColeta();
