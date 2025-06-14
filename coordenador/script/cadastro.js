let modoEdicao = false
let eventoEditandoId = null

document.addEventListener("DOMContentLoaded", () => {
  verificarModoEdicao()
  configurarEventListeners()
  atualizarResumo()
})

function verificarModoEdicao() {
  const urlParams = new URLSearchParams(window.location.search)
  const editId = urlParams.get("edit")

  if (editId) {
    modoEdicao = true
    eventoEditandoId = Number.parseInt(editId)
    carregarDadosEvento(eventoEditandoId)

    // Atualizar título da página
    document.querySelector(".header-title").textContent = "Editar Evento"
    document.querySelector(".header-description").textContent = "Edite as informações do evento"
    document.getElementById("publishEventBtn").innerHTML = `
            <img src="./../img/icon/save.svg" alt="Salvar" class="icon-sm icon-white" />
            Salvar Alterações
        `
  }
}

function carregarDadosEvento(id) {
  const evento = eventosCRUD.getEventoPorId(id)
  if (!evento) {
    alert("Evento não encontrado!")
    window.location.href = "./index.html"
    return
  }

  // Preencher formulário com dados do evento
  document.getElementById("event-name").value = evento.nome || ""
  document.getElementById("event-type").value = evento.tipo || ""
  document.getElementById("event-date").value = evento.data || ""
  document.getElementById("event-time").value = evento.horario || ""
  document.getElementById("event-location").value = evento.local || ""
  document.getElementById("attendees").value = evento.publicoEstimado || ""
  document.getElementById("duration").value = evento.duracao || ""
  document.getElementById("description").value = evento.descricao || ""
  document.getElementById("collection-date").value = evento.dataColeta || ""
  document.getElementById("collection-time").value = evento.horarioColeta || ""
  document.getElementById("special-instructions").value = evento.instrucoes || ""
}

// Configurar event listeners
function configurarEventListeners() {
  // Atualizar resumo quando campos mudarem
  const campos = ["event-name", "event-date", "attendees"]
  campos.forEach((campo) => {
    const elemento = document.getElementById(campo)
    if (elemento) {
      elemento.addEventListener("input", atualizarResumo)
      elemento.addEventListener("change", atualizarResumo)
    }
  })
}

function atualizarResumo() {
  const nome = document.getElementById("event-name")?.value || ""
  const data = document.getElementById("event-date")?.value || ""
  const participantes = document.getElementById("attendees")?.value || ""

  // Atualizar elementos do resumo
  const summaryDate = document.getElementById("summaryDate")
  const summaryAttendees = document.getElementById("summaryAttendees")
  const summaryTotalWaste = document.getElementById("summaryTotalWaste")

  if (summaryDate) {
    summaryDate.textContent = data ? formatarData(data) : "Não definida"
  }

  if (summaryAttendees) {
    summaryAttendees.textContent = participantes ? `${participantes} pessoas` : "Não definido"
  }

  if (summaryTotalWaste) {
    const residuosEstimados = participantes ? eventosCRUD.calcularResiduosEstimados(Number.parseInt(participantes)) : 0
    summaryTotalWaste.textContent = `${residuosEstimados}kg`
  }
}

function salvarEvento() {
  if (!validarFormulario()) {
    return
  }

  const dadosEvento = coletarDadosFormulario()

  try {
    if (modoEdicao && eventoEditandoId) {
      const eventoAtualizado = eventosCRUD.atualizarEvento(eventoEditandoId, dadosEvento)
      if (eventoAtualizado) {
        alert("Evento atualizado com sucesso!")
        window.location.href = "./index.html"
      } else {
        alert("Erro ao atualizar evento!")
      }
    } else {
      const novoEvento = eventosCRUD.criarEvento(dadosEvento)
      if (novoEvento) {
        alert("Evento criado com sucesso!")
        window.location.href = "./index.html"
      } else {
        alert("Erro ao criar evento!")
      }
    }
  } catch (error) {
    console.error("Erro ao salvar evento:", error)
    alert("Erro ao salvar evento. Tente novamente.")
  }
}

function coletarDadosFormulario() {
  return {
    nome: document.getElementById("event-name").value.trim(),
    tipo: document.getElementById("event-type").value,
    data: document.getElementById("event-date").value,
    horario: document.getElementById("event-time").value,
    local: document.getElementById("event-location").value.trim(),
    publicoEstimado: Number.parseInt(document.getElementById("attendees").value) || 0,
    duracao: Number.parseInt(document.getElementById("duration").value) || 0,
    descricao: document.getElementById("description").value.trim(),
    dataColeta: document.getElementById("collection-date").value,
    horarioColeta: document.getElementById("collection-time").value,
    instrucoes: document.getElementById("special-instructions").value.trim(),
  }
}

function validarFormulario() {
  const camposObrigatorios = [
    { id: "event-name", erro: "erro-name", mensagem: "Nome é obrigatório!" },
    { id: "event-date", erro: "erro-date", mensagem: "Data é obrigatória!" },
    { id: "event-location", erro: "erro-location", mensagem: "Local é obrigatório!" },
    { id: "attendees", erro: "erro-publico", mensagem: "Público é obrigatório!" },
  ]

  let temErro = false

  // Limpar erros anteriores
  camposObrigatorios.forEach((campo) => {
    const erroElemento = document.getElementById(campo.erro)
    if (erroElemento) {
      erroElemento.classList.add("none")
    }
  })

  // Validar campos
  camposObrigatorios.forEach((campo) => {
    const elemento = document.getElementById(campo.id)
    const valor = elemento?.value?.trim()

    if (!valor) {
      const erroElemento = document.getElementById(campo.erro)
      if (erroElemento) {
        erroElemento.textContent = campo.mensagem
        erroElemento.classList.remove("none")
      }
      temErro = true
    }
  })

  // Validar se o público é um número válido
  const publicoElemento = document.getElementById("attendees")
  const publico = Number.parseInt(publicoElemento?.value)
  if (publicoElemento?.value && (isNaN(publico) || publico <= 0)) {
    const erroElemento = document.getElementById("erro-publico")
    if (erroElemento) {
      erroElemento.textContent = "Público deve ser um número maior que zero!"
      erroElemento.classList.remove("none")
    }
    temErro = true
  }

  return !temErro
}

function salvarRascunho() {
  const dadosEvento = coletarDadosFormulario()
  dadosEvento.status = "rascunho"

  try {
    if (modoEdicao && eventoEditandoId) {
      eventosCRUD.atualizarEvento(eventoEditandoId, dadosEvento)
    } else {
      eventosCRUD.criarEvento(dadosEvento)
    }
    alert("Rascunho salvo com sucesso!")
  } catch (error) {
    console.error("Erro ao salvar rascunho:", error)
    alert("Erro ao salvar rascunho.")
  }
}

// Sobrescrever funções globais
function salvar() {
  salvarEvento()
}

function removerErro(id) {
  let erroSpan

  if (id === "event-name") erroSpan = "erro-name"
  if (id === "event-date") erroSpan = "erro-date"
  if (id === "event-location") erroSpan = "erro-location"
  if (id === "attendees") erroSpan = "erro-publico"

  const erroElemento = document.getElementById(erroSpan)
  if (erroElemento) {
    erroElemento.classList.add("none")
  }
}
