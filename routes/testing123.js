
const router = require('express').Router();
var axios = require('axios');
const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
// api 


const { response } = require('express');
const { text } = require('stream/consumers');
const headers = {
  'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxx',
  'Content-Type': 'application/json'
}
const url = 'https://graph.facebook.com/v15.0/100694566237841/messages'

// api ends 

const Whatsapp = new WhatsappCloudAPI({
 
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_wabaId,
});


var product_name = {
  method: 'get',
  url: 'https://script.google.com/macros/s/AKfycbzNEFCbJdJyZ_r9Wk9C_vx-Fg6JHExHpFi31uSefoiYdeJYnSa4enveDVMsOcMqMRnh/exec?action=getUser',
  headers: { 
    'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
  }
};















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
       
  
      }
      var noob = ShplSession.get(recipientPhone).sessionInfo.reduce(
        function (acc, x) {
          for (var key in x) acc[key] = x[key];
          return acc;
        },
        {}
      );
       
      
      
      let emplyLostPackage = ({ recipientPhone }) => {
        let issues1 = ShplSession.get(recipientPhone).sessionInfo;
        let count = issues1.length;
        console.log(count)
        return { issues1, count };
      };

      // End of cart logic



      if (incomingMessage.type == 'text_message') {

        let numberOfIssuesInCart = emplyLostPackage({
          recipientPhone,
        }).count;


        if (incomingMessage.text.body.toUpperCase() === "HEY") {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          // await Whatsapp.sendText({
          //   recipientPhone: recipientPhone,
          //   message: `https://wa.me/c/918976612956 `,
          // });
          ShplSession.set(recipientPhone, {
            sessionInfo: [],
          });
         
          
          data = recipientPhone
          let value = "number";
          await addToSHPLBotCart({ data, value, recipientPhone });
          console.log(data, "data inside the cart ")


          await Whatsapp.sendSimpleButtons({
          
              message:'Hey! '+recipientName+', \n*Welcome to Wyaapar* \n\nCraft End-To-End Customer Journeys With Wyaapar Now meet your customers on WhatsApp & offer delightful experiences every step of the way.',
              recipientPhone:recipientPhone,
             
              listOfButtons: [
                {
                    title: 'Check Out Bot Demo',
                    id: 'demo_1',
                },
                {
                    title: 'About Us',
                    id: 'demon_2',
                },
            ],
            
          })
         

          

          
          // var axios = require('axios');
          // var start_welcome = JSON.stringify({
          //   "messaging_product": "whatsapp",
          //   "to": recipientPhone,
          //   "type": "template",
          //   "template": {
          //     "name": "start_welcome",
          //     "language": {
          //       "code": "en"
          //     }
          //   }
          // });

          // var config = {
          //   method: 'post',
          //   url: 'https://graph.facebook.com/v15.0/100694566237841/messages',
          //   headers: headers,
          //   data: start_welcome
          // };

          // axios(config)
          //   .then(function (response) {
          //     console.log(JSON.stringify(response.data));
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });


       
        }
       else if(incomingMessage.text.body.toUpperCase().split('-')[0]==="OPA"){
          ShplSession.set(recipientPhone, {
            sessionInfo: [],
          });
          var text_data=incomingMessage.text.body.toUpperCase().split('-')[1]
          
          var axios = require('axios');
          var data12 = JSON.stringify({
            "model": "text-davinci-002",
            "prompt": text_data,
            "temperature": 0,
            "max_tokens": 100
          });
          
          var config223 = {
            method: 'post',
            url: 'https://api.openai.com/v1/completions',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxx'
            },
            data : data12
          };
          
          axios(config223)
          .then(function (response) {
            Whatsapp.sendText({
              message:'here your Answer :-'+response.data.choices[0].text,
              recipientPhone:recipientPhone
            })
            console.log(response.data.choices[0].text);
          })
          .catch(function (error) {
            console.log(error);
          });
          
        }
        else if(numberOfIssuesInCart === 2){
            await Whatsapp.sendSimpleButtons({
                recipientPhone: recipientPhone,
                message: 'To confirm your Booking, please click on the " Confirm " button below. By clicking on this button, you are agreeing to the terms and conditions of our service',
                listOfButtons: [
                {
                    title: 'Confirm Appointment',
                    id: `confirm_appointment_restaurants`,
                }
    
                ],
            })
        }
        else{
          Whatsapp.sendText({
            recipientPhone:recipientPhone,
            message:"Hello, could you please repeat the information or request you previously mentioned? I apologize if I did not understand it correctly the first time"
          })
        }
      }



      if (incomingMessage.type === 'quick_reply_message') {
        let data = incomingMessage.button.payload
        let numberOfIssuesInCart = emplyLostPackage({
          recipientPhone,
        }).count;


        if (data === "Check Our Bot Demo" && numberOfIssuesInCart === 1) {
          // ShplSession.get(recipientPhone).sessionInfo = [];
          data = incomingMessage.button.payload
          let value = "cons";
          await addToSHPLBotCart({ data, value, recipientPhone });
          console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")

          let listOfSections = [
            {
              title: `Demos`,
              headers: `hello`,
              rows: [
                {
                  id: "demon_1",
                  title: "E-Commerce",
                  description: "Online Shopping ",
                },
                {
                  id: "demon_2",
                  title: "Booking an Appointment",
                  description: "Appointment Booking demo",
                },
                
              ],
            },
          ];
          Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `Leveledge technologies`,
            bodyText: `\n\n hey`+recipientName+ '👋',
            footerText: `© 2022 leveledge technologies Private Limited`,
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

        else if(data==="Booking an appointment" && numberOfIssuesInCart === 1){
          data = recipientPhone+','+recipientName
          let value = "number";
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
            bodyText: `Our slot booking system makes it easy to schedule and reserve your time with us. Simply choose the service you'd like to book, select a date and time, and follow the prompts to complete your booking.\n\nPlease select one of the slot below:`,
            footerText: 'Powered by: LevelEdge ',
            listOfSections,
        });
        }
        else if (numberOfIssuesInCart!=1){
          await Whatsapp.sendText({
            recipientPhone:recipientPhone,
            message:"please restart again by typing *Hey* again"
          })
        }

      }
      if (typeOfMsg === "location_message"  ) {

        var noob = ShplSession.get(recipientPhone).sessionInfo.reduce(
          function (acc, x) {
            for (var key in x) acc[key] = x[key];
            return acc;
          },
          {}
        );
       
         console.log(noob,"----------khali hogaya hai ye -=-----------------")
        
        
        let lat = incomingMessage.location.latitude
        let long = incomingMessage.location.longitude

        // let data = "https://www.google.com/maps/place/" + lat + "," + long
        // let value = "address";

        
        // await addToSHPLBotCart({ data, value, recipientPhone });
        // console.log(recipientPhone, "aa")

        await Whatsapp.sendText({
          recipientPhone: recipientPhone,
          message: `Your Location has been registered with us !! `,
        });

        var axios = require('axios');
        var contact = JSON.stringify({
          "messaging_product": "whatsapp",
          "to": recipientPhone,
          "type": "template",
          "template": {
            "name": "contact_team",
            "language": {
              "code": "en_US"
            }
          }
        });

        var config = {
          method: 'post',
          url: 'https://graph.facebook.com/v15.0/100694566237841/messages',
          headers: headers,
          data: contact
        };
        
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      
      if (incomingMessage.order != null) {
        
          

        let numberOfIssuesInCart = emplyLostPackage({
          recipientPhone,
        }).count;
          if (numberOfIssuesInCart !=null) {
            
          console.log(incomingMessage.order.product_items)
          var array1 = []
          for (let i = 0; i < incomingMessage.order.product_items.length; i++) {
            var object = {
              quantity: incomingMessage.order.product_items[i].quantity,
              item_price: incomingMessage.order.product_items[i].item_price,
              product_retailer_id: incomingMessage.order.product_items[i].product_retailer_id,
              total: incomingMessage.order.product_items[i].quantity * incomingMessage.order.product_items[i].item_price
            }
            array1.push(object)

          }
          console.log(array1,"producttttttttttttttttttttttttttttttttttttttttttttttt")
          var total = 0
          for (var i = 0; i < array1.length; i++) {
            total += array1[i].total
          }
          //   var ab =dataArray.join('');
          const dataArray = [];
          const item_id = [];
          const quantity = [];
      
        
          data = dataArray.join('')
          var axios = require('axios');
          axios(product_name)
        .then(async (response) => {
          console.log(array1,"producttttttttttttttttttttttttttttttttttttttttttttttt")
          var data1=[]
          var data2=[]
          

          // console.log(JSON.stringify(response.data));
          for(var i =0;i<response.data.length;i++){
          data1.push(response.data[i])
          // data2.push(response.data[i].title)
          
          }
          var array2=[]
          array2=data1
          const ab = array1.map((item) => {
            const product = array2.find((product) => {
              return product.id === item.product_retailer_id;
            });
          
            return {
              quantity: item.quantity,
              title: product.title,
              item_price: item.item_price,
              product_retailer_id: item.product_retailer_id,
              total: item.total
            };
          });
          
          console.log(ab,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa--------------------------");
         

          
          for (const element of ab) {
          var   a=(`🛒--${element.quantity} ${element.title} *₹* ${element.item_price} `);
            
            dataArray.push(a +" \n");
  
           }

           



          await Whatsapp.sendSimpleButtons({
            message: dataArray.join('')+ '\n' +
              // 'item price:-'+item_price+'\n'+
              'total:- ' + total,
            recipientPhone: recipientPhone,
            message_id,
            listOfButtons: [
              {
                title: 'Comfirm Order🛒',
                id: `Comfirm`,
              },
              {
                title: ' Wait a minute ',
                id: 're_enter_cart',
              }

            ],
          });
        

          

        })
        .catch(function (error) {
          console.log(error);
        });
      

          }
        
      }
      
      if (typeOfMsg==="radio_button_message"){
        let numberOfIssuesInCart = emplyLostPackage({
          recipientPhone,
        }).count;
        console.log(numberOfIssuesInCart,'------------cart ');
        var data1=incomingMessage.list_reply.id

        if(data1!='demon_1'&&data1!='demon_2'&&data1!='demon_3'&&data1!='demon_4'&&data1!='demon_5'&&numberOfIssuesInCart==2){
            await Whatsapp.sendText({
                message:'Please Enter The Time at you wanted to Book a Table \n *eg:-2:30 PM*',
                recipientPhone:recipientPhone
            })
        }


        // insurance Flow
        if(data1=='demon_3'&&numberOfIssuesInCart==2){
            await Whatsapp.sendText({
                message:"this is insurance Message",
                recipientPhone:recipientPhone
            })
        }

        // Restaurants Flow
        if(data1=='demon_4'&&numberOfIssuesInCart==2){
            await Whatsapp.sendImage({
                recipientPhone:recipientPhone,
                url:'https://images.unsplash.com/photo-1579042877201-21342f2083a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
            })

            await Whatsapp.sendSimpleButtons({
                message:'Hey have a look at our Menu. \n what would you like to Do ?',
                recipientPhone:recipientPhone,
                listOfButtons: [
                    {
                    title: 'Place an Order 🥡',
                    id: `Restaurants_button_1`,
                    },
                    {
                    title: 'Book a Table 🕛',
                    id: 'Restaurants_button_2',
                    }    
                ],
            })
        }

        // Booking appointment FLow
        if(data1==='demon_2'&&numberOfIssuesInCart===2){
        data = recipientPhone+','+recipientName
        let value = "number";
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
            bodyText: `Our slot booking system makes it easy to schedule and reserve your time with us. Simply choose the service you'd like to book, select a date and time, and follow the prompts to complete your booking.\n\nPlease select one of the slot below:`,
            footerText: 'Powered by: LevelEdge ',
            listOfSections,
        });
        //
        }

        if(numberOfIssuesInCart===3){

        data = incomingMessage.list_reply.id
        let value = "cons";
        await addToSHPLBotCart({ data, value, recipientPhone });
        console.log(data, "data inside the cart ")


        await Whatsapp.sendSimpleButtons({
            message: 'Hey! '+recipientName+ '\n'+'*Welcome to our online slot booking system! Here, you can easily browse and reserve time slots for a variety of activities and services*\n' ,
            recipientPhone: recipientPhone,
            message_id,
            listOfButtons: [
                {
                title: 'Before noon🕛',
                id: `Stage_1`,
                },
                {
                title: 'Between noon-5pm🕝',
                id: 'Stage_2',
                },{
                title: 'After evening hour🕒',
                id: 'Stage_3',
                }

            ],
            });


        

        }

        // E_commerce Flow 
        if(data1==='demon_1'&&numberOfIssuesInCart===2){
        var axios = require('axios');
                var yes_catalogue = JSON.stringify({
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    "to": recipientPhone,
                    "type": "interactive",
                    "interactive": {
                    "type": "product_list",
                    "header": {
                        "type": "text",
                        "text": "Product"
                    },
                    "body": {
                        "text": "Here Demo "
                    },
                    "footer": {
                        "text": "© 2022 leveledge technologies Private Limited"
                    },
                    "action": {
                        "catalog_id": "539108381203114",
                        "sections": [
                        {
                            "title": "Clothing",
                            "product_items": [
                            {
                                "product_retailer_id": "a12345"
                            },
                            {
                                "product_retailer_id": "l456"
                            },
                            {
                                "product_retailer_id": "12345"
                            },
                            {
                                "product_retailer_id": "a9kj5p00e0"
                            },
                            {
                                "product_retailer_id": "ty77"
                            },
                            {
                                "product_retailer_id": "xe30"
                            },
                            {
                                "product_retailer_id": "rq76"
                            }
                            ]
                        }
                        // {
                        //   "title": " Section B",
                        //   "product_items": [
                        //     {
                        //       "product_retailer_id": "sc99euen8x"
                        //     },
                        //     {
                        //       "product_retailer_id": "v35l1u9uvn"
                        //     },
                        //     {
                        //       "product_retailer_id": "12345"
                        //     }
                        //   ]
                        // }
                        ]
                    }
                    }
                });

                var config = {
                    method: 'post',
                    url: 'https://graph.facebook.com/v15.0/100694566237841/messages',
                    headers: headers,
                    data: yes_catalogue
                };

                axios(config)
                    .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                    console.log(error);
                    });
        }

        if(data1==='demon_5'&&numberOfIssuesInCart==2){

            await Whatsapp.sendSimpleButtons({
                message:'Hey '+recipientName+',\n\n Welcome to *XYZ Estate Agency.* \n I am Tisa, your Real Estate Assistant.\nI will help you find your dream home! \n \n Which of the following are you ? ',
                recipientPhone:recipientPhone,
                listOfButtons:[
                    {
                        title: 'Buyer',
                        id: `RealEstate_1`,
                        },   
                    {
                        title: 'Tenant',
                        id: `RealEstate_2`,
                        },   
                    {
                        title: 'Landlord',
                        id: `RealEstate_3`,
                        },   
                ]
            })
        }

        if(numberOfIssuesInCart===4){
        // data = incomingMessage.list_reply.title
        //   let value = "cart_data";
        //   await addToSHPLBotCart({ data, value, recipientPhone });
        //   console.log(data, "data inside the cart ")

        await Whatsapp.sendSimpleButtons({
            recipientPhone: recipientPhone,
            message: 'To confirm your appointment, please click on the " Confirm " button below. By clicking on this button, you are agreeing to the terms and conditions of our service',
            listOfButtons: [
            {
                title: 'Confirm Appointment',
                id: `confirm_appointment`,
            }

            ],
        })

        }

      }

      if (typeOfMsg === 'simple_button_message') {
        let button_id = incomingMessage.button_reply.id;
        
        let numberOfIssuesInCart = emplyLostPackage({
          recipientPhone,
        }).count;
        if (button_id == 'Stage_1'&&numberOfIssuesInCart==4) {
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
              if(noob.cons.split(' - ')[0]==response.data[j].date){
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
            message:'Simply choose the activity or service you do like to book, select a date and time, and follow the prompts to complete your booking. \n *Available slots:-* \n'+dataArray+'\n'
          })
          


         Whatsapp.sendRadioButtons({
          recipientPhone: recipientPhone,
          headerText: `#slot Available:`,
          bodyText: `\n\nPlease select one of the slot below:`,
          footerText: '@Powered by: LevelEdge ',
          listOfSections,
      });
          
        })
        .catch(function (error) {
          console.log(error);
        });
        }
        if (button_id == 'Stage_2'&&numberOfIssuesInCart==4) {
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
              if(noob.cons.split(' - ')[0]==response.data[j].date){
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
            message:'Simply choose the activity or service you do like to book, select a date and time, and follow the prompts to complete your booking. \n *Available slots:-* \n'+dataArray+'\n'
          })
          


         Whatsapp.sendRadioButtons({
          recipientPhone: recipientPhone,
          headerText: `#slot available:`,
          bodyText: `\n\nPlease select one of the slot below:`,
          footerText: '@Powered by: LevelEdge ',
          listOfSections,
      });
          
        })
        .catch(function (error) {
          console.log(error);
        });
        }
        if (button_id == 'Stage_3'&&numberOfIssuesInCart==4) {
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
              if(noob.cons.split(' - ')[0]==response.data[j].date){
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
            message:'Simply choose the activity or service you do like to book, select a date and time, and follow the prompts to complete your booking. \n *Available slots:-* \n'+dataArray+'\n'
          })
          


         Whatsapp.sendRadioButtons({
          recipientPhone: recipientPhone,
          headerText: `#slot available:`,
          bodyText: `\n\nPlease select one of the slot below:`,
          footerText: '@Powered by: LevelEdge',
          listOfSections,
      });
          
        })
        .catch(function (error) {
          console.log(error);
        });
        }
        if(button_id == 'demon_2' && numberOfIssuesInCart==1){
       
         var axios = require('axios');
          var start_welcome = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": recipientPhone,
            "type": "template",
            "template": {
              "name": "about_us",
              "language": {
                "code": "en"
              }
            }
          });

          var config = {
            method: 'post',
            url: 'https://graph.facebook.com/v15.0/100694566237841/messages',
            headers: headers,
            data: start_welcome
          };

          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });

        }
        if(button_id=='demo_1'&&numberOfIssuesInCart==1){
          data = incomingMessage.button_reply.title
          let value = "cons";
          await addToSHPLBotCart({ data, value, recipientPhone });
          console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")

          let listOfSections = [
            {     
              title: `Demos`,
              headers: `Wyaapar`,
              rows: [
                {
                  id: "demon_1",
                  title: "E-Commerce",
                  description: "Online Shopping ",
                },
                {
                  id: "demon_2",
                  title: "Booking an Appointment",
                  description: "Appointment Booking demo",
                },
                {
                  id: "demon_3",
                  title: "Insurance",
                  description: "insurance policy. ",
                },
                {
                  id: "demon_4",
                  title: "Restaurants",
                  description: "serves food and drinks",
                },
                {
                  id: "demon_5",
                  title: "Real Estate Services",
                  description: "Sell or buy House",
                },
                
              ],
            },
          ];
          Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `Leveledge technologies`,
            bodyText: `\n\n hey`+recipientName+ '👋',
            footerText: `© wyaapar`,
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
        if (button_id ==='confirm_appointment') {
          console.log(noob,"aaaaaaaaaaaaaaaaaa")

        var axios = require('axios');
        var data2222 = JSON.stringify({
          "DATE":noob.cons.split(' - ')[0],
          "SLOT": noob.cart_data,
          "PURPOSE": "book",
          "MOBILE_NUMBER":noob.number.split(',')[0]
        });

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
          })
          .catch(function (error) {
            console.log(error);
          });



        
        
          var axios = require('axios');
        var contact = JSON.stringify({
          "messaging_product": "whatsapp",
          "to": recipientPhone,
          "type": "template",
          "template": {
            "name": "thankyou",
            "language": {
              "code": "en"
            }
          }
        });

        var config = {
          method: 'post',
          url: 'https://graph.facebook.com/v15.0/100694566237841/messages',
          headers: headers,
          data: contact
        };
        
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });


         
         
        }
        if(button_id==='confirm_appointment_restaurants'){
            await Whatsapp.sendText({
                recipientPhone:recipientPhone,
                message:"You're welcome! I'm glad to hear that you have confirmed your table and that you will be in touch soon. \n\nI hope you have a great experience using Wyaapar services."
            })
            await Whatsapp.sendText({
                recipientPhone:recipientPhone,
                message:"Hello! Is there anything specific you would like to discuss or ask about? I am here to help in any way that I can. Please Type Again *Hey*"
            })
        }
        if(button_id=='Restaurants_button_1'){
    
            await Whatsapp.sendSimpleButtons({
                message:'Please Click on Link Below to place an Order \n\n 👉👉https://fooder.vercel.app/👈👈',
                recipientPhone:recipientPhone,
                listOfButtons: [
                    {
                    title: 'Go Back ',
                    id: `Reset_Restaurants`,
                    },   
                ],
            })
        }
        if(button_id=='Restaurants_button_2'){                    
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
            title: `Times Booking Table `,
            headers: `hello`,
            rows:date_list ,
            },
        ];

        await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `${recipientName}`,
            bodyText: `Our continental cusine offer you the best food in a relaxed environment. \n *We are open from 11:00 am to 9:30 pm from Mon to Sun.* \n What date would you like to book a table?`,
            footerText: 'Powered by: Wyaapar ',
            listOfSections,
        });
        }
        if(button_id=='Reset_Restaurants'){

        await Whatsapp.sendSimpleButtons({
            recipientPhone:recipientPhone,
            message:'Hi '+recipientName+',\n Welcome to ABC Restaurants \n\n I am *Wyaapar*, your Booking assistant. \n Please Let me know what are you looking for ?',
            listOfButtons: [
                {
                title: 'Place an Order 🥡',
                id: `Restaurants_button_1`,
                },
                {
                title: 'Book a Table 🕛',
                id: 'Restaurants_button_2',
                }    
            ],
        })
        }



        if(button_id=='RealEstate_1'||button_id=='RealEstate_2'||button_id=='RealEstate_3'){
            
            await Whatsapp.sendSimpleButtons({
                message:"Great I'm here to help, \n What type of property are you looking for ? ",
                recipientPhone:recipientPhone,
                listOfButtons:[
                    {
                        title: 'Apartment',
                        id: `Buyer_1`,
                        },   
                    {
                        title: 'Attached House',
                        id: `Buyer_2`,
                        },   
                    {
                        title: 'Land',
                        id: `Buyer_3`,
                        },   
                ]
            })
        }
        

        if(button_id=='Buyer_1'||button_id=='Buyer_2'||button_id=='Buyer_3'){
            await Whatsapp.sendSimpleButtons({
                message:"Please Select the Amenities you are Looking For .",
                recipientPhone:recipientPhone,
                listOfButtons:[
                    {
                        title: 'Pvt Parking',
                        id: `Apartment_1`,
                        },   
                    {
                        title: 'Near School',
                        id: `Apartment_2`,
                        },   
                    {
                        title: 'Good Nearby Area',
                        id: `Apartment_3`,
                        },   
                ]
            })
        }
        if(button_id=='Apartment_1'||button_id=='Apartment_2'||button_id=='Apartment_3'){
            await Whatsapp.sendSimpleButtons({
                message:"How many Bedrooms are you looking For ?",
                recipientPhone:recipientPhone,
                listOfButtons:[
                    {
                        title: '1 Bedroom',
                        id: `1BHK`,
                        },   
                    {
                        title: '2 Bedrooms',
                        id: `2BHK`,
                        },   
                    {
                        title: '3 Bedrooms',
                        id: `3BHK`,
                        },   
                ]
            })
        }
        if(button_id=='1BHK'||button_id=='2BHK'||button_id=='3BHK'){
            await Whatsapp.sendSimpleButtons({
                message:"Please Select the budget Range ",
                recipientPhone:recipientPhone,
                listOfButtons:[
                    {
                        title: 'under 25 lakh',
                        id: `25_under`,
                        },   
                    {
                        title: '25-50 lakh',
                        id: `25_50`,
                        },   
                    {
                        title: '50-1 Cr',
                        id: `50_1`,
                        },   
                ]
            })
        }
        if(button_id=='25_under'||button_id=='25_50'||button_id=='50_1'){
            await Whatsapp.sendSimpleButtons({
                message:"Do you have property to sell ? ",
                recipientPhone:recipientPhone,
                listOfButtons:[
                    {
                        title: 'Yes I have ',
                        id: `Yes_sell`,
                        },   
                    {
                        title: 'No ',
                        id: `No_sell`,
                        },   
                       
                ]
            })
        }
        if(button_id=='Yes_sell'||button_id=='No_sell'){
            await Whatsapp.sendSimpleButtons({
                message:"What's the Best Time to Contact You ?",
                recipientPhone:recipientPhone,
                listOfButtons:[
                    {
                        title: 'Before 12',
                        id: `before_12`,
                        },   
                    {
                        title: '1 to 5 ',
                        id: `1_5`,
                        },   
                    {
                        title: 'Anytime ',
                        id: `Anytime`,
                        },   
                       
                ]
            })
        }
        if(button_id=='before_12'|| button_id=='1_5'||button_id=="Anytime"){
            await Whatsapp.sendText({
                recipientPhone:recipientPhone,
                message:"Thanks, For reaching out,\n Our agents will Contact you soon \n\n thank you have a nice day \n\nI hope you have a great experience using Wyaapar services."
            })
            await Whatsapp.sendText({
                recipientPhone:recipientPhone,
                message:"Hello! Is there anything specific you would like to discuss or ask about? I am here to help in any way that I can. \n Please Type Again *Hey*"
            })
        }

        if (button_id ==='Comfirm_stage') {
          
          var config1 = {
            method: 'post',
            url: 'https://script.google.com/macros/s/AKfycbzYsOajI1dNBbAnMhrCJV1AUDDNy0AxeSzLiZY8Ys4rjXxoc7JEU6T5zofOxFw3cru_Hw/exec?action=addUser',
            headers: { 
              'Content-Type': 'application/json', 
              'Cookie': 'NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo'
            },
            data : data555
          };
          axios(config1)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
      
          })
        }


        
        if (button_id === 'Comfirm' ) {
          data = button_id
          let value = "confirm";
          await addToSHPLBotCart({ data, value, recipientPhone });
          console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")

          await Whatsapp.sendText({
            message: `Please provide Address current location from Whatsapp`,
            recipientPhone: recipientPhone

          });
        }


        

        

        
      }

      

      await Whatsapp.markMessageAsRead({
        message_id,
      });

    }

    return res.sendStatus(200);
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});

module.exports = router;




// bulk update start ------------------------------------------------------------------------------------------------------


// setInterval(() => {
//   var data=['917304650770','918286075880']


// for(var i=0;i< data.length; i++){

//   var axios = require('axios');
//   var start_welcome = JSON.stringify({
//     "messaging_product": "whatsapp",
//     "to": data[i],
//     "type": "template",
//     "template": {
//       "name": "start_welcome",
//       "language": {
//         "code": "en"
//       }
//     }
//   });

//   var config = {
//     method: 'post',
//     url: 'https://graph.facebook.com/v15.0/100694566237841/messages',
//     headers: headers,
//     data: start_welcome
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }


  
// }, 5000);


var datamissing;
function postApi4(noob,recipientPhone,x,y,z){
  datamissing = JSON.stringify([
    {
      
      "cf_ORDER BY": recipientPhone,
      "cf_Destination": noob.dest,
      "cf_Vehicle-type": noob.vehicletype
    }
  ]
    
  )

}
