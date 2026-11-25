const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const FILE = 'data.json';

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

function readNotes() {
  try {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
}

app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const notes = readNotes();
  const note = notes.find(n => n.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ erro: 'Nota não encontrada' });
  }
});

app.post('/api/notes', (req, res) => {
  const notes = readNotes();
  const novaNota = {
    id: Date.now().toString(),
    titulo: req.body.titulo,
    texto: req.body.texto,
    criadoEm: new Date().toISOString()
  };
  notes.push(novaNota);
  saveNotes(notes);
  res.status(201).json(novaNota);
});

app.put('/api/notes/:id', (req, res) => {
  const notes = readNotes();
  const index = notes.findIndex(n => n.id === req.params.id);
  if (index >= 0) {
    notes[index].titulo = req.body.titulo;
    notes[index].texto = req.body.texto;
    saveNotes(notes);
    res.json(notes[index]);
  } else {
    res.status(404).json({ erro: 'Nota não encontrada' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const notes = readNotes();
  const novasNotas = notes.filter(n => n.id !== req.params.id);
  saveNotes(novasNotas);
  res.json({ mensagem: 'Nota removida' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
