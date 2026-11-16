
// frontend/js/charts.js

let graficoDiario = null;
let graficoMaterias = null;

// Configurações visuais dos gráficos
const configuracaoBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: "#1F1F23",
            titleColor: "#FFFFFF",
            bodyColor: "#D4D4D8",
            padding: 12,
            cornerRadius: 8
        }
    }
};

// Gráfico de tempo de estudo por dia
export function criarGraficoDiario(dados) {
    const elemento = document.querySelector("#daily-chart");

    if (!elemento || !window.Chart) return;

    if (graficoDiario) {
        graficoDiario.destroy();
    }

    graficoDiario = new Chart(elemento, {
        type: "bar",

        data: {
            labels: dados.map(item => formatarData(item.data)),

            datasets: [{
                label: "Minutos estudados",
                data: dados.map(item => item.total_minutos),
                backgroundColor: "#5E6AD2",
                borderRadius: 6,
                maxBarThickness: 32
            }]
        },

        options: {
            ...configuracaoBase,

            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#A1A1AA"
                    }
                },

                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(161, 161, 170, 0.12)"
                    },
                    ticks: {
                        color: "#A1A1AA",
                        callback: valor => `${valor} min`
                    }
                }
            }
        }
    });
}

// Gráfico de distribuição do tempo por matéria
export function criarGraficoMaterias(dados) {
    const elemento = document.querySelector("#subject-chart");

    if (!elemento || !window.Chart) return;

    if (graficoMaterias) {
        graficoMaterias.destroy();
    }

    graficoMaterias = new Chart(elemento, {
        type: "doughnut",

        data: {
            labels: dados.map(item => item.materia),

            datasets: [{
                data: dados.map(item => item.total_minutos),

                backgroundColor: [
                    "#5E6AD2",
                    "#10B981",
                    "#F59E0B",
                    "#EC4899",
                    "#8B5CF6",
                    "#06B6D4"
                ],

                borderWidth: 0,
                hoverOffset: 5
            }]
        },

        options: {
            ...configuracaoBase,

            cutout: "70%",

            plugins: {
                ...configuracaoBase.plugins,

                legend: {
                    display: true,
                    position: "bottom",

                    labels: {
                        color: "#A1A1AA",
                        usePointStyle: true,
                        padding: 18
                    }
                }
            }
        }
    });
}

// Formata a data para exibição
function formatarData(data) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}`;
}

// Atualiza os dois gráficos
export function atualizarGraficos(dadosDiarios, dadosMaterias) {
    criarGraficoDiario(dadosDiarios);
    criarGraficoMaterias(dadosMaterias);
}
