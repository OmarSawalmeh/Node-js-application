# Node-js-application

- express

- pug template
    ```js
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    // Build views file extends .pug
    // and render it in some route
    ```

- mongoDB & mongoose
    ```js
    const Article = require('./models/SCHEMA');
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/COLLECTION_NAME');
    const db = mongoose.connection;

    // Check connection
    db.once('open', ()=>{
        console.log('Connectd to MongoDB');
    });
    // Check for DB errors
    db.on('error', (err)=>{
        console.log(err);
    });
    ```