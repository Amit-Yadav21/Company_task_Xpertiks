const express = require('express');
const app = express();
const port = 4500;
const router = require('./router')

app.use(express.json());

app.use('/',router)

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})