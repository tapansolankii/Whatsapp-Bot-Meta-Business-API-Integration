'use strict';
const router = require('express').Router();
var axios = require('axios');
var moment = require('moment-timezone');
const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
//-----------------------------------------------------------------------------------------
// to be continus after words


//-----------------------------------------------------------------------------------------
const Whatsapp = new WhatsappCloudAPI({
 
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_wabaId,
});


// var product_name = {
//   method: 'get',
//   url: 'https://script.google.com/macros/s/AKfycbzNEFCbJdJyZ_r9Wk9C_vx-Fg6JHExHpFi31uSefoiYdeJYnSa4enveDVMsOcMqMRnh/exec?action=getUser',
//   headers: { 
//     'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
//   }
// };



const ShplSession = new Map();

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
      
      var dataverify=[8286075880,8097247810,8291211982,9136827371,7208550653,8855028635,7304650770,8369491885,7718959200,8828464441,9892865539,9619565155,9321448398,8657854260,9730945316,8291849565,8369644748]
      var TF = false;
      

TF = dataverify.includes(Number(recipientPhone.substring(2, 12)));

      console.log(TF,Number(recipientPhone.substring(2, 12)))


// start of the cart logic 

      if (!ShplSession.get(recipientPhone)) {
        ShplSession.set(recipientPhone, {
          sessionInfo: [],
        });
      }
      

      let addToSHPLBotCart = async ({ data, value, recipientPhone }) => {
        if (value == "number") {
          ShplSession.get(recipientPhone).sessionInfo.push({ number: data });
        } else if (value == "cons") {
          ShplSession.get(recipientPhone).sessionInfo.push({ cons: data });
        } 
        else if (value == "cart_data") {
          ShplSession.get(recipientPhone).sessionInfo.push({ cart_data: data });
        } 
        
        else if (value == "description" ) {
          ShplSession.get(recipientPhone).sessionInfo.push({ description: data });
        } 
        else if (value == "location" ) {
          ShplSession.get(recipientPhone).sessionInfo.push({ location: data });
        } 
       
  
      }
      var shplissue = ShplSession.get(recipientPhone).sessionInfo.reduce(
        function (acc, x) {
          for (var key in x) acc[key] = x[key];
          return acc;
        },
        {}
      );
      console.log(shplissue,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       
      
      
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


  if (incomingMessage.type == 'text_message') {

    let numberOfIssuesInCart = emplyLostPackage({
      recipientPhone,
    }).count;


  
   
    if(incomingMessage.text.body.toUpperCase()==="*APML" && numberOfIssuesInCart ===0){

      let numberOfIssuesInCart = emplyLostPackage({
      recipientPhone,
    }).count;
      ShplSession.set(recipientPhone, {
        sessionInfo: [],
      });

      data = recipientPhone
      let value = "number";
      await addToSHPLBotCart({ data, value, recipientPhone });
      console.log(data, "data inside the cart ")
      


      await Whatsapp.sendSimpleButtons({
      
          message:'Hey! '+recipientName+', \n\nGreetings! We warmly welcome you to the *Agarwal Packers & Movers Ltd.* Attendance Bot. \nThis bot is designed to streamline the attendance process, making it quick and easy for our valued employees/inters. \nThank you for choosing *Agarwal Packers & Movers Ltd.*, where innovation and technology meet to provide you with the best experience.',
          recipientPhone:recipientPhone,
         
          listOfButtons: [
            {
                title: 'IN',
                id: 'in',
            },
            {
                title: 'OUT',
                id: 'out',
            },
         
        ],
        
      })
      
    }
    if( shplissue.cons=='out'&&numberOfIssuesInCart === 2){
      let data = incomingMessage.text.body
        let value = "description";
       await addToSHPLBotCart({ data, value, recipientPhone });
       console.log(data, "data inside the cart ")

      await Whatsapp.sendSimpleButtons({

        
      
        message:' *WOULD YOU LIKE THE CONFIRM YOUR PROCESS*',
        recipientPhone:recipientPhone,
       
        listOfButtons: [
          {
              title: 'YES',
              id: 'Confirm_YES',
          },
          {
              title: 'CANCEL',
              id: 'cancel',
          },
          
      ],
      
    })
    }
    
    
  
//--------------------------------------------------------------------------------------------  









//=========================================================================================================








  await Whatsapp.markMessageAsRead({
    message_id,
  });
}}
//---------------------------------------------------------------------------------------------------










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


module.exports = router;




// var datasend = JSON.stringify({
     
// });








