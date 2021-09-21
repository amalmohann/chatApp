var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var dbUrl = "mongodb://localhost/ChatApp";
mongoose.connect(dbUrl, { useNewUrlParser: true});
mongoose.connection
    .once('open',()=>{console.log('MonGod is now Available for your prayers!');})
    .on('error',(err)=>{console.log(console.log("err -> ",err," <- err"));})

var Message = mongoose.model('Message', new mongoose.Schema({
    name: String,
    message: String
}))


app.get('/messages', (req, res) => {
    Message.find({},(err,messages)=>{
        res.send(messages);
    })
});

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            io.emit('message', req.body);
            res.sendStatus(200);
        }
    })

});

io.on('connection', (socket) => {
    console.log('user connected');
})



var server = http.listen(3000, () => {
    console.log("Node server is up! Listening to ", server.address().port);
});

