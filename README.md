# Senai-Notes-Api

API CRUD de Notas — Express + JSON + Front-end + Postman

## Descrição

Atividade consistente em:
1. **Backend:** Construir a API CRUD em Express com persistência de dados em arquivo JSON
2. **Front-end:** Criar a interface gráfica consumindo a API para gerenciar as notas
3. **Postman:** Criar e configurar uma coleção completa documentando as rotas CRUD e seus códigos de resposta HTTP

Esta atividade corresponde à **Aula 05 - Atividade 02** da disciplina Frameworks Front-end.

## Tecnologias utilizadas

- **Node.js** — ambiente de execução JavaScript no servidor
- **Express.js** — framework para criação de rotas e servidores web
- **body-parser** — middleware para leitura de corpo de requisições JSON
- **CORS** — controle de acesso entre domínios (implementado manualmente no server.js)
- **HTML5** — estrutura da aplicação front-end
- **JavaScript (Fetch API)** — consumo da API via requisições HTTP
- **Postman** — documentação e teste de rotas da API

## Estrutura do projeto

```
notes-api/
├── server.js      — servidor Express com rotas CRUD e persistencia em data.json
├── data.json      — arquivo de persistencia dos dados (JSON)
├── index.html     — front-end que consome a API
├── package.json   — dependencias e scripts
└── README.md
```

## Rotas da API

| Operação | Método | Rota | Funcionalidade | Status |
|----------|--------|------|----------------|--------|
| Listar | `GET` | `/api/notes` | Retorna todas as notas | 200 |
| Buscar | `GET` | `/api/notes/:id` | Retorna nota por ID | 200 / 404 |
| Criar | `POST` | `/api/notes` | Cria nova nota | 201 |
| Editar | `PUT` | `/api/notes/:id` | Atualiza nota existente | 200 / 404 |
| Excluir | `DELETE` | `/api/notes/:id` | Remove nota | 200 |

## Persistência de dados

Os dados são persistidos em um arquivo local `data.json` usando `fs.readFileSync` e `fs.writeFileSync`. Cada nota possui os campos:
- `id` — identificador único (gerado com `Date.now().toString()`)
- `titulo` — título da nota
- `texto` — conteúdo da nota
- `criadoEm` — data/hora de criação (ISO string)

Exemplo de `data.json`:
```json
[
  {
    "id": "1",
    "titulo": "Lembretes",
    "texto": "Comprar leite e pão",
    "criadoEm": "2026-04-28T10:00:00Z"
  }
]
```

## Como o protótipo funciona

### Backend (API)
O `server.js` cria um servidor Express com:
- Middleware `body-parser.json()` para ler requisições JSON
- Middleware CORS permitindo acesso de qualquer origem
- Cinco rotas CRUD para gerenciar notas armazenadas em `data.json`
- O servidor escuta na porta 3000

### Front-end
O `index.html` exibe uma interface para:
- Listar todas as notas
- Adicionar novas notas (formulário com título e texto)
- Editar notas existentes
- Excluir notas

O front-end consome a API via `fetch` e a URL deve ser configurada para o deploy real da API.

## Coleção Postman (documentação da API)

Para documentar a API no Postman, crie uma coleção com as seguintes requisições:

| # | Método | URL | Body | Status esperado |
|---|--------|-----|------|-----------------|
| 1 | GET | `/api/notes` | — | 200 |
| 2 | GET | `/api/notes/:id` | — | 200 / 404 |
| 3 | POST | `/api/notes` | `{ "titulo": "...", "texto": "..." }` | 201 |
| 4 | PUT | `/api/notes/:id` | `{ "titulo": "...", "texto": "..." }` | 200 / 404 |
| 5 | DELETE | `/api/notes/:id` | — | 200 |

## Conceitos aplicados (Aula 05 - Atividade 02)

- [x] API RESTful com Express.js
- [x] Operações CRUD (Create, Read, Update, Delete)
- [x] Persistência de dados em arquivo JSON
- [x] Middleware CORS
- [x] Consumo de API com Fetch API
- [x] Documentação de rotas com Postman

## Como executar

### Backend (API)

1. Instale as dependencias:
   ```bash
   npm install
   ```
2. Execute o servidor:
   ```bash
   npm start
   ```
3. Acesse: `http://localhost:3000/api/notes`

### Front-end

1. Abra o arquivo `index.html` no navegador
2. Altere a constante `API_URL` no script para a URL publica do deploy da sua API

## Repositorio principal

[senai-framework-frontend](https://github.com/paulopoppes-hash/senai-framework-frontend)
