const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render("index")
});

/*
app.get('/beers', (req, res) => {
  //Promises
  //Promises are JavaScript Objects that might
  //have or not a value in the near future

  /* approach one
  punkAPI.getBeers().then(response =>{
    console.log(response); //it doesnt have to response it oculd be beers
    res.render('beers', {response});
  }) */
  //.catch(error =>{
  //  console.log(error);
  //})  //catches errors and returns them
/*
});
*/

//modern way of consuming beers
app.get('/beers', async (req, res) => {  
  const beers = await punkAPI.getBeers();
  res.render("beers", {beers});
});


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(response =>{
    console.log(response);
    res.render('random-beer', {response});
  })
.catch(error =>{
  console.log(error);
})  

});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
