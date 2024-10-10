// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
import express from "express";
import path from "path";
// import cookieParser from "cookie-parser";
// import createError from "create-error";
// import logger from "morgan";
import { fileURLToPath} from "url";

let app = express();
let port = 3000;

let __fileName = fileURLToPath(import.meta.url)
console.log(__fileName)
let __dirName= path.dirname(__fileName)


// Middleware to parse JSON and URL-encoded form data
app.use(express.json());  // For parsing JSON data
app.use(express.urlencoded({ extended: true }));  // For parsing form data (x-www-form-urlencoded)

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'pug');


// view engine setup
app.set('views', path.join(__dirName, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirName, 'public')));

//Routes
// app.get('/', (req, res) => {
//   res.send('Welcome');
// });

app.get('/', async(req,res)=>{
  let foodlist = await fetch ('https://api.spoonacular.com/recipes/complexSearch?apiKey=99d4fea0d5dc4fa4b0fa4a6061ead29a')
  let foodMenu =  await foodlist.json()
  console.log({foodMenu});
  
  res.render('index', {data:foodMenu.results, title: 'Restaurant'});
 
});

app.get('/about', (req, res) => {
  res.render('about');
})
app.get('/drinks', async(req, res) => {
  let drinkList = await fetch ('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
  let drinkMenu =  await drinkList.json();
  console.log({drinkMenu});
  let drinkSlice = drinkMenu.drinks.slice(0,30)
  res.render('drinks', {data:drinkSlice, title: 'Drinks'});
})
app.get('/blog', (req, res) => {
  res.render('blog');
});
app.get('/events', (req, res) => {
  res.render('events');
})
app.get('/gallery', (req, res) => {
  
  res.render('gallery');
})
app.get('/services', (req, res) => {
  res.render('services');
})
app.get('/form', (req, res) => {
  res.render('form');
})
app.get('/food', (req, res) => {
  res.render('food');
})


app.get('/about',(req,res)=>{
    res.send("Ok");

})
app.post("/form", (req, res) => {
  console.log("Form received");

  // Destructure the request body
  let { name, password } = req.body;

  console.log({ name });
  console.log({ password });

  // Do something with the form data, e.g., validation
  if (!name || !password) {
    return res.status(400).send("All fields are required.");
  }

  res.send("Form submission successful!");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => console.log(`Server is running on port ${port}`));
// module.exports = app;


