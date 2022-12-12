const Agenda = require('agenda');
const messages = require('./models/Messages');
const report = require('./models/report')
const {scheduleConnection} = require('./config/db')


//Set your app credentials
const credentials = {
    apiKey:process.env.AFRICASTALKING_API,
    username:process.env.AFRICASTALKING_USERNAME,
}

// const credentials = {
//   apiKey:'a0c6143f23fe6dfc0c4f45c85b6afc6c14f574109210584a473157aff4290b48',
//   username:'bulkmsg',
// }


// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;
//const dbURL = 'mongodb://127.0.0.1:27017/Dasym' || 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority';
const dbURL = 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority';
const agenda = new Agenda({
    db: {address: dbURL, collection: 'schedule'},
    useUnifiedTopology: true
});
  


function schedule() {


    return (req,res,next)=>{
      
     
      const names = res.locals.contacts
const message = res.locals.message
const recur = res.locals.recur
const date = res.locals.date


  agenda.define("send", { priority: "high" },async function sendSMS(job){
    
    //const { names,msg } = job.attrs.data;
   
    
       try {
         
        const result=await sms.send({
         
          to:names, 
          message:message
        });
        res.status(200).send('Message sent.Check report for full details')
         
      } catch (error) {
       
       res.status(500).send(error.message)
       
       
      }
     

     
     
     
     
});
(async()=>{
  await agenda.start();
  await agenda.every(recur,'send',{
    skipImmediate:true,
    startDate:date
  })
  await agenda.schedule(date, "send");
})()
   
 
  }
  };


  async function cancelJob(){
    await agenda.cancel({name:"send"},(err,removed)=>{
      if(err){
        console.log(err)
      } else {
        console.log(removed)
      }
    })
  }



  


    


module.exports = {schedule,cancelJob}