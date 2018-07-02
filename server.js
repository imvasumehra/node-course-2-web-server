const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

 app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
     if(err) {
       console.log("Unable to append to server.log");
     }
   });
   console.log();
   next();
 });

//app.use((req, res, next) => {
//  res.render('maintenence.hbs')
//});

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
   var er = text.toUpperCase()
   return er
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    first: 'Welcome 123',
    pageTitle: 'Home Page',

  })
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});

app.get('/bad', (req, res) =>{
  res.send({
    errorMessage: 'Bad Request'
  });
});

app.listen(3000, () =>{
  console.log("-----------SERVER ROLLING------------")
})
