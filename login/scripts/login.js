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

function verificarErro(email, senha) {
	const emailElemento = document.getElementById("email");
	const senhaElemento = document.getElementById("senha");

	let erroEmail;
	let erroSenha;

	if (email == "" || email == undefined || email == null) {
		let erroEmailElemento = document.getElementById("erro-email");

		erroEmailElemento.classList.remove("none");
		emailElemento.classList.remove(".input-sem-erro");
		emailElemento.classList.add("input-erro");
		erroEmail = true;
	}

	if (senha == "" || senha == undefined || senha == null) {
		let erroSenhaElemento = document.getElementById("erro-senha");

		erroSenhaElemento.classList.remove("none");
		senhaElemento.classList.remove(".input-sem-erro");
		senhaElemento.classList.add("input-erro");
		erroSenha = true;
	}

	if (erroEmail || erroSenha) return true;

	return false;
}

function removerErroEmail() {
	const emailElemento = document.getElementById("email");
	let erroEmailElemento = document.getElementById("erro-email");

	erroEmailElemento.classList.add("none");

	emailElemento.classList.remove("input-erro");
	emailElemento.classList.add("input-sem-erro");
}

function removerErroSenha() {
	const senhaElemento = document.getElementById("senha");

	let erroSenhaElemento = document.getElementById("erro-senha");

	erroSenhaElemento.classList.add("none");

	senhaElemento.classList.remove("input-erro");
	senhaElemento.classList.add("input-sem-erro");
}

function logar() {
	const erroConta = document.getElementById("erro-conta");

	if (!erroConta.classList.contains("none")) {
		erroConta.classList.add("none");
	}

	const email = document.getElementById("email").value;
	const senha = document.getElementById("senha").value;

	let preencheu = verificarErro(email, senha);

	if (preencheu) return;

	let adm = verificarCadastro(email, senha, 0);

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

	erroConta.classList.remove("none");
}

function verificarCadastro(email, senha, user) {
	if (email === dados[user].email && senha == dados[user].senha) {
		return { verificado: true, user: dados[user] };
	}
	return { verificado: false };
}
