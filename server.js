const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));


let tareas = [];
let nextId = 1;


app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});


app.post('/api/tareas', (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ error: 'El título es requerido' });
  const tarea = { id: nextId++, titulo, completada: false };
  tareas.push(tarea);
  res.status(201).json(tarea);
});


app.patch('/api/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
  tarea.completada = !tarea.completada;
  res.json(tarea);
});


app.delete('/api/tareas/:id', (req, res) => {
  const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });
  tareas.splice(index, 1);
  res.json({ mensaje: 'Tarea eliminada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});