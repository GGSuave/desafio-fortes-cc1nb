const logado = localStorage.getItem("logado");
let user;

if (logado == null) {
	window.location.href = "./login/";
} else {
	alert("logado");
	user = JSON.parse(localStorage.getItem("user"));

	window.open(`/${user.tipo}/`, "_self");
}
