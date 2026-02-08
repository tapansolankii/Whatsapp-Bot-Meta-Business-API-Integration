'use strict';
const router = require('express').Router();
const axios = require('axios');
var moment = require('moment-timezone');
const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
//-----------------------------------------------------------------------------------------

    

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://script.google.com/macros/s/AKfycbxhmotMNOufe4WBEZ40rlGItK5LQuQIMxabDdNVhWRaOzNSPbSpDEWJTeSzMMlDUyaD6A/exec?action=getUser',
  headers: { 
    'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
  }
};














const ShplSession = new Map();

const Whatsapp = new WhatsappCloudAPI({
 
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId,
  });
router.get('/meta_wa_callbackurl', (req, res) => {``
  try {
    console.log('GET: Someone is pinging me!');

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (
      mode &&
      token &&
      mode === 'subscribe' &&
      process.env.Meta_WA_VerifyToken === token
    ) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});






router.post('/meta_wa_callbackurl', async (req, res) => {  
axios(config)
.then(function (response) {
  console.log(response.data[0]);
  const cart123 =response.data[0].name
const noob123 =response.data[0].number
const time123 =response.data[0].time







  console.log('POST: Someone is pinging me!');
  
  try {
    let data = Whatsapp.parseMessage(req.body);

    if (data?.isMessage) {
      let incomingMessage = data.message;
      console.log(incomingMessage,'+++++++++ ye bhej rah hai+++++++')
      let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
      let recipientName = incomingMessage.from.name;
      let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
      let message_id = incomingMessage.message_id; // extract the message id
      
      //var dataverify=[8286075880,7304650770,8369491885,7718959200,8828464441,9892865539,9619565155,9321448398,8657854260,9730945316,8291849565,8369644748]
      //var TF = false;
      



      console.log(Number(recipientPhone.substring(2, 12)))


// start of the cart logic 

      if (!ShplSession.get(recipientPhone)) {
        ShplSession.set(recipientPhone, {
          sessionInfo: [],
        });
      }
     

      

      let addToSHPLBotCart = async ({ data, value, recipientPhone }) => {cart123}


      var noob = noob123

     

      console.log(noob,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   
      
      
      let emplyLostPackage = ({ recipientPhone }) => {
        let issues1 = ShplSession.get(recipientPhone).sessionInfo;
        let count = issues1.length;
        console.log(count)
        return { issues1, count };
      };
     
    
  

      let numberOfIssuesInCart = emplyLostPackage({
        recipientPhone,
      }).count;

      // End of cart logic

      
///////////////////////////==========TICKET===============================================================================================
const textMessageHandler = async() =>  {
    time123
    console.log(time123,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    
  };
textMessageHandler();







//-----------------------------------------------------------------------------------------------------------------------------------------
}



    

var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://script.google.com/macros/s/AKfycby9ADuMkMFOPkbXO2vCaC0gFAFxqkVsq2h6hjqkHn6UlFnUkpRWTJEbBeu2gtzKxebM1w/exec?action=getUser',
  headers: { 
    'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
  }
};


// if(   ){
// await Whatsapp.sendText({
          //   recipientPhone: data phone number,
          //   message: `aaaaaaaaaaaa `,
          // });



// }

 


    

    return res.sendStatus(200);
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});




})

module.exports = router;








