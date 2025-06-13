const logado = localStorage.getItem("logado");
let user;

if (logado == null) {
	window.location.href = "./login/";
} else {
	user = JSON.parse(localStorage.getItem("user"));

	window.open(`${location.origin}/${user.tipo}/`, "_self");
}
