const express = require('express');
const app = express();
const port = 4500;
const router = require('./router');
const bodyParser = require('body-parser');
// const bodyParser = require('body-parser')

app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',router)

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})