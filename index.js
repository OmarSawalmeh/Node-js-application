'use strict';

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));


const Article = require('./models/article');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb');
const db = mongoose.connection;

// Check connection
db.once('open', ()=>{
    console.log('Connectd to MongoDB');
});
// Check for DB errors
db.on('error', (err)=>{
    console.log(err);
});

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    Article.find({}, (err, articles)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });
});

// Add Route
app.get('/articles/add', (req, res)=>{
    res.render('add_article', {
        title: 'Add Article'
    });
});

// Get Single Article
app.get('/article/:id', (req, res)=>{
    Article.findById(req.params.id, (err, article)=>{
        res.render('article', {
            article: article
        });
    });

});

// Add Submit POST Route
app.post('/articles/add', (req, res)=>{
    const articles = new Article();
    articles.title = req.body.title;
    articles.author = req.body.author;
    articles.body = req.body.body;

    articles.save((err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/');
        }
    });

});

// Load Edit Form
app.get('/article/edit/:id', (req, res)=>{
    Article.findById(req.params.id, (err, article)=>{
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        });
    });

});
// Update Submit POST Route
app.post('/article/edit/:id', (req, res)=>{
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    Article.updateOne(query, article, (err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/');
        }
    });

});

app.listen(3000, ()=>{
    console.log('Server On Port 3000')
});