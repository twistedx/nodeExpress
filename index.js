const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const members = require('./Members');
const logger = require('./middleware/logger');


//init middleware
// app.use(logger);

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//use Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage Route
app.get("/", (req, res) =>
  res.render("index", {
    tittle: "Member App",
    members
  })
);

//Set a static folder
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5000;

app.use('/api/members', require('./routes/api/members'))

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
