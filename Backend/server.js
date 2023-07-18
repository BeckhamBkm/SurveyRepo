const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { connect, connection:_connection } = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_URI;
connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.catch((err) => console.log(err));

const connection = _connection;

connection.once('open', () =>{
    console.log("Database connected Successfully");
})

const usersRouter = require('./routes/users');
app.use('/users',usersRouter)

const questionsRouter = require('./routes/questions');
app.use('/questions',questionsRouter)

const answersRouter = require('./routes/answers');
app.use('/answers',answersRouter)


app.listen(port,() =>{
    console.log(`Server running on port: ${port}`);
})