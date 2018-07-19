const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();
app.get('/',(req,res) => {
res.send('hello world')
});

const port = process.env.PORT || 5000;

app.listen(port,()=> {
    console.log(`server running on port ${port}`);
});
