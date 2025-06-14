import { eventosCRUD, formatarStatus, formatarData } from "./modules/eventos.js"

function carregarEventos() {
  const eventos = eventosCRUD.getEventos()
  const listaEventos = document.getElementById("datagrid-list")

  if (!listaEventos) return

  listaEventos.innerHTML = ""

  eventos.forEach((evento) => {
    const statusInfo = formatarStatus(evento.status)
    const dataFormatada = formatarData(evento.data)

    const li = document.createElement("li")
    li.className = "flex datagrid-item"
    li.innerHTML = `
            <div class="datagrid-icon-div">
                <img src="./../img/icon/calendr.svg" alt="Ícone de Calendário" />
            </div>
            <div class="datagrid-details">
                <h4>${evento.nome}</h4>
                <div class="datagrid-info-line">
                    <img src="./../img/icon/clock.svg" alt="Hora" class="info-icon" />
                    <span>${dataFormatada}</span>
                </div>
                <div class="datagrid-info-line">
                    <img src="./../img/icon/map-pin.svg" alt="Local" class="info-icon" />
                    <span>${evento.local}</span>
                </div>
                <div class="datagrid-info-line">
                    <img src="./../img/icon/users.svg" alt="Pessoas" class="info-icon" />
                    <span>${evento.publicoEstimado} pessoas</span>
                </div>
            </div>
            <div class="datagrid-metrics">
                <h4>${evento.residuosEstimados}Kg</h4>
                <span>estimativa</span>
            </div>
            <div class="datagrid-status">
                <span class="${statusInfo.classe}">${statusInfo.texto}</span>
            </div>
            <div class="datagrid-actions">
                <button onclick="editarEvento(${evento.id})" class="btn-acao btn-editar">
                    <img src="./../img/icon/edit.svg" alt="Editar" class="icon-acao" />
                </button>
                <button onclick="excluirEvento(${evento.id})" class="btn-acao btn-excluir">
                    <img src="./../img/icon/trash.svg" alt="Excluir" class="icon-acao" />
                </button>
            </div>
        `

    listaEventos.appendChild(li)
  })
}

function carregarEstatisticas() {
  const stats = eventosCRUD.getEstatisticas()

  // Atualizar cards de estatísticas
  const elementos = {
    eventosAtivos: document.querySelector(".cards:nth-child(1) h3"),
    residuosColetados: document.querySelector(".cards:nth-child(2) h3"),
    participantes: document.querySelector(".cards:nth-child(3) h3"),
    mediaParticipantes: document.querySelector(".cards:nth-child(3) .subiu"),
  }

  if (elementos.eventosAtivos) elementos.eventosAtivos.textContent = stats.eventosAtivos
  if (elementos.residuosColetados) elementos.residuosColetados.textContent = `${stats.totalResiduos}kg`
  if (elementos.participantes) elementos.participantes.textContent = stats.totalParticipantes
  if (elementos.mediaParticipantes)
    elementos.mediaParticipantes.textContent = `Média de ${stats.mediaParticipantesPorEvento}/evento`
}

function editarEvento(id) {
  const evento = eventosCRUD.getEventoPorId(id)
  if (!evento) {
    alert("Evento não encontrado!")
    return
  }

  localStorage.setItem("editandoEventoId", id)

  window.location.href = "./cadastro.html?edit=" + id
}

function excluirEvento(id) {
  const evento = eventosCRUD.getEventoPorId(id)
  if (!evento) {
    alert("Evento não encontrado!")
    return
  }

  if (confirm(`Tem certeza que deseja excluir o evento "${evento.nome}"?`)) {
    const sucesso = eventosCRUD.excluirEvento(id)
    if (sucesso) {
      alert("Evento excluído com sucesso!")
      carregarEventos()
      carregarEstatisticas()
    } else {
      alert("Erro ao excluir evento!")
    }
  }
}

function buscarEventos() {
  const termo = document.getElementById("busca-eventos")?.value || ""
  const eventos = termo ? eventosCRUD.buscarEventos(termo) : eventosCRUD.getEventos()

  const listaEventos = document.getElementById("datagrid-list")
  if (!listaEventos) return

  listaEventos.innerHTML = ""

  if (eventos.length === 0) {
    listaEventos.innerHTML = '<li class="sem-eventos">Nenhum evento encontrado</li>'
    return
  }

  eventos.forEach((evento) => {
    const statusInfo = formatarStatus(evento.status)
    const dataFormatada = formatarData(evento.data)

    const li = document.createElement("li")
    li.className = "flex datagrid-item"
    li.innerHTML = `
            <div class="datagrid-icon-div">
                <img src="./../img/icon/calendr.svg" alt="Ícone de Calendário" />
            </div>
            <div class="datagrid-details">
                <h4>${evento.nome}</h4>
                <div class="datagrid-info-line">
                    <img src="./../img/icon/clock.svg" alt="Hora" class="info-icon" />
                    <span>${dataFormatada}</span>
                </div>
                <div class="datagrid-info-line">
                    <img src="./../img/icon/map-pin.svg" alt="Local" class="info-icon" />
                    <span>${evento.local}</span>
                </div>
                <div class="datagrid-info-line">
                    <img src="./../img/icon/users.svg" alt="Pessoas" class="info-icon" />
                    <span>${evento.publicoEstimado} pessoas</span>
                </div>
            </div>
            <div class="datagrid-metrics">
                <h4>${evento.residuosEstimados}Kg</h4>
                <span>estimativa</span>
            </div>
            <div class="datagrid-status">
                <span class="${statusInfo.classe}">${statusInfo.texto}</span>
            </div>
            <div class="datagrid-actions">
                <button onclick="editarEvento(${evento.id})" class="btn-acao btn-editar">
                    <img src="./../img/icon/edit.svg" alt="Editar" class="icon-acao" />
                </button>
                <button onclick="excluirEvento(${evento.id})" class="btn-acao btn-excluir">
                    <img src="./../img/icon/trash.svg" alt="Excluir" class="icon-acao" />
                </button>
            </div>
        `

    listaEventos.appendChild(li)
  })
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  carregarEventos()
  carregarEstatisticas()
})
