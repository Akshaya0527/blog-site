const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config();


const app = express();

mongoose.connect(process.env.dbURI)
    .then((result)=> {
        console.log('connected to dB');
        app.listen(3000);
    })
    .catch((err)=> console.log(err));
//register view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.redirect('/blogs');
});

app.get('/about', (req, res)=>{   
    res.render('about', {title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);

//404 page default case if no match till now
app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
})