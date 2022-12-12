const multer = require("multer");

// Set your app credentials
const credentials = {
    apiKey: process.env.AFRICASTALKING_API,
    username:process.env.AFRICASTALKING_USERNAME,
}

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

module.exports = async function sendSMS(contact,message) {
    try {
        const result=await sms.send({
          to: contact, 
          message: message
        });
        console.log(result);
      } catch(ex) {
        console.error(ex);
      } 
    // TODO: Send message

};