# Assistente de Estudos

API em Python (FastAPI + PostgreSQL) para registrar o tempo de estudo, acompanhar hábitos e receber resumos automáticos, com relatórios e avisos agendados.

> 🚧 Em desenvolvimento.

## Sobre o projeto

Projeto pessoal que nasceu de um problema real: acompanhar quanto tempo eu realmente estudo cada matéria e manter a constância nos hábitos do dia a dia.

O foco é praticar **automação e backend com Python**: agendamento de tarefas, consumo de fontes externas (RSS), geração de relatórios e notificações, tudo sobre uma API REST organizada em camadas.

## Funcionalidades

**Planejadas**

- Registro de sessões de estudo por matéria
- Relatório semanal (tempo por matéria e por dia)
- Controle de hábitos com cálculo de sequência (streak)
- Lembretes e relatórios automáticos via notificação no celular
- Resumo diário de notícias de tecnologia, filtrado por tema

## Tecnologias

- Python
- FastAPI e Uvicorn (API REST)
- PostgreSQL e psycopg (banco de dados)
- Pydantic (validação de dados)
- python-dotenv (variáveis de ambiente)
- Git e GitHub

> Outras ferramentas (agendamento, RSS, notificações, interface) serão adicionadas nas próximas etapas.

## Estrutura do projeto

```
assistente-estudos/
├── app/
│   ├── main.py            # criação do app e registro das rotas
│   ├── config.py          # variáveis de ambiente
│   ├── database.py        # conexão com o PostgreSQL
│   ├── schemas.py         # modelos Pydantic
│   ├── routers/           # endpoints
│   └── services/          # lógica e acesso ao banco
├── database/
│   └── schema.sql         # criação das tabelas
├── tests/
├── .env.example
├── requirements.txt
└── README.md
```

## Roadmap

- [x] Etapa 0: Estrutura inicial do projeto
- [ ] Etapa 1: Registro de estudos (CRUD)
- [ ] Etapa 2: Relatório semanal
- [ ] Etapa 3: Interface para registrar e visualizar dados
- [ ] Etapa 4: Controle de hábitos
- [ ] Etapa 5: Agendamento e notificações
- [ ] Etapa 6: Resumo de notícias via RSS
- [ ] Etapa 7: Logging, testes, Docker e deploy

## Como executar

> Esta seção será completada conforme o projeto evoluir.

### Pré-requisitos

- Python instalado
- PostgreSQL instalado e em execução
- Git instalado

### 1. Clone o repositório

```
git clone https://github.com/Leonardo-Regato/assistente-estudos.git
cd assistente-estudos
```

### 2. Crie e ative o ambiente virtual (Windows, PowerShell)

```
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Instale as dependências

```
python -m pip install -r requirements.txt
```

### 4. Configure o banco de dados

Crie um banco chamado `assistente_estudos` e execute o conteúdo de `database/schema.sql` nele.

### 5. Configure as variáveis de ambiente

Copie `.env.example` para `.env` e preencha com as credenciais do seu PostgreSQL.

### 6. Execute a API

```
uvicorn app.main:app --reload
```

A documentação interativa fica em `http://127.0.0.1:8000/docs`.

## Objetivo

Aplicar na prática automação e desenvolvimento backend com Python, construindo uma ferramenta que eu uso no dia a dia e que evolui etapa por etapa.

## Autor

Leonardo Regato · [GitHub](https://github.com/Leonardo-Regato)