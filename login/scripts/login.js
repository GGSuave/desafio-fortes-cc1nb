const dados = [
	{
		tipo: "adm",
		email: "admin@fortes.com.br",
		senha: "123456",
	},
	{
		tipo: "cooperativas",
		email: "cooperativas@fortes.com.br ",
		senha: "123456",
	},
];

function logar() {
	const email = document.getElementById("email").value;
	const senha = document.getElementById("senha").value;

	let adm = verificarCadastro(email, senha, 0);
	debugger;

	if (adm.verificado) {
		window.open("../", "_self");
		localStorage.setItem("logado", adm.verificado);
		localStorage.setItem("user", adm.user);
		return;
	}

	let cooperativa = verificarCadastro(email, senha, 1);

	if (cooperativa.verificado) {
		window.open("../", "_self");
		localStorage.setItem("logado", cooperativa.verificado);
		localStorage.setItem("user", cooperativa.user);
		return;
	}
}

function verificarCadastro(email, senha, user) {
	if (email === dados[user].email && senha == dados[user].senha) {
		return {verificado: true, user: dados[user]};
	}
	return {verificado: false};
}
