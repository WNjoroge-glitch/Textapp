const mongoose = require('mongoose')
const Agenda = require('agenda');



const connection = () =>{
  //const dbUrl = 'mongodb://127.0.0.1:27017/Dasym' || 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority'
  const dbUrl = 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority'

     mongoose
  .connect(dbUrl, { useNewUrlParser: true })
  .then((err,done) => {
    
      console.log('MongoDB Connected');

    
    
    
  })
}

const scheduleConnection = () =>{
  //const dbURL = 'mongodb://127.0.0.1:27017/Dasym';
const dbURL = 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority';
const agenda = new Agenda({
    db: {address: dbURL, collection: 'schedule'},
    useUnifiedTopology: true
});
return agenda
}





module.exports = {connection,scheduleConnection}