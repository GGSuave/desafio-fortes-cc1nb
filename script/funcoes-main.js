function sair() {
	localStorage.clear();
	window.open(`./../`, "_self");
}

function voltar() {
	window.open(`./../`, "_self");
}

function salvar() {
	const verificacao = verificarErro();

	if (verificacao) return;

	window.open("./../", "_self");
}

function verificarErro() {
	const nomeElemento = document.getElementById("event-name").value;
	const dataElemento = document.getElementById("event-date").value;
	const localElemento = document.getElementById("event-location").value;
	const publicoElemento = document.getElementById("attendees").value;

	let erroNome;
	let erroData;
	let erroLocal;
	let erroPublico;

	if (
		nomeElemento == "" ||
		nomeElemento == undefined ||
		nomeElemento == null
	) {
		erroNome = true;

		document.getElementById("erro-name").classList.remove("none");
	}

	if (
		dataElemento == "" ||
		dataElemento == undefined ||
		dataElemento == null
	) {
		erroData = true;

		document.getElementById("erro-date").classList.remove("none");
	}

	if (
		localElemento == "" ||
		localElemento == undefined ||
		localElemento == null
	) {
		erroLocal = true;

		document.getElementById("erro-location").classList.remove("none");
	}

	if (
		publicoElemento == "" ||
		publicoElemento == undefined ||
		publicoElemento == null
	) {
		erroPublico = true;

		document.getElementById("erro-publico").classList.remove("none");
	}

	if (erroNome || erroData || erroLocal || erroPublico) return true;

	return false;
}

function removerErro(id) {
	let erroSpan;

	if (id == "event-name") erroSpan = "erro-name";
	if (id == "event-date") erroSpan = "erro-date";
	if (id == "event-location") erroSpan = "erro-location";
	if (id == "attendees") erroSpan = "erro-publico";

	document.getElementById(erroSpan).classList.add("none");
}
