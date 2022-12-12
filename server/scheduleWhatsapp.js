const Agenda = require('agenda');
const messages = require('./models/Messages');
const accountSid ='ACf7057f61d7e46e3a79154e9d98da2e31';
const authToken ='5bcd10dc4375e8637b7059a1e65bffb9';
const serviceSid = 'IS0e053a2ca6b0581de92c32c180bfdf9d'
const {scheduleConnection} = require('./config/db')
const client = require('twilio')(accountSid, authToken)
// Set your app credentials

// Initialize the SDK

// Get the SMS service

//const dbURL = 'mongodb://127.0.0.1:27017/Dasym' || 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority';

const dbURL = 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority'
const agenda = new Agenda({
    db: {address: dbURL, collection: 'schedule'},
    useUnifiedTopology: true
});





    

    agenda.define('sendWhatsapp', { priority: "high" },function sendSMS(job){
      try{
        const {name,numbers,message} = job.attrs.data
        
        
        for(let number of numbers){
          
          client.messages
          .create({
             from: 'whatsapp:+17622465004',
             body: message || `Hi ${name}, your issue has been successfully resolved. Please check and let us know if any further assistance is needed. Regards, Dasym Ltd`,
             to: `whatsapp:${number}`
           })
          .then(message => console.log(message));
    }
              
        
      
      } catch(ex){
        console.log(ex)
      }
    })

  


async function schedule (date,recur,name,contact,message){
    
    await agenda.start(); // Start Agenda instance
    await agenda.every(recur,'sendWhatsapp',{
      skipImmediate:true,
      startDate:date,
      name:name,
      numbers:contact,
      message:message
    })
    await agenda.schedule(date, 'sendWhatsapp',{
        skipImmediate:true,
        name:name,
      message:message,
      numbers:contact
    }); // Run the dummy job in 10 minutes and passing data.
   
}
    


module.exports = schedule;