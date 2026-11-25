# Senai-Notes-Api

API CRUD de Notas — Express + JSON

## Descrição

API RESTful para gerenciamento de notas (criar, ler, atualizar e excluir) com persistência em arquivo JSON, desenvolvida com Express.js. Inclui front-end consumindo a API e documentação no Postman.

## Tecnologias

- Node.js
- Express.js
- body-parser
- CORS
- HTML5
- JavaScript (Fetch API)
- Postman

## Rotas da API

| Operação | Método | Rota | Funcionalidade | Status |
|----------|--------|------|----------------|--------|
| Listar | GET | /api/notes | Retorna todas as notas | 200 |
| Buscar | GET | /api/notes/:id | Retorna nota por ID | 200 / 404 |
| Criar | POST | /api/notes | Cria nova nota | 201 |
| Editar | PUT | /api/notes/:id | Atualiza nota existente | 200 / 404 |
| Excluir | DELETE | /api/notes/:id | Remove nota | 200 |

## Arquivos

- `server.js` — Servidor Express com rotas CRUD e persistência em `data.json`
- `data.json` — Arquivo de persistência dos dados
- `index.html` — Front-end que consome a API

## Como executar

1. Instale dependências: `npm install express body-parser`
2. Execute: `node server.js`
3. Abra `index.html` no navegador
4. Altere `API_URL` para a URL pública do deploy

## Postman

Criar coleção com as 5 rotas CRUD documentando códigos de resposta HTTP (200, 201, 404).

## Repositório principal

[senai-framework-frontend](https://github.com/paulopoppes-hash/senai-framework-frontend)
