'use strict';
const router = require('express').Router();
const axios = require('axios');
var moment = require('moment-timezone');
const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
const { 
    sendListItems, 
    sendTextMessageToClient, 
    sendMessageAsRead,
    sendRadioButtons,
    sendButtonMessageToClient  } = require('./messages.js')
//-----------------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------------
const Whatsapp = new WhatsappCloudAPI({
 
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_wabaId,
});




const ShplSession = new Map();
const todoSession = new Map();

const Session = new Map()


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
      
      var dataverify=[8286075880,7304650770,8369491885,7718959200,8828464441,9892865539,9619565155,9321448398,8657854260,9730945316,8291849565,8369644748]
      var TF = false;
      

TF = dataverify.includes(Number(recipientPhone.substring(2, 12)));

      console.log(TF,Number(recipientPhone.substring(2, 12)))


// start of the cart logic 

      if (!ShplSession.get(recipientPhone)) {
        ShplSession.set(recipientPhone, {
          sessionInfo: [],
        });
      }
      if (!Session.get(recipientPhone)) {
        Session.set(recipientPhone, {
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
    let addTotodoBotCart2 = async ({ data, value, recipientPhone }) => {
        if (value == "1") {
          todoSession.get(recipientPhone).sessionInfo.push({ todoa: data });
        } else if (value == "2") {
            todoSession.get(recipientPhone).sessionInfo.push({ todob: data });
        } 
        else if (value == "3") {
            todoSession.get(recipientPhone).sessionInfo.push({ todoc: data });
        } 
        
        else if (value == "4" ) {
            todoSession.get(recipientPhone).sessionInfo.push({ todoe: data });
        } 
        else if (value == "5" ) {
            todoSession.get(recipientPhone).sessionInfo.push({ todof: data });
        } 
       
  
      }


      var noob = ShplSession.get(recipientPhone).sessionInfo.reduce(
        function (acc, x) {
          for (var key in x) acc[key] = x[key];
          return acc;
        },
        {}
      );

      var noob2 = Session.get(recipientPhone).sessionInfo.reduce(
        function (acc, x) {
          for (var key in x) acc[key] = x[key];
          return acc;
        },
        {}
      );

      console.log(noob,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      console.log(noob2,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
      
      
      let emplyLostPackage = ({ recipientPhone }) => {
        let issues1 = ShplSession.get(recipientPhone).sessionInfo;
        let count = issues1.length;
        console.log(count)
        return { issues1, count };
      };
      let emplyLostPackage2 = ({ recipientPhone }) => {
        let issues1 = Session.get(recipientPhone).sessionInfo;
        let count = issues1.length;
        console.log(count)
        return { issues1, count };
      };
      let numberOfIssuesInCart2 = emplyLostPackage2({
        recipientPhone,
      }).count;

      let numberOfIssuesInCart = emplyLostPackage({
        recipientPhone,
      }).count;

      // End of cart logic
///////////attendance bot
if(TF){
  if (incomingMessage.type == 'text_message') {

    let numberOfIssuesInCart = emplyLostPackage({
      recipientPhone,
    }).count;


    console.log(numberOfIssuesInCart, "hello")
   
    if(incomingMessage.text.body.toUpperCase()==="*APML" && numberOfIssuesInCart ===0){

      
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
// //--------------------------------------------------------------------------------------------  

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
    if(button_id === 'Confirm_YES' && numberOfIssuesInCart === 2 ||button_id === 'Confirm_YES'  ){
      let data = button_id
      let value = "cart_data";
       await addToSHPLBotCart({ data, value, recipientPhone });
       console.log(data, "data inside the cart ")
      
      await Whatsapp.sendText({
        message: `Please provide current location from Whatsapp`,
        recipientPhone: recipientPhone

      });


    }
    if(button_id =='cancel'&& numberOfIssuesInCart===2 ||button_id =='cancel'&& numberOfIssuesInCart === 3){
      
      await Whatsapp.sendText({
        message:"We apologize for any inconvenience caused.Please Restart the flow by again typing '*apml'",
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
          message:'Please tell me what all Work you have done and how was your day with APML 😊',
          recipientPhone: recipientPhone

      })
    }
  }
  if (typeOfMsg === "location_message" && numberOfIssuesInCart === 3 || typeOfMsg === "location_message" && numberOfIssuesInCart === 4) {

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
                moment.tz.setDefault('Asia/Kolkata');
                const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');


                var data111 = JSON.stringify({
                  "name": recipientName,
                  "number": noob.number,
                  "time": currentTime,
                  "date": currentTime,
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
                var axios = require('axios');
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
}
///////////endszz
///////////////////////////==========TICKET===============================================================================================
if (incomingMessage.type == 'text_message'){
    let numberOfIssuesInCart = emplyLostPackage({
        recipientPhone,
      }).count;
  
  
    if(incomingMessage.text.body.toUpperCase()==="*TICKETING" ){





        ShplSession.set(recipientPhone, {
            sessionInfo: [],
          });
  
        data = recipientPhone
        let value = "number";
         addToSHPLBotCart({ data, value, recipientPhone });
        console.log(data, "data inside the cart ")
        
  


         await Whatsapp.sendSimpleButtons({
        
          message:'Hey! '+recipientName+', \n\nGreetings! We warmly welcome you to the *Patel Airlines* Ticketing Bot. \n*Thank you* for reaching out to us. I am here to help you raise a complaint ticket!.\nLet me know about the issues?".',
          recipientPhone:recipientPhone,
         
          listOfButtons: [
            {
                title: 'Complaint',
                id: 'Complaint',
            },
            {
                title: 'About us',
                id: 'AboutUS',
            },
         
        ],
        
      })

  
        
        
      }
      
}
if (typeOfMsg === 'simple_button_message') {
    let button_id = incomingMessage.button_reply.id;
    
   if(button_id === 'AboutUS'&& numberOfIssuesInCart === 1){

//


  console.log(JSON.stringify(response.data));


  ShplSession.set(recipientPhone, {
    sessionInfo: [],
  });



 
  



//--------------------------------------------------------------------



      

   }
   if(button_id === 'Complaint'&& numberOfIssuesInCart === 1){

    let listOfSections = [
        {
          title: `Complain list`,
          headers: `Complain list`,
          rows: [
            {
              id: "1",
              title: " product damage",
              description: "xxxxxxxxxxx",
            },
            {
              id: "2",
              title: "gaurentee/warentee",
              description: "xxxxxxxxxx",
            },
            {
                id: "3",
                title: "product Billing",
                description: "xxxxxxxxxx",
              },
              {
                id: "4",
                title: "Contact-CustomerCare",
                description: "xxxxxxxxxx",
              },
            
          ],
        },
      ];
    await Whatsapp.sendRadioButtons({
        recipientPhone: recipientPhone,
        headerText: `Patel Airlanes`,
        bodyText: `\n\n Hey `+recipientName+ '👋',
        footerText: `© 2022 AUTOWHAT`,
        listOfSections,
        headers: `Please select your issue in the following list`,
      });
      data = recipientName
        let value = "cons";
        await addToSHPLBotCart({ data, value, recipientPhone });
        console.log(data, "data inside the cart ")
    
      

   }

}
if (typeOfMsg === 'radio_button_message') {
    let selectionId = incomingMessage.list_reply.id; 

    

    if(selectionId === '1' ||selectionId === '2'&& numberOfIssuesInCart === 2 ||selectionId === '3'&& numberOfIssuesInCart === 2 ||selectionId === '4' && numberOfIssuesInCart === 2){
        let data = incomingMessage.list_reply.title;
        let value = "cart_data";
        await addToSHPLBotCart({ data, value, recipientPhone });
        console.log(data, "data inside the cart ")
        
       
        await Whatsapp.sendText({
            message:"Thank your Complain ticket has been submit to our System and Repestive Representative will contact you soon from our Team\n*Thank You*",
            recipientPhone: recipientPhone
          })
          console.log(noob,"aaaaaaaaaaaaaaaaaaaaaaaaayehhhhhhhhh")
          ShplSession.set(recipientPhone, {
            sessionInfo: [],
          });
}

  }


//====================================TICKET==============================================================================================
////========================================Ordermeal=====================================================================================
if (incomingMessage.type == 'text_message'){

    let numberOfIssuesInCart = emplyLostPackage({
        recipientPhone,
      }).count;

      if(incomingMessage.text.body.toUpperCase()==="*Ordermeal" ){


        ShplSession.set(recipientPhone, {
            sessionInfo: [],
          });
          data = recipientPhone
          let value = "number";
           addToSHPLBotCart({ data, value, recipientPhone });
          console.log(data, "data inside the cart ")


          await Whatsapp.sendSimpleButtons({
        
            message:'Hey! '+recipientName+', \n\nGreetings! We warmly welcome you to the *Patel Airlines* Meal Bot. \n*Thank you* for reaching out to us. I am here to help you raise a complaint ticket!.\nLet me know about the issues?".',
            recipientPhone:recipientPhone,
           
            listOfButtons: [
              {
                  title: 'Veg',
                  id: 'veg',
              },
              {
                  title: 'Non-veg',
                  id: 'nonveg',
              },
           
          ],
          
        })




      }





}
if (typeOfMsg === 'simple_button_message') {
    let numberOfIssuesInCart = emplyLostPackage({
        recipientPhone,
      }).count;
    let button_id = incomingMessage.button_reply.id;
    if(button_id === 'veg'&& numberOfIssuesInCart === 1){

        data = "veg"
        let value = "cons";
         addToSHPLBotCart({ data, value, recipientPhone });
        console.log(data, "data inside the cart ")

        let listOfSections = [
            {
              title: `Complain list`,
              headers: `Complain list`,
              rows: [
                {
                  id: "1",
                  title: " product damage",
                  description: "xxxxxxxxxxx",
                },
                {
                  id: "2",
                  title: "gaurentee/warentee",
                  description: "xxxxxxxxxx",
                },
                {
                    id: "3",
                    title: "product Billing",
                    description: "xxxxxxxxxx",
                  },
                  {
                    id: "4",
                    title: "Contact-CustomerCare",
                    description: "xxxxxxxxxx",
                  },
                
              ],
            },
          ];
        await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `Patel Airlanes`,
            bodyText: `\n\n Hey `+recipientName+ '👋',
            footerText: `© 2022 AUTOWHAT`,
            listOfSections,
            headers: `Please select your issue in the following list`,
          });

    }
    if(button_id === 'nonveg'&& numberOfIssuesInCart === 1){

        data = "nonveg"
        let value = "cons";
         addToSHPLBotCart({ data, value, recipientPhone });
        console.log(data, "data inside the cart ")

        let listOfSections = [
            {
              title: `Complain list`,
              headers: `Complain list`,
              rows: [
                {
                  id: "1",
                  title: " product damage",
                  description: "xxxxxxxxxxx",
                },
                {
                  id: "2",
                  title: "gaurentee/warentee",
                  description: "xxxxxxxxxx",
                },
                {
                    id: "3",
                    title: "product Billing",
                    description: "xxxxxxxxxx",
                  },
                  {
                    id: "4",
                    title: "Contact-CustomerCare",
                    description: "xxxxxxxxxx",
                  },
                
              ],
            },
          ];
        await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `Patel Airlanes`,
            bodyText: `\n\n Hey `+recipientName+ '👋',
            footerText: `© 2022 AUTOWHAT`,
            listOfSections,
            headers: `Please select your issue in the following list`,
          });



    }




}


if (typeOfMsg === 'radio_button_message') {
    let selectionId = incomingMessage.list_reply.id; 

    

    if(selectionId === '1' ||selectionId === '2'&& numberOfIssuesInCart === 2 ||selectionId === '3'&& numberOfIssuesInCart === 2 ||selectionId === '4' && numberOfIssuesInCart === 2){
        let data = incomingMessage.list_reply.title;
        let value = "cart_data";
        await addToSHPLBotCart({ data, value, recipientPhone });
        console.log(data, "data inside the cart ")
        
       
        await Whatsapp.sendText({
            message:"Thank your Complain ticket has been submit to our System and Repestive Representative will contact you soon from our Team\n*Thank You*",
            recipientPhone: recipientPhone
          })
          console.log(noob,"aaaaaaaaaaaaaaaaaaaaaaaaayehhhhhhhhh")
          ShplSession.set(recipientPhone, {
            sessionInfo: [],
          });
}

  }



////========================================Ordermeal=====================================================================================


//====================================APPOINTMENT======================================================================================
   
if (incomingMessage.type == 'text_message'){
//   let numberOfIssuesInCart = emplyLostPackage({
//       recipientPhone,
//     }).count;


//   if(incomingMessage.text.body.toUpperCase()==="*APPOINTMENT" ){

//       ShplSession.set(recipientPhone, {
//           sessionInfo: [],
//         });

//       data = recipientPhone
//       let value = "number";
//       await addToSHPLBotCart({ data, value, recipientPhone });
//       console.log(data, "data inside the cart ")
//       var axios = require('axios');
//       var data12345 = JSON.stringify({
//         "messaging_product": "whatsapp",
//         "to": recipientPhone,
//         "type": "sticker",
//         "sticker": {
//           "id": "1323513971806138"
//         }
//       });
      
//       var config = {
//         method: 'post',
//       maxBodyLength: Infinity,
//         url: 'https://graph.facebook.com/v15.0/106310482392033/messages',
//         headers: { 
//           'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxx', 
//           'Content-Type': 'application/json'
//         },
//         data : data12345
//       };
      
//       axios(config)
//       .then(function (response) {
//         console.log(JSON.stringify(response.data));

//         Whatsapp.sendSimpleButtons({
      
//           message:'Hey! '+recipientName+', \n\nGreetings! We warmly welcome you to the *APPOINTMENT BOT*. \n*Thank you* for reaching out to us,lets begin to schedule your appointment!',
//           recipientPhone:recipientPhone,
         
//           listOfButtons: [
//             {
//                 title: 'Book An Apointment',
//                 id: 'Appointment',
//             },
//             {
//                 title: 'About us',
//                 id: 'AboutUS',
//             },
         
//         ],
        
//       })
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
      
         

//     // })
//     // .catch(function (error) {
//     //     console.log(error);
//     // });
      


      
      
//     }
    
}
if (typeOfMsg === 'simple_button_message'){
  let button_id = incomingMessage.button_reply.id;
  if(button_id === 'Appointment'&& numberOfIssuesInCart === 1){
          data = "Appointment"
          let value = "cons";
          await addToSHPLBotCart({ data, value, recipientPhone });
          console.log(data, "data inside the cart ")


          function getDatesOfCurrentWeek() {
            // Create a new date object for the current date
            const now = new Date();
          
            // Calculate the day of the week (0-6)
            const dayOfWeek = now.getDay();
          
            // Calculate the number of days between the current date and the first day of the week
            const dayDiff = now.getDate();
          
            // Get the date for the first day of the week
            const firstDateOfWeek = new Date(now.getFullYear(), now.getMonth(), dayDiff);
          
            // Create an array to hold the dates of the week
            const dates = [];
          
            // Loop through the 7 days of the week and add the date to the array
            for (let i = 0; i < 7; i++) {
              const d = new Date(firstDateOfWeek);
              d.setDate(d.getDate() + i);
              dates.push(d);
            }
          
            return dates;
          }
          
          function formatDate(date) {
            // Use the toLocaleDateString method to format the date
            const formattedDate = date.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'});
          
            // Use the toLocaleString method to get the name of the day
            const dayName = date.toLocaleString('en-GB', {weekday: 'long'});
          
            return `${formattedDate} - ${dayName}`;
          }
          
          // Get the dates for the current week
          const dates = getDatesOfCurrentWeek();
          
          // Format the dates as "dd/mm/yyyy - day"
          const formattedDates = dates.map(date => formatDate(date));
          
          // Output the formatted dates
          formattedDates.forEach(formattedDate => console.log(formattedDate));
          
          var date_list=[];

            for(var i=0; i<formattedDates.length; i++) {
              var object={
                id:formattedDates[i],
                title:formattedDates[i].split(" - ")[0],
                description:formattedDates[i].split(" - ")[1],
              }
              date_list.push(object)
            }
            
          let listOfSections = [
            {
              title: `Appointment Times Slots `,
              headers: `hello`,
              rows:date_list ,
            },
          ];

          Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `${recipientName}`,
            bodyText: `Our slot appointment system makes it easy to schedule and reserve your time with us. Simply choose the service you'd like to book, select a date and time, and follow the prompts to complete your booking with appointment quickly.\n\nPlease select one of the slot below:`,
            footerText: 'Powered by: AutoWhat ',
            listOfSections,
        });
        

      

      
  
     }
     if (button_id == 'Stage_1'&&numberOfIssuesInCart==3) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: 'https://script.google.com/macros/s/AKfycbxto5oogwx8424EzIL5trUw-DyWt-CzkPzGs1lw-gxYjByqSGIrOMJkSm0lIWYCbeNetQ/exec?action=getUser',
        headers: { 
          'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
        }
      };
      var array_slots=[];
      var dataArray=[];
      var slots_name=[];
      var slots_title=[];
      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        for(var j=0;j<response.data.length;j++){
          if(noob.cart_data.split(' - ')[0]==response.data[j].date){
              slots_title.push(response.data[j])
        }
      }
      for(var i=0; i<slots_title.length; i++){
        array_slots.push(slots_title[i])
        if(slots_title[i].availability_1=='AVAILABLE'){
          var object={
            id:slots_title[i].slot,
            title:slots_title[i].stage_1,
            description:slots_title[i].title,
          }
          slots_name.push(object) 
          console.log(slots_name,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        }
        
      }
      // console.log(slots_title)
      
      for (const element of array_slots) {
        if(element.availability_1=='AVAILABLE'){
          var   a=(`🛒--${element.slot} 🕝--${element.stage_1} `);
        
          
          dataArray.push(a +" \n");
         
        }
      

         }
         console.log(dataArray,'-----------',slots_name)



         let listOfSections = [
          {
            title: `IssueFor`,
            headers: `hello`,
            rows:slots_name ,
          },
        ];
       Whatsapp.sendText({
        recipientPhone: recipientPhone,
        message:'Simply choose the activity or service you do like to book, select a date and time, and follow the prompts to complete your appointment. \n *Available slots:-* \n'+dataArray+'\n'
      })
      


     Whatsapp.sendRadioButtons({
      recipientPhone: recipientPhone,
      headerText: `#slot Available:`,
      bodyText: `\n\nPlease select one of the slot below:`,
      footerText: '@Powered by: AutoWhat ',
      listOfSections,
  });
      
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    if (button_id == 'Stage_2'&&numberOfIssuesInCart==3) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: 'https://script.google.com/macros/s/AKfycbxto5oogwx8424EzIL5trUw-DyWt-CzkPzGs1lw-gxYjByqSGIrOMJkSm0lIWYCbeNetQ/exec?action=getUser',
        headers: { 
          'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
        }
      };
      var array_slots=[];
      var dataArray=[];
      var slots_name=[];
      var slots_title=[];
      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        for(var j=0;j<response.data.length;j++){
          if(noob.cart_data.split(' - ')[0]==response.data[j].date){
              slots_title.push(response.data[j])
        }
      }
      for(var i=0; i<slots_title.length; i++){
        array_slots.push(slots_title[i])
        if(slots_title[i].availability_2=='AVAILABLE'){
          var object={
            id:slots_title[i].slot,
            title:slots_title[i].stage_2,
            description:slots_title[i].title,
          }
          slots_name.push(object)
        }
        
      }
      // console.log(slots_title)
      
      for (const element of array_slots) {
        if(element.availability_2=='AVAILABLE'){
          var   a=(`🛒--${element.slot} 🕝--${element.stage_2} `);
        
          
          dataArray.push(a +" \n");
         
        }
      

         }
         console.log(dataArray,'-----------',slots_name)



         let listOfSections = [
          {
            title: `IssueFor`,
            headers: `hello`,
            rows:slots_name ,
          },
        ];
       Whatsapp.sendText({
        recipientPhone: recipientPhone,
        message:'Simply choose the activity or service you do like to book, select a date and time, and follow the prompts to complete your appointment. \n *Available slots:-* \n'+dataArray+'\n'
      })
      


     Whatsapp.sendRadioButtons({
      recipientPhone: recipientPhone,
      headerText: `#slot available:`,
      bodyText: `\n\nPlease select one of the slot below:`,
      footerText: '@Powered by: AutoWhat ',
      listOfSections,
  });
      
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    if (button_id == 'Stage_3'&&numberOfIssuesInCart==3) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: 'https://script.google.com/macros/s/AKfycbxto5oogwx8424EzIL5trUw-DyWt-CzkPzGs1lw-gxYjByqSGIrOMJkSm0lIWYCbeNetQ/exec?action=getUser',
        headers: { 
          'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
        }
      };
      var array_slots=[];
      var dataArray=[];
      var slots_name=[];
      var slots_title=[];
      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        for(var j=0;j<response.data.length;j++){
          if(noob.cart_data.split(' - ')[0]==response.data[j].date){
              slots_title.push(response.data[j])
        }
      }
      for(var i=0; i<slots_title.length; i++){
        array_slots.push(slots_title[i])
        if(slots_title[i].availability_3=='AVAILABLE'){
          var object={
            id:slots_title[i].slot,
            title:slots_title[i].stage_3,
            description:slots_title[i].title,
          }
          slots_name.push(object)
        }
        
      }
      // console.log(slots_title)
      
      for (const element of array_slots) {
        if(element.availability_3=='AVAILABLE'){
          var   a=(`🛒--${element.slot} 🕝--${element.stage_3} `);
        
          
          dataArray.push(a +" \n");
         
        }
      

         }
         console.log(dataArray,'-----------',slots_name)



         let listOfSections = [
          {
            title: `IssueFor`,
            headers: `hello`,
            rows:slots_name ,
          },
        ];
       Whatsapp.sendText({
        recipientPhone: recipientPhone,
        message:'Simply choose the activity or service you do like to book, select a date and time, and follow the prompts to complete your appointment. \n *Available slots:-* \n'+dataArray+'\n'
      })
      


     Whatsapp.sendRadioButtons({
      recipientPhone: recipientPhone,
      headerText: `#slot available:`,
      bodyText: `\n\nPlease select one of the slot below:`,
      footerText: '@Powered by: AutoWhat',
      listOfSections,
  });
      
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    if (button_id ==='confirm_appointment'&& numberOfIssuesInCart === 4) {
      console.log(noob,"aaaaaaaaaaaaaaaaaa")

    var axios = require('axios');
    var data2222 = JSON.stringify({
      "DATE":noob.cart_data.split(' - ')[0],
      "SLOT": noob.description,
      "PURPOSE": "book",
      "MOBILE_NUMBER":noob.number.split(',')[0]
    });
    console.log(data2222)
    var config = {
      method: 'post',
      url: 'https://script.google.com/macros/s/AKfycbxto5oogwx8424EzIL5trUw-DyWt-CzkPzGs1lw-gxYjByqSGIrOMJkSm0lIWYCbeNetQ/exec?action=addUser2',
      headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
      },
      data : data2222
    };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
         Whatsapp.sendText({
          recipientPhone:recipientPhone,
          message:"Your Appointment is Sheduled with the Respective Person\n*Thank You*"
      })
      })
      .catch(function (error) {
        console.log(error);
      });
      ShplSession.set(recipientPhone, {
          sessionInfo: [],
        });



    
    
    

    
    


     
     
    }

  }
if (typeOfMsg === "radio_button_message"){
//   if(numberOfIssuesInCart===2&& incomingMessage.interactive.type === 'list_reply' && noob.cons === 'Appointment'){

//       data = incomingMessage.list_reply.id
//       let value = "cart_data";
//       await addToSHPLBotCart({ data, value, recipientPhone });
//       console.log(data, "data inside the cart ")


//       await Whatsapp.sendSimpleButtons({
//           message: 'Hey! '+recipientName+ '\n'+'*Welcome to our online slot booking system! Here, you can easily browse and reserve time slots for a variety of activities and services*\n' ,
//           recipientPhone: recipientPhone,
//           message_id,
//           listOfButtons: [
//               {
//               title: 'Before noon🕛',
//               id: `Stage_1`,
//               },
//               {
//               title: 'Between noon-5pm🕝',
//               id: 'Stage_2',
//               },{
//               title: 'After evening hour🕒',
//               id: 'Stage_3',
//               }

//           ],
//           });


      

//       }
//       if(numberOfIssuesInCart===3 && incomingMessage.interactive.type){
//           data = incomingMessage.list_reply.title
//             let value = "description";
//             await addToSHPLBotCart({ data, value, recipientPhone });
//             console.log(data, "data inside the cart ")
  
//           await Whatsapp.sendSimpleButtons({
//               recipientPhone: recipientPhone,
//               message: 'To confirm your appointment, please click on the " Confirm " button below. By clicking on this button, you are agreeing to the terms and conditions of our service',
//               listOfButtons: [
//               {
//                   title: 'Confirm Appointment',
//                   id: `confirm_appointment`,
//               }
  
//               ],
//           })
  
//           }



}
//====================================APPOINTMENT======================================================================================


///////////////////////////==========FEEDBACK===============================================================================================
if (typeOfMsg === "text_message") {
  let numberOfIssuesInCart = emplyLostPackage({
        recipientPhone,
  }).count;
  console.log(numberOfIssuesInCart, "hello")
  if (incomingMessage.text.body.toUpperCase() === "FEEDBACK" && numberOfIssuesInCart === 0) {

    ShplSession.set(recipientPhone, {
      sessionInfo: [],
    });

    let header = "Feedback Form"
    let body =
      "👋 Hi there! 😀 We would love ❤️ to hear your feedback 🗣️ on our serviclees. Can you take a moment ⏰ to let us know how we're doing? 😊";
    let button = "Select Options";
    let listOfSections = [
        {
          title: `Give Feedback`,
          headers: `Feedback`,
          rows: [
            {
              id: "1",
              title: "Excellent",
              description: "excellent"
            },
            {
              id: "2",
              title: "Good",
              description: "good"
            },
            {
              id: "3",
              title: "Average",
              description: "average"
            },
            {
              id: "4",
              title: "Bad",
              description: "bad"
            },
            {
              id: "5",
              title: "Very Bad",
              description: "disappointment"
            },
            
          ],
        },
      ];
    await Whatsapp.sendRadioButtons({
        recipientPhone: recipientPhone,
        headerText: header,
        bodyText: body,
        buttonText: button,
        footerText: `© 2022 AUTOWHAT`,
        listOfSections,
      });

    data = recipientPhone
    let value = "number";
    addToSHPLBotCart({ data, value, recipientPhone });
    console.log(data, "data inside the cart ")

  }
} 
else if (typeOfMsg === "radio_button_message") {
  console.log(ShplSession.get(recipientPhone))
  console.log(numberOfIssuesInCart, "hwllo weodl")
  
  if (numberOfIssuesInCart === 1) {
    let message = "";
    let feedback = incomingMessage.list_reply.id;
    console.log(feedback, "helj")
    let value = "cart_data";
    await addToSHPLBotCart({ feedback, value, recipientPhone })
    
    if (feedback === "1" || feedback === "2") {
      message = `👋 Dear ${recipientName}!,\n\n 🙌 Thank you for taking the time ⏱️ to provide your feedback on our WhatsApp bot! We're thrilled to hear that you've had a positive 🌟 experience using it and that it's been helpful to you.`;
    } else if (feedback === "3" ||feedback==="4") {
      message = `👋 Dear ${recipientName}!,\n\n  🙏 Thank you for taking the time to provide your feedback on our WhatsApp bot. . 😀 We're happy to hear that it was helpful, but 😔 sorry to know that your experience was just average.\n\nHope we can do better in the future! 🤞`;
    } else if (feedback === "5"){
      message = `👋 Dear ${recipientName}!,\n\n  🙏 Thank you for 🕰️ taking the time to provide your feedback on our WhatsApp bot. We're sorry to hear 😔 that you had a bad 😞 experience while using it, and we apologize 💔 for any inconvenience or frustration 😤 that this may have caused.`;
    }
    
    await Whatsapp.sendText({
      message: message,
      recipientPhone: recipientPhone
    })
    ShplSession.set(recipientPhone, {
      sessionInfo: [],
    });
    // postToSheet("Sheet1", feedbackSession.get(recipientPhone));
  }
}
      

///////////////////////////==========Issue Registration Bot===============================================================================================
// if (typeOfMsg === "text_message") {
//     let numberOfissuesInCustomerCart = customerIssueSession.get(recipientPhone).length;

//     if (incomingMessage.text.body.toUpperCase() === "HI" && numberOfissuesInCustomerCart === 0) {
//       // const listOfIssues = [
//       //   {
//       //     "title": "Issues",
//       //     "rows": [
//       //       {
//       //         "id": "rto",
//       //         "title": "RTO",
//       //       },
//       //       {
//       //         "id": "advance",
//       //         "title": "Advance",
//       //       },
//       //       {
//       //         "id": "challan",
//       //         "title": "Challan",
//       //       }
//       //     ]
//       //   }
//       // ]
//       // let message = `Hello there! 👋\n\nI'm your friendly 🚛 Truck Driver Support Bot 🤖, ready to assist you with any questions or concerns you may have. Whether you're on the road or taking a break, I'm here to help make your life easier.\n\n🛣️ Please don't hesitate to ask me anything about your truck, routes, or any other related topics. I'm always happy to help! 😊`
//       // sendListItems(recipientPhone, "Support Bot", message, "Issues", listOfIssues)
//       // customerIssueSession.set(recipientPhone, [])
//       // customerIssueSession.get(recipientPhone).push([ "number", recipientPhone ])
      
//       await Whatsapp.sendSimpleButtons({
      
//           message:'Hey! '+recipientName+', \n\nGreetings! We warmly welcome you to the *Agarwal Packers & Movers Ltd.* Attendance Bot. \nThis bot is designed to streamline the attendance process, making it quick and easy for our valued employees/inters. \nThank you for choosing *Agarwal Packers & Movers Ltd.*, where innovation and technology meet to provide you with the best experience.',
//           recipientPhone:recipientPhone,
         
//           listOfButtons: [
//             {
//                 title: 'IN',
//                 id: 'in',
//             },
//             {
//                 title: 'OUT',
//                 id: 'out',
//             },
         
//         ],
        
//       })

//     } else if (numberOfissuesInCustomerCart === 2) {
//         console.log(" in cart ")
//         if (validateVehicleNumber(incomingMessage.text.body.toUpperCase())) {
//             let vehicleNo = incomingMessage.text.body.toUpperCase()
//             // console.log(vehicleNo)
//             customerIssueSession.get(recipientPhone).push([ "vehicleNo", vehicleNo ])

//             let message = `Please send me your current location.`
//             sendTextMessageToClient(message, recipientPhone)

//         }
//         else {
//             sendTextMessageToClient('Invalid vehicle number')
//         }
//     }  
// }
// else if (typeOfMsg === "radio_button_message") {
//   let numberOfissuesInCustomerCart = customerIssueSession.get(recipientPhone).length;

//   if (numberOfissuesInCustomerCart === 1) {
//     let issue = incomingMessage.list_reply.id
//     let message =  `You are facing issue related to ${issue}\n\ncan you tell me what is your vehicle No.?`
//     sendTextMessageToClient(message, recipientPhone)

//     customerIssueSession.get(recipientPhone).push([ "issue", issue ])
//   }
// }
// else if (typeOfMsg === "location_message") {
//     let numberOfissuesInCustomerCart = customerIssueSession.get(recipientPhone).length;

//     if (numberOfissuesInCustomerCart === 1) {
//       const lat = incomingMessage.location.latitude
//       const long = incomingMessage.location.longitude
//       const data = "https://www.google.com/maps/place/" + lat + "," + long
//       customerIssueSession.get(recipientPhone).push([ "location", data ])
//       // console.log(customerIssueSession.get(recipientPhone), 'in cart')

//       const ticketId = getTicketNumber()
//       let message =  `Thanks for providing information.\n\nYour Ticket has been generated\nHere's your Ticket ID: ${ticketId}.\n\n Your Issue will be resolved soon.`
//       sendTextMessageToClient(message, recipientPhone)
//       customerIssueSession.get(recipientPhone).push([ "ticketId", ticketId ])

//       // postToSheet("Sheet1", customerIssueSession.get(recipientPhone))
//       customerIssueSession.set(recipientPhone, [])
//       console.log(customerIssueSession.get(recipientPhone))
//     }

// }
      

      
///////////////////////////==========Ticket Booking Bot===============================================================================================
// if (typeOfMsg === "text_message") {
//   let numberOfIssuesInBookingCart = ticketBookingSession.get(recipientPhone).length;
//   if (
//     incomingMessage.text.body.toUpperCase() === "BOOK" &&
//     numberOfIssuesInBookingCart === 0
//   ) {

//     ticketBookingSession.set(recipientPhone, [])
//     let buttons = [
//       {
//         "type": "reply",
//         "reply": {
//           "id": "railway",
//           "title": "Railway Tickets",
//         }
//       },
//       {
//         "type": "reply",
//         "reply": {
//           "id": "plane",
//           "title": "Plane Tickets",
//         }
//       },
//     ]
//     let message = `👋 Welcome to our ticketing bot! We can help you book ✈️ airline, 🏨 hotel, and 🚆 railway tickets. \n\nSimply tell us what you need and we'll guide you through the booking process step by step. \n\nOur bot is ⚡ fast, 🤖 easy to use, and available 24/7, so you can book your tickets anytime, anywhere. Let's get started! 🚀`
//     sendButtonMessageToClient(recipientPhone, message, buttons)
//     ticketBookingSession.get(recipientPhone).push([ 'number', recipientPhone ])
//   }
//   else if (numberOfIssuesInBookingCart === 2) {
//     let departure = incomingMessage.text.body.toUpperCase()
//     let message = 'Whats is the destination location?'

//     ticketBookingSession.get(recipientPhone).push([ "departure", departure ])
//     sendTextMessageToClient(message, recipientPhone)
//   }
//   else if (numberOfIssuesInBookingCart === 3) {
//     let destination = incomingMessage.text.body.toUpperCase()
//     let message = 'Tell me the number of passengers?'

//     ticketBookingSession.get(recipientPhone).push([ "destination", destination ])
//     sendTextMessageToClient(message, recipientPhone)
//   }
//   else if (numberOfIssuesInBookingCart === 4) {
//     let passengers = Number(incomingMessage.text.body)
//     if (!isNaN(passengers)) {
//       ticketBookingSession.get(recipientPhone).push([ "passengers", passengers ])
//       let bookingInfo = ticketBookingSession.get(recipientPhone)
//       let message = `Would you like to confirm the process, The information you have entered:\n\nDeparture: ${bookingInfo[2][1]}\nDestination: ${bookingInfo[3][1]}\nPassengers: ${bookingInfo[4][1]}`
//       let buttons = [
//         {
//           "type": "reply",
//           "reply": {
//             "id": "yes",
//             "title": "YES",
//           }
//         },
//         {
//           "type": "reply",
//           "reply": {
//             "id": "no",
//             "title": "NO",
//           }
//         },
//       ]
//       sendButtonMessageToClient(recipientPhone, message, buttons)
//     }
//     else {
//       let message = "Sorry, you have given wrong info.\nplease try giving the information in number."
//       sendTextMessageToClient(message, recipientPhone)
//     }
//   }
// }
// else if (typeOfMsg === "simple_button_message") {
//   let buttonsReply = incomingMessage.button_reply.id
//   let numberOfIssuesInBookingCart = ticketBookingSession.get(recipientPhone).length

//   if (buttonsReply === "plane" || buttonsReply === "railway" && numberOfIssuesInBookingCart === 1) {
//     ticketBookingSession.get(recipientPhone).push([ "ticketType", buttonsReply ])

//     let message = `Great, you want to book tickets for ${buttonsReply}.\n\nTo book the tickets I want to know the departure location.`
//     sendTextMessageToClient(message, recipientPhone)
//   }
//   else if (buttonsReply === "yes" && numberOfIssuesInBookingCart === 5) {
//     let ticketNumber = getTicketNumber()
//     let message = `Thank you for booking tickets.\n Your booking is successful.\n Your tickets number is ${ticketNumber}.`
//     sendTextMessageToClient(message, recipientPhone)

//     ticketBookingSession.get(recipientPhone).push([ "ticketNumber", ticketNumber ])
//     // postToSheet('Sheet1', ticketBookingSession.get(recipientPhone))
//     ticketBookingSession.set(recipientPhone, [])
//     console.log(ticketBookingSession.get(recipientPhone))


//   }
//   else if (buttonsReply === "no" && numberOfIssuesInBookingCart === 5) {
//     let message = `Sorry, for the inconvenience.\nPlease restart your booking by typing BOOK.`
//     sendTextMessageToClient(message, recipientPhone)
//     ticketBookingSession.set(recipientPhone, [])
//     console.log(ticketBookingSession.get(recipientPhone))
//   }
// }
    


///////////////////////////==========Order Meal Bot===============================================================================================

// if (typeOfMsg === "text_message") {
//   let numberOfIssuesInMealCart = orderMealSession.get(recipientPhone).length;
  
//   if (incomingMessage.text.body.toUpperCase() === "ORDER" && numberOfIssuesInMealCart === 0) {

//     orderMealSession.set(recipientPhone, [])
//     let message = `👋 Hello!\n\nWelcome to our 🍽️ meal order WhatsApp Bot 🤖.\nWe're excited to help you with your order today. How can we assist you? 🤔`
//     let buttons = [
//       {
//         "type": "reply",
//         "reply": {
//           "id": "veg",
//           "title": "Veg",
//         },
//       },
//       {
//         "type": "reply",
//         "reply": {
//           "id": "nonveg",
//           "title": "Non Veg",
//         }
//       }
//     ]      

//   // sendButtonMessageToClient(recipientPhone, message, buttons)

//     sendTextMessageToClient(recipientPhone, message)
//   orderMealSession.get(recipientPhone).push( ["number", recipientPhone] )


//   }
//   if (numberOfIssuesInMealCart === 3) {
//     var address = incomingMessage.text.body
//     let message = `Would you like to confirm your delivery address - ${address}`
//     let buttons = [
//       {
//         "type": "reply",
//         "reply": {
//           "id": "yes",
//           "title": "YES",
//         },
//       },
//       {
//         "type": "reply",
//         "reply": {
//           "id": "no",
//           "title": "NO",
//         }
//       }
//     ]

//     sendButtonMessageToClient(recipientPhone, message, buttons)
//     orderMealSession.get(recipientPhone).push( ["address", address])
//   }
// }
// else if (typeOfMsg === "simple_button_message") {
//   const buttonId = incomingMessage.button_reply.id
//   let numberOfIssuesInMealCart = orderMealSession.get(recipientPhone).length;
  
//   if (buttonId === "veg" && numberOfIssuesInMealCart === 1) {

//     let message = `Welcome to our vegetarian menu! We're delighted to offer a variety of delicious vegetarian options for you to choose from.`
//     let header = "Veg Menu"
//     let buttonText = "Options"
//     let menu = [
//       {
//         "title": "Veg Menu",
//         "rows": [
//           {
//             "id": "0",
//             "title": "Shahi Paneer",
//             "description": "$400"
//           },
//           {
//             "id": "1",
//             "title": "Veg. Kolhapuri",
//             "description": "$400"
//           },
//           {
//             "id": "2",
//             "title": "Chana Masala",
//             "description": "$400"
//           },
//         ],
//       }
//     ]
//     sendListItems(recipientPhone, header, message, buttonText, menu)
//     orderMealSession.get(recipientPhone).push( ["type", buttonId ])
//   }
//   else if (buttonId === "nonveg" && numberOfIssuesInMealCart === 1) {
//     let message = `Welcome to our non vegetarian menu! We're delighted to offer a variety of delicious non vegetarian options for you to choose from.`
//     let header = "Non Veg Menu"
//     let buttonText = "Options"
//     let menu = [
//       {
//         "title": "Veg Menu",
//         "rows": [
//           {
//             "id": "4",
//             "title": "Butter Chicken",
//             "description": "$400"
//           },
//           {
//             "id": "5",
//             "title": "Chicken Biryani",
//             "description": "$400"
//           },
//           {
//             "id": "6",
//             "title": "Chicken Fried Rice",
//             "description": "$400"
//           },
//         ]
//       }
//     ]
//     sendListItems(recipientPhone, header, message, buttonText, menu)
//     orderMealSession.get(recipientPhone).push( ["type", buttonId ])
//   }
//   else if (buttonId === "yes" && numberOfIssuesInMealCart === 4) {
//     let message = `👍 Great! Your address 🏠 has been confirmed. We will deliver your order 🛍️ to the provided address 📍 as soon as possible.`
//     sendTextMessageToClient(message, recipientPhone)
//     // postToSheet("Sheet1", orderMealSession.get(recipientPhone))
//     orderMealSession.set(recipientPhone, [])
//   }
//   else if (buttonId === "no" && numberOfIssuesInMealCart === 4) {
//     let message = "👍 Sure thing! Please provide us with the updated address 📍 so we can ensure a successful delivery of your order 🛍️. Thank you! 🙏"
//     sendTextMessageToClient(message, recipientPhone)
//     orderMealSession.get(recipientPhone).splice(3)
//   }
// }
// else if (typeOfMsg === "radio_button_message") {
//   let numberOfIssuesInMealCart = orderMealSession.get(recipientPhone).length;
  
//   if (numberOfIssuesInMealCart === 2) {
//     let meal = incomingMessage.list_reply.title
//     let message = `Thank you for selecting a meal 🍽️ from our menu. Your order ${meal} 🛍️ has been received and is being processed.\n\nPlease allow some time for our chefs 👨‍🍳 to prepare your meal to perfection 🤌.`
//     sendTextMessageToClient(message, recipientPhone)

//     // ? sometimes this message is sent before previous message is sent
//     setTimeout(() => {
//       sendTextMessageToClient("Please provide your delivery address.", recipientPhone)
//     }, 50)

//     orderMealSession.get(recipientPhone).push( ["order", meal ])
//   }
// }






//-----------------------------------------------------------------------------------------------------------------------------------------
}



    

 


    

    return res.sendStatus(200);
  } 
  catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});





module.exports = router;




// var datasend = JSON.stringify({
     
// });




function isValidDateAndTime(value) {
  // regular expression for date in "DD-MM-YYYY" format
  const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
  // regular expression for time in 12-hour format
  const timeRegex = /^(1[012]|0?[1-9]):([0-5]\d)\s?(am|pm)$/i;

  // separate date and time values
  const [date, time] = value.split(' ');
  // 15-02-2023 09:30 am
  // check if date and time match their respective patterns
  if (dateRegex.test(date) && timeRegex.test(time)) {
    return true;
  } else {
    return false;
  }
}

function validateVehicleNumber(vehicleNumber) {
    const regex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    return regex.test(vehicleNumber);
}

function getTicketNumber() {
    return Math.floor(Math.random() * 10000)
}



