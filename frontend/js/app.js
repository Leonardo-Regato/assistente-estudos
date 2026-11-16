import {
    listarEstudos,
    cadastrarEstudo,
    buscarRelatorioMaterias,
    buscarRelatorioDias
} from "./api.js";
import { atualizarGraficos } from "./charts.js";

document.addEventListener("DOMContentLoaded", () => {
    inicializarInterface();
    atualizarDashboard();
});

let estudosCarregados = [];

// Inicialização
function inicializarInterface() {
    inicializarIcones();
    inicializarTema();
    inicializarModal();
    inicializarFormulario();
    inicializarBusca();
    inicializarNavegacao();
    inicializarFiltroPeriodo();
}

function inicializarIcones() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Tema
function inicializarTema() {
    const botaoTema = document.querySelector("#theme-toggle");

    if (!botaoTema) return;

    botaoTema.addEventListener("click", () => {
        const temaAtual = document.documentElement.dataset.theme;
        const novoTema = temaAtual === "light" ? "dark" : "light";

        document.documentElement.dataset.theme = novoTema;

        botaoTema.setAttribute("aria-pressed", novoTema === "light");

        botaoTema.innerHTML = `
            <i data-lucide="${novoTema === "light" ? "moon" : "sun"}"></i>
        `;

        inicializarIcones();
    });
}

// Modal
function inicializarModal() {
    const modal = document.querySelector("#study-modal");
    const botaoAbrir = document.querySelector("#open-study-modal");
    const botaoFechar = document.querySelector("#close-study-modal");
    const botaoCancelar = document.querySelector("#cancel-study");

    if (!modal || !botaoAbrir) return;

    botaoAbrir.addEventListener("click", () => modal.showModal());
    botaoFechar?.addEventListener("click", () => modal.close());
    botaoCancelar?.addEventListener("click", () => modal.close());
}

// Formulário: cadastro será integrado depois

function inicializarFormulario() {
    const formulario = document.querySelector("#study-form");

    if (!formulario) return;

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const botaoSalvar = formulario.querySelector(
            'button[type="submit"]'
        );

        const estudo = {
            materia: document.querySelector("#subject").value.trim(),
            minutos: Number(document.querySelector("#duration").value),
            data: document.querySelector("#study-date").value || null,
            observacao:
                document.querySelector("#observation").value.trim() || null
        };

        try {
            botaoSalvar.disabled = true;

            await cadastrarEstudo(estudo);

            document.querySelector("#study-modal").close();
            formulario.reset();

            await atualizarDashboard();

            mostrarNotificacao(
                "Sessão de estudo cadastrada com sucesso!",
                "success"
            );

        } catch (erro) {
            console.error("Erro ao cadastrar estudo:", erro);

            mostrarNotificacao(
                erro.message || "Não foi possível cadastrar o estudo.",
                "error"
            );

        } finally {
            botaoSalvar.disabled = false;
        }
    });
}


// Busca no histórico
function inicializarBusca() {
    const campoBusca = document.querySelector("#subject-search");

    if (!campoBusca) return;

    campoBusca.addEventListener("input", aplicarFiltroHistorico);
}

function aplicarFiltroHistorico() {
    const campoBusca = document.querySelector("#subject-search");
    const termo = campoBusca?.value.toLowerCase().trim() || "";

    document.querySelectorAll("#study-history tr").forEach((linha) => {
        linha.hidden = !linha.textContent.toLowerCase().includes(termo);
    });
}

// Navegação
function inicializarNavegacao() {
    document.querySelectorAll(".nav-link.disabled").forEach((link) => {
        link.addEventListener("click", (evento) => evento.preventDefault());
    });
}

// Filtro de período
function inicializarFiltroPeriodo() {
    const filtro = document.querySelector("#period-filter");

    if (!filtro) return;

    filtro.addEventListener("change", atualizarDashboard);
}

// Carrega os dados do dashboard
async function atualizarDashboard() {
    try {
        const filtro = document.querySelector("#period-filter");
        const dias = Number(filtro?.value || 7);

        const [estudos, materias, diasEstudados] = await Promise.all([
            listarEstudos(),
            buscarRelatorioMaterias(dias),
            buscarRelatorioDias(dias)
        ]);

        estudosCarregados = estudos;

        renderizarHistorico(estudos);
        atualizarIndicadores(estudos, materias, diasEstudados, dias);
        atualizarGraficos(diasEstudados, materias); 

    } catch (erro) {
        console.error("Erro ao atualizar dashboard:", erro);

        mostrarNotificacao(
            "Não foi possível carregar os dados do dashboard.",
            "error"
        );
    }
}

// Atualiza os indicadores
function atualizarIndicadores(estudos, materias, diasEstudados, periodo) {
    const dataInicio = calcularDataInicio(periodo);

    const estudosDoPeriodo = estudos.filter((estudo) => {
        return estudo.data >= dataInicio;
    });

    const totalMinutos = diasEstudados.reduce((total, dia) => {
        return total + dia.total_minutos;
    }, 0);

    const materiaPrincipal = materias.reduce((maior, atual) => {
        return atual.total_minutos > (maior?.total_minutos || 0)
            ? atual
            : maior;
    }, null);

    document.querySelector("#total-hours").textContent =
        formatarDuracao(totalMinutos);

    document.querySelector("#total-sessions").textContent =
        estudosDoPeriodo.length;

    document.querySelector("#top-subject").textContent =
        materiaPrincipal?.materia || "—";
}

// Calcula a data inicial do período
function calcularDataInicio(dias) {
    const data = new Date();

    data.setHours(0, 0, 0, 0);
    data.setDate(data.getDate() - (dias - 1));

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

// Formata minutos em horas e minutos
function formatarDuracao(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    return `${horas}h ${minutosRestantes}min`;
}

// Preenche o histórico
function renderizarHistorico(estudos) {
    const tabela = document.querySelector("#study-history");

    if (!tabela) return;

    tabela.replaceChildren();

    if (estudos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 4;
        celula.textContent = "Nenhum estudo cadastrado.";

        linha.appendChild(celula);
        tabela.appendChild(linha);
        return;
    }

    estudos.forEach((estudo) => {
        const linha = document.createElement("tr");

        const valores = [
            formatarData(estudo.data),
            estudo.materia,
            `${estudo.minutos} min`,
            estudo.observacao || "—"
        ];

        valores.forEach((valor) => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        tabela.appendChild(linha);
    });

    aplicarFiltroHistorico();
}


// Formata a data
function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

// Notificações
function mostrarNotificacao(mensagem, tipo = "info") {
    const container = document.querySelector("#notification-container");

    if (!container) return;

    const notificacao = document.createElement("div");

    notificacao.className = `notification notification-${tipo}`;
    notificacao.textContent = mensagem;

    container.appendChild(notificacao);

    setTimeout(() => notificacao.remove(), 3500);
}
