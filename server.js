var express = require('express');

var app = express();
app.use(express.static(__dirname))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var messages = [
    {name:'Amal',message:"Hola!"},
    {name:'Akhil',message:"Hola! Amal"}
]



app.get('/messages',(req,res)=>{
    res.send(messages);
})

app.post('/messages',(req,res)=>{
    messages.push(JSON.parse(JSON.stringify(req.body)));
    res.sendStatus(200);
})

var server = app.listen(3000, () => {
    console.log("Node server is up! Listening to ", server.address().port);
})
