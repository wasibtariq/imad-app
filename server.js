var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'wasibtariq95',
    database:'wasibtariq95',
    host:'http://db.imad.hasura-app.io',
    port:'localhost:5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
'article-one' : {
title: 'Article-one ~ Wasib Tariq',
heading:'Article - One',
date:'August 22 2017',
content:`
        <p>This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!</p>
            <p>
                This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!
            </p>
            <p>
                This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!This is the content for article -one!
            </p>`
},
'article-two' : {
title: 'Article-two ~ Wasib Tariq',
heading:'Article - Two',
date:'August 21 2017',
content:`
        <p>This is the content for article -two!!!
            </p>`
},
'article-three' : {
title: 'Article-three ~ Wasib Tariq',
heading:'Article - Three',
date:'August 23 2017',
content:`
        <p>This is the content for article -Three!!!
            </p>`
}
};

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
var htmlTemplate = `<html>
<head>
    <title>${title}</title>
    <meta name="viewport" content="width-device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
          ${content}
        </div>
        </div>
    </body>
</html>`;

return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
 pool.query('SELECT * FROM test', function(err,result){
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{
        res.send(JSON.stringify(result));
    }
 });
});

var counter=0;
app.get('/counter', function (req, res) {
     counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
    var name= req.query.name;
    names.push(name);
  res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
