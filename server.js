const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Раздаем статические файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Для всех остальных запросов возвращаем index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});