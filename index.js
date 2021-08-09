//inclusao dos pacotes
const express = require('express');
var mysql     = require('mysql2');

//instancia o express
const app = express()

//definiçaõ de porta
const port = 3000

//abrindo conexao com base de dados
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'sistema_noticias'
});

connection.connect();

//serviço de hello world
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//serviço de busca de categorias

app.get('/news-api/v1/categorias', (req, res) => {

    //Busca categorias
    connection.query('SELECT id, nome FROM sistema_noticias.categoria', function(err, rows, fields) {
      if (err) throw err;

      res.send(rows)
    });  
  })

//serviço de busca de noticias

app.get('/news-api/v1/categorias/:cartegoriaId/noticias', (req, res) => {

  // Busca noticias de uma categoria
  connection.query('SELECT id, titulo FROM sistema_noticias.noticia WHERE id_categoria = ' + req.params.cartegoriaId, function(err, rows, fields) {
    if (err) throw err;

    res.send(rows)
  });  
})

//serviço de busca uma noticia
app.get('/news-api/v1/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {

  // Busca noticia
  connection.query('SELECT id, titulo FROM sistema_noticias.noticia WHERE id_categoria = ' + req.params.cartegoriaId + ' AND id = ' + req.params.noticiaId, function(err, rows, fields) {
    if (err) throw err;

    res.send(rows[0])
  });  
})

//subindo o servidor node
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})