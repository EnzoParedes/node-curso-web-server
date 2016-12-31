const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '/n');
  next();
});

// app.use((req, res, next) => {
//   res.render('mantencion.hbs');
// });

hbs.registerHelper('getYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',  (req, res) => {
  res.render('home.hbs', {
    titulo: 'home',
    mensajeBienvenida: 'bienvenido a mi sitio',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    titulo: 'titulo about',
    year: new Date().getFullYear()
  });
});


app.listen(port, () => {
  console.log(`server en ${port}`)
});
