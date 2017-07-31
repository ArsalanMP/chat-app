const mongo = require('mongodb');

mongo.connect("mongodb://localhost:27017/chat-app" , (error , db) => {
    if(error) {
        console.log('fail to connect to mongo');
        return;
    }
    console.log('connected to mongo db');
    global.mongodb = db ;
})