const logado = localStorage.getItem("logado");
let user;

let dados = [
	{
		nome: "Garrafa PET",
		tipoMaterial: "Plástico",
		codigoIdentificacao: "PET 1",
		cor: "Transparente",
		estadoFisico: "Sólido",
		limpezaRecomendada: "Enxaguar para remover resíduos",
		compressivel: true,
		observacoes:
			"Remover tampas e rótulos (se possível). Tampas de plástico podem ser recicladas separadamente.",
	},
	{
		nome: "Lata de Refrigerante",
		tipoMaterial: "Metal",
		codigoIdentificacao: "ALUMÍNIO (ALU)",
		cor: "Variada (Colorida)",
		estadoFisico: "Sólido",
		limpezaRecomendada: "Enxaguar para remover resíduos de bebida",
		compressivel: true,
		observacoes:
			"Amassar para otimizar espaço de armazenamento. Não precisa remover rótulos finos.",
	},
];

if (logado == null) {
	window.location.href = "./login/";
} else {
	user = JSON.parse(localStorage.getItem("user"));

	localStorage.setItem("dadosCadastrados", JSON.stringify(dados));

	if (user.tipo == "adm") window.location.href = "./adm/";
}
