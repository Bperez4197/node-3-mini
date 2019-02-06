const express = require('express');
const bodyParser = require('body-parser');
const mC = require('./messagesCtrl');
require('dotenv').config();
const session = require('express-session');
let { SERVER_PORT, SESSION_SECRET} = process.env;

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: flase
}));
app.use((req,res,next) => {
    let badWords = ['knucklehead','jerk','internet explorer'];
    if(req.body.message) {
        for(let i =0; i< badWords.length; i++) {
            let regex = new RegExp(badWords[i], 'g');
            req.body.message = req.body.message.replace(regex, '****');
        }
        next();
    }else {
        next();
    }
})

app.listen(SERVER_PORT, () => console.log(`app is running on port ${SERVER_PORT}`));


app.get('/api/messages' , mC.getAllMessages);
app.post('/api/messages', mC.createMessages);
app.get('/api/messages/history', mC.history);
