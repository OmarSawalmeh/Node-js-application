'use strict';

const path = require('path');
const express = require('express');
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    let articles = [
        {
            id:1,
            title:'Article One',
            author: 'Trent',
            body: '66'
        },
        {
            id:1,
            title:'Article Two',
            author: 'VVD',
            body: '4'
        },
        {
            id:3,
            title:'Article Three',
            author: 'Firmeno',
            body: '9'
        }
    ];
    res.render('index', {
        title: 'Articles',
        articles: articles
    });
});

// Add Route
app.get('/articles/add', (req, res)=>{
    res.render('add_article', {
        title: 'Add Article'
    });
});

app.listen(3000, ()=>{
    console.log('Server On Port 3000')
});