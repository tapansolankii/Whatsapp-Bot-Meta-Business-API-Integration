'use strict';
const router = require('express').Router();
var axios = require('axios');
var moment = require('moment');
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















const airlineSession = new Map();

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
      
      var dataverify=[8286075880,7304650770,7718959200,8828464441,9892865539,9619565155,9321448398,8657854260,9730945316,8291849565]
      var TF = false;
      

TF = dataverify.includes(Number(recipientPhone.substring(2, 12)));

      console.log(TF,Number(recipientPhone.substring(2, 12)))


// start of the cart logic 

      if (!airlineSession.get(recipientPhone)) {
        airlineSession.set(recipientPhone, {
          sessionInfoo: [],
        });
      }
      

      let addToSHPLBotCart = async ({ data, value, recipientPhone }) => {
        if (value == "a") {
          airlineSession.get(recipientPhone).sessionInfoo.push({ number: data });
        } else if (value == "b") {
          airlineSession.get(recipientPhone).sessionInfoo.push({ cons: data });
        } 
        else if (value == "c") {
          airlineSession.get(recipientPhone).sessionInfoo.push({ cart_data: data });
        } 
        
        else if (value == "d" ) {
          airlineSession.get(recipientPhone).sessionInfoo.push({ description: data });
        } 
        else if (value == "e" ) {
          airlineSession.get(recipientPhone).sessionInfoo.push({ location: data });
        } 
       
  
      }
      var noob1 = airlineSession.get(recipientPhone).sessionInfoo.reduce(
        function (acc, x) {
          for (var key in x) acc[key] = x[key];
          return acc;
        },
        {}
      );
      console.log(noob1,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       
      
      
      let emplyLostPackageee = ({ recipientPhone }) => {
        let issues1 = airlineSession.get(recipientPhone).sessionInfoo;
        let count = issues1.length;
        console.log(count)
        return { issues1, count };
      };
      let numberOfIssuesInCart = emplyLostPackageee({
        recipientPhone,
      }).count;

      // End of cart logic

if(TF){
  if (incomingMessage.type == 'text_message') {

    let numberOfIssuesInCart = emplyLostPackageee({
      recipientPhone,
    }).count;


  
   
    if(incomingMessage.text.body.toUpperCase()==="*APMLAB" && numberOfIssuesInCart ===0){

      let numberOfIssuesInCart = emplyLostPackageee({
      recipientPhone,
    }).count;
      airlineSession.set(recipientPhone, {
        sessionInfoo: [],
      });

      data = recipientPhone
      let value = "a";
      await addToSHPLBotCart({ data, value, recipientPhone });
      console.log(data, "data inside the cart ")
      


      await Whatsapp.sendSimpleButtons({
      
          message:'Hey! '+recipientName+', \n\nGreetings! We warmly welcome you to the *Patel Airlines* Attendance Bot. \n"Hello! Thank you for reaching out to us. Im here to help you raise a complaint ticket. May I know what is the nature of your complaint?".',
          recipientPhone:recipientPhone,
         
          listOfButtons: [
            {
                title: 'Complaint',
                id: 'in',
            },
            {
                title: 'About us',
                id: 'out',
            },
         
        ],
        
      })
      
    }
    if(button_id=='demo_1'&&numberOfIssuesInCart==1){
        data = incomingMessage.button_reply.title
        let value = "b";
        await addToSHPLBotCart({ data, value, recipientPhone });
        console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")

        let listOfSections = [
          {     
            title: `Demos`,
            headers: `Wyaapar`,
            rows: [
              {
                id: "demon_1",
                title: "Flight delay or cancellation",
                
              },
              {
                id: "demon_2",
                title: "Lost or damaged baggage",
                
              },
              {
                id: "demon_3",
                title: "Poor in-flight service",
                
              },
              {
                id: "demon_4",
                title: "Overbooking",
             
              },
              {
                id: "demon_5",
                title: "Inadequate compensation for flight issues",
                
              },
              {
                id: "demon_6",
                title: "Inefficient check-in process",
                
              },
              {
                id: "demon_7",
                title: "Poor customer service from staff",
                
              },
              {
                id: "demon_8",
                title: "Hidden fees and charges",
                
              },
              {
                id: "demon_9",
                title: "other",
                
              },
              
              
            ],
          },
        ];
        Whatsapp.sendRadioButtons({
          recipientPhone: recipientPhone,
          headerText: `Hey `+recipientName+ '👋',
          bodyText: `Please select  the complaint\n\nClick below 👇`,
          footerText: `© Patel Airlines`,
          listOfSections,
          headers: `hello`,
        });
        // var axios = require('axios');
        // var yes_catalogue = JSON.stringify({
        //   "messaging_product": "whatsapp",
        //   "recipient_type": "individual",
        //   "to": recipientPhone,
        //   "type": "interactive",
        //   "interactive": {
        //     "type": "product_list",
        //     "header": {
        //       "type": "text",
        //       "text": "Product"
        //     },
        //     "body": {
        //       "text": "Here Demo "
        //     },
        //     "footer": {
        //       "text": "© 2022 leveledge technologies Private Limited"
        //     },
        //     "action": {
        //       "catalog_id": "539108381203114",
        //       "sections": [
        //         {
        //           "title": "Clothing",
        //           "product_items": [
        //             {
        //               "product_retailer_id": "a12345"
        //             },
        //             {
        //               "product_retailer_id": "l456"
        //             },
        //             {
        //               "product_retailer_id": "12345"
        //             },
        //             {
        //               "product_retailer_id": "a9kj5p00e0"
        //             },
        //             {
        //               "product_retailer_id": "ty77"
        //             },
        //             {
        //               "product_retailer_id": "xe30"
        //             },
        //             {
        //               "product_retailer_id": "rq76"
        //             }
        //           ]
        //         }
        //         // {
        //         //   "title": " Section B",
        //         //   "product_items": [
        //         //     {
        //         //       "product_retailer_id": "sc99euen8x"
        //         //     },
        //         //     {
        //         //       "product_retailer_id": "v35l1u9uvn"
        //         //     },
        //         //     {
        //         //       "product_retailer_id": "12345"
        //         //     }
        //         //   ]
        //         // }
        //       ]
        //     }
        //   }
        // });

        // var config = {
        //   method: 'post',
        //   url: 'https://graph.facebook.com/v15.0/100694566237841/messages',
        //   headers: headers,
        //   data: yes_catalogue
        // };

        // axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

      }
    
    
  }
//--------------------------------------------------------------------------------------------  

  if (typeOfMsg === 'simple_button_message') {
    let button_id = incomingMessage.button_reply.id;
    
    let numberOfIssuesInCart = emplyLostPackageee({
      recipientPhone,
    }).count;

    if(button_id === 'in' &&button_id!='out' && numberOfIssuesInCart === 1){
      let data = button_id
      let value = "b";
      await addToSHPLBotCart({ data, value, recipientPhone });
      console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")


      await Whatsapp.sendSimpleButtons({
      
        message:' *WOULD YOU LIKE TO CONFIRM YOUR PROCESS*',
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
  if ( numberOfIssuesInCart === 2) {

      let value = "e";
      let lat = incomingMessage.location.latitude
      let long = incomingMessage.location.longitude
      let data = "https://www.google.com/maps/place/" + lat + "," + long
       await addToSHPLBotCart({ data, value, recipientPhone });
       console.log(data, "data inside the cart ")
       
       var noob1 = airlineSession.get(recipientPhone).sessionInfoo.reduce(
                  //  noob1 =new noob1(),
                  function (acc, x) {
                    for (var key in x) acc[key] = x[key];
                    console.log(x,"%%%%%%%%%%%%%%%%")
                    return acc;
                  },
                  {}      
                );
               
                console.log(noob1,"THIS IS THE FINAL DATA")
                var date1 = moment.unix(incomingMessage.timestamp).format("DD/MM/YY");
                var time1 = moment.unix(incomingMessage.timestamp).format("hh:mm A");


                var data111 = JSON.stringify({
                  "name": recipientName,
                  "number": noob1.a,
                  "time": time1,
                  "date": date1,
                  "complaint": noob1.b,
                  
                  
                });
                
                var config = {
                  method: 'post',
                maxBodyLength: Infinity,
                  url: 'https://script.google.com/macros/s/AKfycbwFop3sIJLgGERp0bILk1dFPEV3s6ppxj9XXqzom0fJUBNXeJh2j9_B706qsUriQ4DhOg/exec?action=addUser3',
                  headers: { 
                    'Content-Type': 'application/json', 
                    'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
                  },
                  data : data111
                };
                
                axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                  airlineSession.set(recipientPhone, {
                    sessionInfoo: [],
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
      message: `✅ Your complaint have been successfully registered with us!\n Thank you for your participation. \n \n*- Patel Airlines, fly high*`,
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

 


    

    return res.sendStatus(200);
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});


module.exports = router;




// var datasend = JSON.stringify({
     
// });