'use strict';
const router = require('express').Router();
var axios = require('axios');
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
      
      var dataverify=[8286075880,7304650770,7718959200]
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
      var noob = ShplSession.get(recipientPhone).sessionInfo.reduce(
        function (acc, x) {
          for (var key in x) acc[key] = x[key];
          return acc;
        },
        {}
      );
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

if(TF){
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
    if( noob.cons=='out'&&numberOfIssuesInCart === 2){
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
    
    
  }
//--------------------------------------------------------------------------------------------  

  if (typeOfMsg === 'simple_button_message') {
    let button_id = incomingMessage.button_reply.id;
    
    let numberOfIssuesInCart = emplyLostPackage({
      recipientPhone,
    }).count;

    if(button_id === 'in' &&button_id!='out' && numberOfIssuesInCart === 1){
      let data = button_id
      let value = "cons";
      await addToSHPLBotCart({ data, value, recipientPhone });
      console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")


      await Whatsapp.sendSimpleButtons({
      
        message:' *WOULD YOU YOU THE CONFIRM YOUR PROCESS*',
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
    if(button_id === 'Confirm_YES' && numberOfIssuesInCart === 2 || numberOfIssuesInCart === 3){
      let data = button_id
      let value = "cart_data";
       await addToSHPLBotCart({ data, value, recipientPhone });
       console.log(data, "data inside the cart ")
      
      await Whatsapp.sendText({
        message: `Please provide  current location from Whatsapp`,
        recipientPhone: recipientPhone

      });


    }
    if(button_id =='cancel'&& numberOfIssuesInCart===2){
      
      await Whatsapp.sendText({
        message:"We apologize for any inconvenience caused.Please Restart the flow by again typing *apml*",
        recipientPhone: recipientPhone
      })
      ShplSession.set(recipientPhone, {
        sessionInfo: [],
      });
    }
    if(button_id=='out'){
       let data = button_id
      let value = "cons";
      await addToSHPLBotCart({ data, value, recipientPhone });
      console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")
      await Whatsapp.sendText({
          message:'Please tell me the Work you have done',
          recipientPhone: recipientPhone

      })
    }
  }
  if (typeOfMsg === "location_message" && numberOfIssuesInCart === 3 || numberOfIssuesInCart === 4) {

      let value = "location";
      let lat = incomingMessage.location.latitude
      let long = incomingMessage.location.longitude
      let data = "https://www.google.com/maps/place/" + lat + "," + long
       await addToSHPLBotCart({ data, value, recipientPhone });
       console.log(data, "data inside the cart ")
       
       var noob = ShplSession.get(recipientPhone).sessionInfo.reduce(
                  //  noob =new noob(),
                  function (acc, x) {
                    for (var key in x) acc[key] = x[key];
                    console.log(x,"%%%%%%%%%%%%%%%%")
                    return acc;
                  },
                  {}      
                );
               
                console.log(noob,"THIS IS THE FINAL DATA")
                var data111 = JSON.stringify({
                  "name": recipientName,
                  "number": noob.number,
                  "time": "xxxx",
                  "date": new Date().toLocaleString(),
                  "tofrom": noob.cons,
                  "location" :noob.location,
                  "desc":noob.description,
                });
                
                var config = {
                  method: 'post',
                maxBodyLength: Infinity,
                  url: 'https://script.google.com/macros/s/AKfycbwvlXE4R2_ueKeJBmZXlbnkdxkH5e1cMQv9y7zm7AJk6Y7tZMxxPW6yC32AXRdbh8ueRQ/exec?action=addUser',
                  headers: { 
                    'Content-Type': 'application/json', 
                    'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
                  },
                  data : data111
                };
                
                axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                  ShplSession.set(recipientPhone, {
                    sessionInfo: [],
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });
                
              
                  
    

    
    // let value = "address";

    
    // await addToSHPLBotCart({ data, value, recipientPhone });
    // console.log(recipientPhone, "aa")
 
    await Whatsapp.sendText({

      recipientPhone: recipientPhone,
      message: `✅ Your location and attendance have been successfully registered with us!\n Thank you for your participation. \n \n*- Agarwal Packers & Movers Ltd. makes moving easier, with good carings*`,
    });

    

    
    
   
  }
  await Whatsapp.markMessageAsRead({
    message_id,
  });
}else{
  Whatsapp.sendText({
    recipientPhone:recipientPhone,
    message:"You dont have any right *Please Contact to Team* "
  })
}}
//---------------------------------------------------------------------------------------------------










// if(   ){
// await Whatsapp.sendText({
          //   recipientPhone: data phone number,
          //   message: `aaaaaaaaaaaa `,
          // });



// }

  var numberkobhejnahai=[918286075880,917718959200,917304650770]

  console.log(numberkobhejnahai)
      
  
     Whatsapp.sendText({
        recipientPhone: numberkobhejnahai[i],
        message: `aaaaaaaaaaaa `,
      });



    

    return res.sendStatus(200);
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});


module.exports = router;




// var datasend = JSON.stringify({
     
// });







