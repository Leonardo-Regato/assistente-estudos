
const API_URL = "http://localhost:8000";

// Função central para realizar requisições
async function requisicao(endpoint, opcoes = {}) {
    const resposta = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...opcoes.headers
        },
        ...opcoes
    });

    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => null);

        throw new Error(
            erro?.detail || `Erro na requisição: ${resposta.status}`
        );
    }

    if (resposta.status === 204) {
        return null;
    }

    return resposta.json();
}

// Listar sessões de estudo
export async function listarEstudos() {
    return requisicao("/estudos");
}

// Cadastrar sessão de estudo
export async function cadastrarEstudo(estudo) {
    return requisicao("/estudos", {
        method: "POST",
        body: JSON.stringify(estudo)
    });
}

// Buscar relatório por matéria
export async function buscarRelatorioMaterias(dias = 7) {
    return requisicao(`/relatorios/materias?dias=${dias}`);
}

// Buscar relatório por dia
export async function buscarRelatorioDias(dias = 7) {
    return requisicao(`/relatorios/dias?dias=${dias}`);
}
