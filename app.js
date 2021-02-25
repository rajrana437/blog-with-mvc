const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
//connect to mongo db
const dbURI =
  'mongodb+srv://rajrana437:Iq15wdmgk83f5O8c@cluster0.bcsar.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //middleware for FORM POST requests
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blogRoutes

app.use('/blogs', blogRoutes);
//blog create
app.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

//404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404 Page not found' });
}); //add to the last ony
