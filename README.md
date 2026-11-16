# Assistente de Estudos

API e aplicação web em Python (FastAPI + PostgreSQL) para registrar sessões de estudo, acompanhar hábitos e visualizar relatórios de produtividade.

> 🚧 Em desenvolvimento.

## Sobre o projeto

Projeto pessoal que nasceu de um problema real: acompanhar quanto tempo eu realmente estudo cada matéria e manter a constância nos hábitos do dia a dia.

O objetivo é construir uma ferramenta para uso pessoal e, ao mesmo tempo, praticar desenvolvimento backend com Python, integração com banco de dados, APIs REST e automações.

A aplicação possui uma API desenvolvida com FastAPI e uma interface web que permite registrar sessões de estudo, consultar o histórico e acompanhar indicadores por meio de gráficos.

## Funcionalidades

### Implementadas

- Registro de sessões de estudo por matéria (`POST /estudos`).
- Listagem de estudos, do mais recente ao mais antigo (`GET /estudos`).
- Validação de dados com Pydantic.
- Persistência dos dados no PostgreSQL.
- Relatórios de tempo estudado por dia (`GET /relatorios/dias`).
- Relatórios de tempo estudado por matéria (`GET /relatorios/materias`).
- Filtro de relatórios por período (7, 15 e 30 dias).
- Dashboard com indicadores de produtividade e gráficos.
- Histórico de estudos com busca por matéria.
- Cadastro de sessões diretamente pela interface web.
- Documentação interativa da API com Swagger.

### Planejadas

- Controle de hábitos com cálculo de sequência (streak).
- Lembretes e relatórios automáticos via notificações.
- Resumo diário de notícias de tecnologia, filtrado por tema e utilizando fontes RSS.
- Integração com Discord para notificações e interações.
- Análise dos hábitos de estudo utilizando IA.

## Tecnologias

### Backend
- Python
- FastAPI e Uvicorn
- PostgreSQL e psycopg
- Pydantic
- python-dotenv

### Frontend
- HTML5
- CSS3
- JavaScript (ES Modules)

### Ferramentas
- Git e GitHub

## Estrutura do projeto

```text
assistente-estudos/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── schemas.py
│   ├── routers/
│   │   ├── estudos.py
│   │   └── relatorios.py
│   └── services/
│       └── estudos.py
├── database/
│   └── schema.sql
├── tests/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── api.js
│       ├── app.js
│       └── charts.js
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

## Roadmap

- [x] Etapa 0: Estrutura inicial do projeto
- [x] Etapa 1: Registro e listagem de estudos
- [x] Etapa 2: Relatórios de produtividade
- [x] Etapa 3: Interface web integrada à API
- [ ] Etapa 4: Controle de hábitos
- [ ] Etapa 5: Agendamento e notificações
- [ ] Etapa 6: Resumo de notícias via RSS
- [ ] Etapa 7: Logging, testes, Docker e deploy
- [ ] Etapa 8: Integrações e funcionalidades com IA

## Como executar

### Pré-requisitos

- Python instalado
- PostgreSQL instalado e em execução
- Git instalado
- Visual Studio Code (para executar o frontend com Live Server)

### 1. Clone o repositório

```bash
git clone https://github.com/Leonardo-Regato/assistente-estudos.git
cd assistente-estudos
```

### 2. Crie e ative o ambiente virtual (Windows, PowerShell)

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Instale as dependências

```bash
python -m pip install -r requirements.txt
```

### 4. Configure o banco de dados

Crie um banco chamado `assistente_estudos` e execute o conteúdo de `database/schema.sql` nele.

### 5. Configure as variáveis de ambiente

Copie `.env.example` para `.env` e preencha com as credenciais do seu PostgreSQL.

### 6. Execute a API

Na raiz do projeto, execute:

```bash
uvicorn app.main:app --reload
```

A documentação interativa fica disponível em:

http://127.0.0.1:8000/docs

### 7. Execute o frontend

Abra a pasta `frontend` no Visual Studio Code.

Utilize a extensão **Live Server** para iniciar a interface pelo arquivo `index.html`.

Por padrão, o frontend ficará disponível em:

http://127.0.0.1:5500

> A API precisa estar em execução para que o frontend consiga consultar e cadastrar os estudos.

## Objetivo

Aplicar na prática conceitos de desenvolvimento backend com Python, construção de APIs REST, integração com banco de dados e automação de tarefas.

O projeto será desenvolvido gradualmente, incorporando novas funcionalidades conforme a evolução dos conhecimentos e das necessidades de uso.

## Autor

Leonardo Regato · [GitHub](https://github.com/Leonardo-Regato)