const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} = ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next()
});

app.use((req,res,next) => {
  res.render('maintain.hbs')
})
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('Caps', (text) => {
  return text.toUpperCase()
});

console.log("Starting Expresss App!!!")
app.get('/',(req,res) => {
    //res.send('<h1>Hello Akkoo!</h1>');
    res.render('home.hbs',{
        username: 'Akkoo',
        title : 'MArk Home!',
        buttonName : new Date().getHours()
    })
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        title: 'This is the p[age title',
        buttonName: new Date().getFullYear()
    });
});

app.get('/mark',(req,res) => {
  res.render('mark.hbs',{
    title: 'Mark Home Title',
    para: 'Mark Paragraph .................................'
  })
});

app.listen(3000);
