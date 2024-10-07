//db.js is just a module that take help from mongoose to build a connection bridge between node js and mongo DB
 
const mongoose = require('mongoose');
const mongoURL='mongodb://localhost:27017/hotel';//define mongodb connections
mongoose.connect(mongoURL);
// , {
//     useNewUrlParser: true, //ensuring that we are using new and updated things
//     useUnifiedTopology: true
// })
// Connect to MongoDB with additional options
mongoose.connect(mongoURL, {
    useNewUrlParser: true, // Ensures the connection uses the new URL parser
    useUnifiedTopology: true // Enables new connection management engine for better server discovery
});
//here db creates connections with NodeJS and MongoDB
const db= mongoose.connection;
//db represents mongoDB conenctions

//.on is used to listen when server is connected so it show the message when server is connected to mongoDB
//event listener keyword that MongoDB understands

db.on('connected',() => {
    console.log('Connected to MongoDB Server');
})
db.on('disconnected',() => {
    console.log('MongoDB connections is disconnected');
})
db.on('error',(err) => {
    console.log('MongoDB connections has errors',err);
})
//exports the mongodb connections to run the file
module.exports=db;

