class EventosCRUD {
  constructor() {
    this.storageKey = "fortes_eventos"
    this.initializeStorage()
  }

  initializeStorage() {
    const eventos = this.getEventos()
    if (eventos.length === 0) {
      const eventosExemplo = [
        {
          id: 1,
          nome: "Festival de Verão 2024",
          tipo: "festival",
          data: "2024-01-15",
          horario: "14:00",
          local: "Parque Central",
          publicoEstimado: 500,
          duracao: 8,
          descricao: "Grande festival de verão com música e atividades ao ar livre",
          dataColeta: "2024-01-16",
          horarioColeta: "morning",
          instrucoes: "Coleta após o evento, focar em materiais recicláveis",
          status: "confirmado",
          residuosEstimados: 120,
          dataCriacao: new Date().toISOString(),
        },
        {
          id: 2,
          nome: "Feira Comunitária",
          tipo: "feira",
          data: "2024-01-22",
          horario: "09:00",
          local: "Praça da Comunidade",
          publicoEstimado: 200,
          duracao: 6,
          descricao: "Feira local com produtos orgânicos e artesanato",
          dataColeta: "2024-01-22",
          horarioColeta: "evening",
          instrucoes: "Coleta durante o evento",
          status: "pendente",
          residuosEstimados: 45,
          dataCriacao: new Date().toISOString(),
        },
        {
          id: 3,
          nome: "Workshop Sustentabilidade",
          tipo: "workshop",
          data: "2024-01-28",
          horario: "16:00",
          local: "Centro Cultural",
          publicoEstimado: 80,
          duracao: 4,
          descricao: "Workshop educativo sobre práticas sustentáveis",
          dataColeta: "2024-01-28",
          horarioColeta: "evening",
          instrucoes: "Coleta mínima, evento focado em educação",
          status: "agendado",
          residuosEstimados: 15,
          dataCriacao: new Date().toISOString(),
        },
      ]
      localStorage.setItem(this.storageKey, JSON.stringify(eventosExemplo))
    }
  }

  // CREATE - Criar novo evento
  criarEvento(dadosEvento) {
    const eventos = this.getEventos()
    const novoId = eventos.length > 0 ? Math.max(...eventos.map((e) => e.id)) + 1 : 1

    const novoEvento = {
      id: novoId,
      ...dadosEvento,
      status: "pendente",
      residuosEstimados: this.calcularResiduosEstimados(dadosEvento.publicoEstimado),
      dataCriacao: new Date().toISOString(),
    }

    eventos.push(novoEvento)
    localStorage.setItem(this.storageKey, JSON.stringify(eventos))
    return novoEvento
  }

  // READ - Obter todos os eventos
  getEventos() {
    const eventos = localStorage.getItem(this.storageKey)
    return eventos ? JSON.parse(eventos) : []
  }

  // READ - Obter evento por ID
  getEventoPorId(id) {
    const eventos = this.getEventos()
    return eventos.find((evento) => evento.id === Number.parseInt(id))
  }

  // UPDATE - Atualizar evento
  atualizarEvento(id, dadosAtualizados) {
    const eventos = this.getEventos()
    const index = eventos.findIndex((evento) => evento.id === Number.parseInt(id))

    if (index !== -1) {
      eventos[index] = {
        ...eventos[index],
        ...dadosAtualizados,
        residuosEstimados: this.calcularResiduosEstimados(
          dadosAtualizados.publicoEstimado || eventos[index].publicoEstimado,
        ),
      }
      localStorage.setItem(this.storageKey, JSON.stringify(eventos))
      return eventos[index]
    }
    return null
  }

  // DELETE - Excluir evento
  excluirEvento(id) {
    const eventos = this.getEventos()
    const eventosAtualizados = eventos.filter((evento) => evento.id !== Number.parseInt(id))
    localStorage.setItem(this.storageKey, JSON.stringify(eventosAtualizados))
    return eventosAtualizados.length < eventos.length
  }

  calcularResiduosEstimados(publicoEstimado) {
    // Fórmula simples: aproximadamente 0.3kg por pessoa
    return Math.round(publicoEstimado * 0.3)
  }

  getEstatisticas() {
    const eventos = this.getEventos()
    const eventosAtivos = eventos.filter((e) => e.status !== "cancelado")
    const totalResiduos = eventos.reduce((total, evento) => total + evento.residuosEstimados, 0)
    const totalParticipantes = eventos.reduce((total, evento) => total + evento.publicoEstimado, 0)

    return {
      eventosAtivos: eventosAtivos.length,
      totalResiduos,
      totalParticipantes,
      mediaParticipantesPorEvento: eventos.length > 0 ? Math.round(totalParticipantes / eventos.length) : 0,
    }
  }

  getEventosPorStatus(status) {
    const eventos = this.getEventos()
    return eventos.filter((evento) => evento.status === status)
  }

  buscarEventos(termo) {
    const eventos = this.getEventos()
    return eventos.filter(
      (evento) =>
        evento.nome.toLowerCase().includes(termo.toLowerCase()) ||
        evento.local.toLowerCase().includes(termo.toLowerCase()),
    )
  }
}

// Instância global do CRUD
const eventosCRUD = new EventosCRUD()

// Funções auxiliares para formatação
function formatarData(dataString) {
  const data = new Date(dataString)
  return data.toLocaleDateString("pt-BR")
}

function formatarStatus(status) {
  const statusMap = {
    confirmado: { texto: "Confirmado", classe: "status-confirmado" },
    pendente: { texto: "Pendente", classe: "status-pendente" },
    agendado: { texto: "Agendado", classe: "status-agendado" },
    cancelado: { texto: "Cancelado", classe: "status-cancelado" },
  }
  return statusMap[status] || { texto: status, classe: "status-pendente" }
}

function formatarTipoEvento(tipo) {
  const tiposMap = {
    festival: "Festival",
    feira: "Feira",
    workshop: "Workshop",
    conferencia: "Conferência",
    outro: "Outro",
  }
  return tiposMap[tipo] || tipo
}
