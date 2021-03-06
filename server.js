const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname +"/views/partials");
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err)=>{
    if(err){
      console.log('unable to append to server.log');
    }
  })
  next();
});
/*
app.use((req,res)=>{
  res.render('maintenance.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'welcome to my website'
  });
});
*/
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  //res.send('<h1>hello express</h1>');
  res.render('home.hbs',{
    pageTitle:'Welcome to the home page',
    welcomePage:'hello world'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/portfolio',(req,res) => {
  res.render('portfolio.hbs',{
    pageTitle:'portfolio Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error: 'please enter valid data'
  })
});

app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});