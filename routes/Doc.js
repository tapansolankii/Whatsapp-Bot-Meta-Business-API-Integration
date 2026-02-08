"use strict";
//import modules
//Importing vwhatsappcloudapi_wrapper module and storing in WhatsappCloudAPI.
//Initializing our WhatsApp Cloud API
// Remember the whatsappcloudapi_wrapper package that we installed earlier? It’s time to import and initialize it.
const router = require("express").Router();
// const Router = require('express');
// const router = Router();
const fs = require("fs");
require("path").dirname("D:/angular Project/whatsapp bot _ _ _ node/test.pdf");
const axios = require("axios");
//Importing values from env.js
const WhatsappCloudAPI = require("whatsappcloudapi_wrapper");
const Whatsapp = new WhatsappCloudAPI({
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_wabaId,
});
// Configuring customer sessions
// To handle our customer journey, we need to keep a session that includes a customer profile and their cart. Each customer will, therefore, have their own unique session.
// In production, we could use a database like MySQL, MongoDB, or something else resilient, but to keep our tutorial lean and short, we will use ES2015’s Map data structure. With Map, we can store and retrieve specific, iterable data, such as unique customer data.
// The first line imports the EcommerceStore class, while the second line initializes it. The third line creates the customer’s session that we will use to store the customer’s journey.
const CustomerSession = new Map();
const ShplSession = new Map();
const https = require("https");
const { Console } = require("console");
router.get('/meta_wa_callbackurl', (req, res) => {
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
          // console.log(res)
          return res.sendStatus(403);
      }
  } catch (error) {
      console.error({error})
      return res.sendStatus(500);
  }
});

//Defining Variable- Fetching data from Driver Master GoogleSheet (Vehicle number,Driver number) & storing in array
var driverMobileNos = [];
var vehiclenumber = [];
var FetchGsheetDriver = {
  method: 'get',
  url: 'https://script.google.com/macros/s/AKfycbz7deBD2-Inoe2bEZshQl_GzoP_3kM94jnELpO2x37fEYLGZ8AgNgB-WskaKaYMmOoF2A/exec',
  headers: { 
    'Cookie': 'NID=511=oDzBMbwuX12Cfg15osg66Wg4_E49_96TOcXuyIGuh4dkk9QPibfKPj5t0-kmSeMX9HuGETq0cf2MXz8cPXddQYtETb96GhAMsNMMS3Zi8MM6PsX7dByPDa828MdUwiOnMuOu0gm8LpftQuxQO-EXwSr6t6FCj2pKgfMpEifT2IA'
  }
};
setInterval(function(){axios(FetchGsheetDriver)
.then(function (response) {
 for (let i = 0; i < response.data.data.length; i++) {
  driverMobileNos.push(response.data.data[i][1].toString())
  vehiclenumber.push(response.data.data[i][0].toString())
  }
  //counting no. of drivers
  numberofdriver=response.data.data.length
})
.catch(function (error) {
  console.log(error);

});
console.log("driver updated")
}, 20000);
//Defining Variable- Fetching data from Unlabelled GGoods Master GoogleSheet (Vehicle number,Driver number) & storing in array
var numberofdriver;
var Newdatalenght;
var epmlyinfo;
var newEmplyNumber =[];
var FetchMissingGsheet = {
  method: 'get',
  url: 'https://script.google.com/macros/s/AKfycbwkoygJVpHF2DXIze17HiC5BpCgR5ZCFGoCbTKwEtUkC4tP3rEUwrg6-3tpjQxsP8q4/exec',
  headers: { 
    'Cookie': 'NID=511=oDzBMbwuX12Cfg15osg66Wg4_E49_96TOcXuyIGuh4dkk9QPibfKPj5t0-kmSeMX9HuGETq0cf2MXz8cPXddQYtETb96GhAMsNMMS3Zi8MM6PsX7dByPDa828MdUwiOnMuOu0gm8LpftQuxQO-EXwSr6t6FCj2pKgfMpEifT2IA'
  }
};
let Name=[]
let Apmcode=[]
let Branch_Name=[] 
axios(FetchMissingGsheet)
.then(function (response1) {
  
 for (let i = 0; i < response1.data.data.length; i++) {
  newEmplyNumber.push(response1.data.data[i][0].toString())
  Name.push(response1.data.data[i][1].toString())

  }
  

  console.log(newEmplyNumber)

})
.catch(function (error) {
  console.log(error);

});







router.post("/meta_wa_callbackurl", async (req, res) => {
  try {
    console.log('POST: Someone is pinging me!');
    let data =Whatsapp.parseMessage(req.body)
    if (numberofdriver > 1) {
      
      // console.log(data)
      if (data?.isMessage) {
        try {

          // If incoming message then store following details from Webhook (recipientPhone,recipientName,typeOfMsg,message_id,timestamp)
          const arr = [];
          const arr1 = [];
          let incomingMessage = data.message;
          console.log(incomingMessage)
          
          let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
          let recipientName = incomingMessage.from.name;
          let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
          let message_id = incomingMessage.message_id; // extract the message id
          let timestamp =incomingMessage.timestamp

          //Defining List of Sub issue under Gaadi Malik issue
          
          let listOfSections = [
            {
              title: `IssueFor`,
              headers: `hello`,
              rows: [
                {
                  id: "issue_11",
                  title: "एडवांस ",
                  description: "Short Advance,Khana kharcha...",
                },
                {
                  id: "issue_12",
                  title: "अनलोडिंग समस्या ",
                  description: "Gaadi Unload karwao",
                },
                {
                  id: "issue_13",
                  title: "लोडिंग समस्या",
                  description: "Loading me dikkat hori hai",
                },
                {
                  id: "issue_14",
                  title: "RTO",
                  description: "RTO ka masla",
                },
                {
                  id: "issue_15",
                  title: "रूट समस्या ",
                  description: "Route dedo",
                },
                {
                  id: "issue_16",
                  title: "खाली ",
                  description: "Load dilwa do",
                },
                {
                  id: "issue_17",
                  title: "बिल्टी,चलन",
                  description: "Document banwao",
                },
                {
                  id: "issue_18",
                  title: "Other issue",
                  description: "अन्य समस्या ",
                },
              ],
            },
          ];
          
          if (!CustomerSession.get(recipientPhone)) {
            CustomerSession.set(recipientPhone, {
              cart: [],
            });
          }
          if (!ShplSession.get(recipientPhone)) {
            ShplSession.set(recipientPhone, {
              sessionInfo: [],
            });
          }

          //Matching Whatsapp cloud api number with Driver Master googlesheet number and storing its Index Velue in variable

          var indexof = driverMobileNos.indexOf(
            String(recipientPhone).substring(2, 12)
          );
          var axios = require('axios');

           //Matching Whatsapp cloud api number with Unlablled Master googlesheet number and storing its Index Velue in variable
          var indexof1 = newEmplyNumber.indexOf(
            String(recipientPhone).substring(2, 12)
          );

          // Storing value for post API we need to save relevant data in addToSHPLBotCart

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
          
          let emplyLostPackage = ({ recipientPhone }) => {
            let issues1 = ShplSession.get(recipientPhone).sessionInfo;
            let count = issues1.length;
            return { issues1,count};
          };
          let numberOfIssuesInCart = emplyLostPackage({
        recipientPhone,
      }).count;




          // Storing value for post API we need to save relevant data in Cart 

          let addToDriverBotCart = async ({ data, value, recipientPhone }) => {
            if (value == "text") {
              CustomerSession.get(recipientPhone).cart.push({ text: data });
            } else if (value == "issue") {
              CustomerSession.get(recipientPhone).cart.push({ issue: data });
            } else if (value == "vehicle_Status") {
              CustomerSession.get(recipientPhone).cart.push({
                vehicle_status: data,
              });
            }
            else if (value == "location") {
              CustomerSession.get(recipientPhone).cart.push({
                location: data,
              });
            } else if (value == "problem") {
              CustomerSession.get(recipientPhone).cart.push({ problem: data });
            } else if (value == "proof_link") {
              CustomerSession.get(recipientPhone).cart.push({
                proof_link: data,
              });
            }else if (value == "proof_link2") {
              CustomerSession.get(recipientPhone).cart.push({
                proof_link2: data,
              });
            }

            else if (value == "stepney_link") { 
              CustomerSession.get(recipientPhone).cart.push({
                stepney_link: data,
              });
            }
            else if (value == "Tyre_number") {
              CustomerSession.get(recipientPhone).cart.push({ Tyre_number: data });
            }
            else if (value == "Shopekeeper_number") {
              CustomerSession.get(recipientPhone).cart.push({ Shopekeeper_number: data });
            }
            else if (value == "patch_number") {
              CustomerSession.get(recipientPhone).cart.push({ patch_number: data });
            }
            else if (value == "estimate_amount") {
              CustomerSession.get(recipientPhone).cart.push({ estimate_amount: data });
            }

            else if (value == "coverage") {
              CustomerSession.get(recipientPhone).cart.push({
                coverage: data,
              });
            }
            else if (value == "last_insecption_date") {
              CustomerSession.get(recipientPhone).cart.push({
                last_insecption_date: data,
              });
            }
            else if (value == "day_after_insecption") {
              CustomerSession.get(recipientPhone).cart.push({
                day_after_insecption: data,
              });
            }
            else if (value == "CPKM") {
              CustomerSession.get(recipientPhone).cart.push({
                CPKM: data,
              });
            }
            else if(value == "Advance_Reason"){
              CustomerSession.get(recipientPhone).cart.push({
                Advance_Reason: data,
              });

            }
            else if(value == "Stepney_availibility"){
              CustomerSession.get(recipientPhone).cart.push({
                Stepney_availibility: data,
              });
              
            }
            else if(value == "Battery_Subissue"){
              CustomerSession.get(recipientPhone).cart.push({
                Battery_Subissue: data,
              });
              
            }
          };
          var noob = CustomerSession.get(recipientPhone).cart.reduce(
            function (acc, x) {
              for (var key in x) acc[key] = x[key];
              return acc;
            },
            {}
          );
          let listOfIssuesInCart = ({ recipientPhone }) => {
            let total = 0;
            let issues = CustomerSession.get(recipientPhone).cart;
           
            let count = issues.length;
            return { issues, count };
          };

          
          var TF = false;
          TF = driverMobileNos.includes(
            String(recipientPhone).substring(2, 12)
          );
          var Empl=false;            
          Empl = newEmplyNumber.includes(
            String(recipientPhone).substring(2, 12)
          );
         
          

          if (TF) {

           let  timestampog = timestamp+"000"
           let data =timestampog;
         
                  var timeDiff = Math.abs(timestampog + 86400000); // Calculate difference between current timestamp and saved timestamp
                  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Get day from timestamp
                  if(timeDiff){
                    TF = true
                    
                     // It's been less than a day
                  } else {
                      // It has been more than a day from last submission - Allow form submission
                      TF = false;
                     
                  }
            if (typeOfMsg === "text_message" && TF) {

              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;

              if(incomingMessage.text.body.toUpperCase() === "APML" ){


                // await Whatsapp.sendText({
                //   recipientPhone: recipientPhone,
                //   message: "*🚨APML कंट्रोल रूम 🚨*\n--------------------------------------\n\n Please wait while we verify your details !! \n\n कृपया इंतज़ार करे , तब तक हम आपका डिटेल्स चेक करते है  !!",
                // });

              //   var googlesheet =[];

               CustomerSession.get(recipientPhone).cart = [];

              //   var config_google = {
              //     method: 'get',
              //     url: 'https://script.google.com/macros/s/AKfycbyzz-dKS85zqH8Hzim81SIm-7wKvvafbAVdPikeL9oc9tumXzqZKWP2k73mYRkF1zmy/exec',
              //     headers: {
              //       'Cookie': 'NID=511=oDzBMbwuX12Cfg15osg66Wg4_E49_96TOcXuyIGuh4dkk9QPibfKPj5t0-kmSeMX9HuGETq0cf2MXz8cPXddQYtETb96GhAMsNMMS3Zi8MM6PsX7dByPDa828MdUwiOnMuOu0gm8LpftQuxQO-EXwSr6t6FCj2pKgfMpEifT2IA'
              //     }
              //   };

              //   axios(config_google)
              //   .then(function (response) {
              //   googlesheet =response.data.data
              //   // console.log(googlesheet[0]);
              //     // console.log(googlesheet[0]);
              //     var vehiclett = vehiclenumber[indexof]
              //     console.log(vehiclett)
              //     function exists(arr, search) {
              //       return arr.some(row => row.includes(search));
              //   }
              //   if(exists(googlesheet, vehiclett)){
              //     function exists1(arr, search) {

              //       return arr.findIndex((item) => item[0] === search);
              //   }
              //     let INDEXoFF=exists1(googlesheet, vehiclett)
              //     console.log(INDEXoFF)
              //     let data =googlesheet[INDEXoFF][7];
              //     let value = "coverage";
              //     addToDriverBotCart({ data, value, recipientPhone });

              //     data =googlesheet[INDEXoFF][8];
              //     value = "last_insecption_date";
              //     addToDriverBotCart({ data, value, recipientPhone });

              //     data =googlesheet[INDEXoFF][9];
              //     value = "day_after_insecption";
              //     addToDriverBotCart({ data, value, recipientPhone });

              //     data =googlesheet[INDEXoFF][16];
              //     value = "CPKM";
              //     addToDriverBotCart({ data, value, recipientPhone });

              //     let numberOfIssuesInCart = listOfIssuesInCart({
              //       recipientPhone,
              //     }).count;
              //     console.log(numberOfIssuesInCart, "aksdfbk");
              //   }
              //   })
              //   .catch(function (error) {
              //     console.log(error);
              //   });



              let data = incomingMessage.text.body;

              let value = "text";
              await addToDriverBotCart({ data, value, recipientPhone });
              
              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
              
              // const delay = ms => new Promise(res => setTimeout(res, ms));

              // await delay(5000);

              // let is
              
              
              
              
              //sues = CustomerSession.get(recipientPhone).cart[1].coverage;

              // let issues1 = CustomerSession.get(recipientPhone).cart[3].day_after_insecption;
              // let issues2 = CustomerSession.get(recipientPhone).cart[4].CPKM;
              // console.log(issues,"gm1")

              await Whatsapp.sendImage({
                recipientPhone: recipientPhone,
                url: "https://i.ibb.co/4Nt5vm7/APML-Logo.png",
              });
            //   vonage.messages.send(
            //     new WhatsAppAudio({ url: 'https://drive.google.com/file/d/13BvcYUEQZx6jl3FyiQaN8_gCBIO7zdmx/view?usp=sharing' }, recipientPhone, recipientPhone,),
            //     (err, data) => {
            //         if (err) {
            //             console.error(err);
            //         } else {
            //             console.log(data.message_uuid);
            //         }
            //     }
            // );


              await Whatsapp.sendSimpleButtons({
                // ✅ वाटर लेवल
                // ✅आयल लेवल
                // ✅फैन बेल्ट
                // ✅वाटर पंप
                // ✅इंजन मॉउंटिंग
                // ✅पि शाफ़्ट बोल्ट
                // ✅क्रॉस
                // ✅सेण्टर बेअरिंग चेक
                // ✅कमानी यु बोल्ट चेक
                // ✅फ्यूल इंजेक्शन चेक
                // ✅ क्लच चेक
                message: `जय हिन्द 🇮🇳🇮🇳🇮🇳, \n\n⚠️ *कॉल  नोटिस*  📰⚠️\nकोई बी समस्या हो तो पहले व्हाट्सप्प पर टिकट बनाए !!!\n\n-------------------------------------------------------\n⚠️ *टायर पंक्चर नोटिस*  📰⚠️\nटायर पंक्चर होने पर तुरंत व्हाट्सप्प बोट पर कम्प्लेन डाले !!!\nकाम अप्रूवल के बाद हे करवाए !!!\nकोई बी दिकत आए तो वीडियो देखे👇\nhttps://youtu.be/QI2b-5hDM7w\n\n \n-------------------------------------------------------\n   *🚨APML कंट्रोल रूम 🚨*\n-------------------------------------------------------\n\nPlease select issue \nकृपया समस्या चुनें 👇👇👇`,

                // message: `जय हिन्द  ${recipientName}🙏, \n\n CPKM Status :  ${issues}\n Last Inspection : ${issues1} days ago \n Tyre Alignment Km : ${issues2}  \n\n *🚨APML कंट्रोल रूम 🚨*\n--------------------------------------\n\nकृपया समस्या चुनें 👇👇👇`,
                recipientPhone: recipientPhone,
                listOfButtons: [
                  {
                    headers: "hello",
                    title: " 🚚 गाड़ी का काम 🔩",
                    id: "Vehicle_Issue",
                  },
                  {
                    headers: "hello",
                    title: "🧾 हिसाब समस्या  🔎",
                    id: "hisab_issue",
                  },
                  {
                    headers: "hellodsg",
                    title: "👨‍💼 गाड़ी मालिक 🎧",
                    id: "gaadi_malik_help",
                  },
                ],
              });}
              
              else  if (  numberOfIssuesInCart == 6) {//tyre number



                data =incomingMessage.text.body
                let value = "Tyre_number";
                await addToDriverBotCart({ data, value, recipientPhone });
                // await Whatsapp.sendText({
                //   recipientPhone: recipientPhone,
                //   message: "Go to nearest shop and send mechanic mobile number !!\n\nआस पास कोई पंक्चर की दुकान पर पहुंचकर , मैकेनिक का मोबाइल नंबर भेजो !!📞📞📞",
                // });
                await Whatsapp.sendSimpleButtons({
                  message: `${recipientName}, \n\n*Do you have an stepney ?\nक्या आपके गाडी में स्टेपनी है?*`,
                  recipientPhone: recipientPhone,
                
                    listOfButtons: [
                      {
                          title: 'ओके स्टेपनी है  ',
                          id: `Yes_s`,
                      },
                      {
                          title: 'स्टेपनी नहीं  ',
                          id: 'No_s',
                      },
                      {
                          title: 'टूटी हुई स्टेपनी  ',
                          id: 'Yes_b',
                      },
                  ],
              
                });
              }
              else if (incomingMessage.text.body.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/) &&  ( numberOfIssuesInCart == 8 || numberOfIssuesInCart == 9 )) {//phone number
                data =incomingMessage.text.body
                let value = "Shopekeeper_number";
                await addToDriverBotCart({ data, value, recipientPhone });




                await Whatsapp.sendImage({
                  recipientPhone: recipientPhone,
                  url: "https://2.imimg.com/data2/YJ/JM/MY-3032165/nylon-tyre-patch-500x500.jpg",
                  caption: `Please enter the patch number\n(1-9 digits only) \n\nपंक्चर वाले को पूछो इसपे पैच कोनसे नंबर वाला लगेगा \n(*१ -९* क बिच का पैच नंबर डाले▫ ◽️ ◼️ )"`,
                });


            
              }
              if( (numberOfIssuesInCart == 9 || numberOfIssuesInCart == 10 )){//patch no
                
                data =incomingMessage.text.body

                let value = "patch_number";
                await addToDriverBotCart({ data, value, recipientPhone });   
                await Whatsapp.sendText({
                  recipientPhone: recipientPhone,
                  message: "Please Enter the Estimate amount !!\n\nकृपया एस्टीमेट खर्चा बताए !! 💵💵💵",
                });

              }



              else  if (incomingMessage.text.body.match(/^([1]?[0-9]{2,3}|2000)$/) && (numberOfIssuesInCart == 10 || numberOfIssuesInCart == 11) ) {//estimate amount
                data =incomingMessage.text.body
                let value = "estimate_amount";
                await addToDriverBotCart({ data, value, recipientPhone });
              await Whatsapp.sendSimpleButtons({
                message: `${recipientName}, \n\n*Are you Sure want to \nsubmit this ticket?*\n* क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                recipientPhone: recipientPhone,
                listOfButtons: [
                  {
                    headers: "hello",
                    title: "Yes  ",
                    id: "Yes",
                  },
                  {
                    headers: "hello",
                    title: "NO ",
                    id: "NO",
                  },
                ],
              });
              }
            }
            if (typeOfMsg === "simple_button_message") {
              let data = incomingMessage.button_reply.title;
              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
              
              console.log(numberOfIssuesInCart,"yyyyyyyyy")

              let message2 = incomingMessage;
              let button_id = incomingMessage.button_reply.id;

              if (button_id === "Vehicle_Issue" && numberOfIssuesInCart === 1) {
                let value = "issue";
                await addToDriverBotCart({ data, value, recipientPhone });
                let numberOfIssuesInCart = listOfIssuesInCart({
                  recipientPhone,
                }).count;
                
                await Whatsapp.sendImage({
                  recipientPhone: recipientPhone,
                  url: "https://i.ibb.co/Qmy9Pjp/image.png",
                  caption: `AMC Information/ ऐ.ऍम.सी जानकारी 📰📰📰`,
                });
                await Whatsapp.sendSimpleButtons({
                  message: `${recipientName}, \n\nIs your vehicle loaded or empty?\n*आपकी गाड़ी लोड है या खाली ?*\n🚚🚚🚚`,
                  recipientPhone: recipientPhone,
                  listOfButtons: [
                    {
                      headers: "hello",
                      title: "लोड ",
                      id: "Loadedvehicle",
                    },
                    {
                      headers: "hello",
                      title: "खाली",
                      id: "Emptyvehicle",
                    },
                  ],
                });

              }
              if ((button_id === "roti" || button_id === "otherkharcha")  && numberOfIssuesInCart === 5) {

                await addToDriverBotCart({ data, value, recipientPhone });
              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
              


                await Whatsapp.sendSimpleButtons({
                  message: `Are you Sure want to \n submit this ticket?\n क्या आपकी कंप्लेंट दर्ज करदे ?\n \n\n *⚠️नोट: गलत टिकट न बनाये* !!⚠️`,
                  recipientPhone: recipientPhone,
                  listOfButtons: [
                    {
                      headers: "hello",
                      title: "Yes  ",
                      id: "Yes",
                    },
                    {
                      headers: "hello",
                      title: "NO ",
                      id: "NO",
                    },
                  ],
                });



              }
              if ((button_id === "short" )  && numberOfIssuesInCart === 5) {
              let value = "Advance_Reason";
              await addToDriverBotCart({ data, value, recipientPhone });
              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
              
              

              await Whatsapp.sendSimpleButtons({
                message: `Are you Sure want to\n submit this ticket?\n क्या आपकी कंप्लेंट दर्ज करदे ?\n \n\n *⚠️नोट: गलत टिकट न बनाये* !!⚠️`,
                recipientPhone: recipientPhone,
                listOfButtons: [
                  {
                    headers: "hello",
                    title: "Yes  ",
                    id: "Yes",
                  },
                  {
                    headers: "hello",
                    title: "NO ",
                    id: "NO",
                  },
                ],
              });}

             else if (button_id === "hisab_issue" && numberOfIssuesInCart === 1) {
                let value = "issue";
                await addToDriverBotCart({ data, value, recipientPhone });
                let numberOfIssuesInCart = listOfIssuesInCart({
                  recipientPhone,
                }).count;
                 console.log(numberOfIssuesInCart, "aksdfbk");

                await Whatsapp.sendImage({
                  recipientPhone: recipientPhone,
                  url: "https://i.ibb.co/Qmy9Pjp/image.png",
                  caption: `AMC Information/ ऐ.ऍम.सी जानकारी 📰📰📰 `,
                });
                await Whatsapp.sendSimpleButtons({
                  message: `${recipientName},\n Is your vehicle loaded or empty?\n*आपकी गाड़ी लोड है या खाली ?*\n🚚🚚🚚`,
                  recipientPhone: recipientPhone,
                  listOfButtons: [
                    {
                      headers: "hello",
                      title: "लोड ",
                      id: "Loaded_hisab",
                    },
                    {
                      headers: "hello",
                      title: "खाली",
                      id: "Empty_hisab",
                    },
                  ],
                });

              }
              else if (button_id === "Yes" && noob.problem!='TyrePuncher/टायर पंचर '&& noob.issue!='🧾 हिसाब समस्या  🔎'&& noob.issue=='🚚 गाड़ी का काम 🔩' && noob.issue!='👨‍💼 गाड़ी मालिक 🎧' ) {
                var noob = CustomerSession.get(recipientPhone).cart.reduce(
                  function (acc, x) {
                    for (var key in x) acc[key] = x[key];
                    return acc;
                  },
                  {}
                );
                console.log(noob,"crm");

                postApi(noob, recipientPhone, vehiclenumber[indexof]);
                var config = {
                  method: "post",
                  url: "https://apis.fretron.com/issue/v1/issue",
                  headers: {
                    Authorization:
                      "Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w",
                    "Content-Type": "application/json",
                  },
                  data: dataP,
                };

                var axios = require('axios');
                axios(config)
                  .then(async (response) => {
                    const data1 = JSON.stringify(response.data.data.issueNo);
await Whatsapp.sendText({
  recipientPhone:recipientPhone,
  message:`Your complaint has be register with us our executive will contact you in ⏱15 minutes⏱ !!  \n\nआपकी कंप्लेंट कण्ट्रोल रूम में दर्ज हो चुकी है !!! अप्पकी केस की चेक हो रही है ⏱15  मिनट ⏱ में अप्पको कण्ट्रोल रूम से कॉल आजाएगे  !!🙏 \n\nकंप्लेंट कण्ट्रोल रूम से क्लोज /बंद होने पर ही खर्चा पास होगा🕵🏼‍♀️🕵🏼‍♀️🕵🏼‍♀️ !! \n\nतब तक ये वीडियो देखे !👇🏼👇🏼👇🏼!\n\n Training videos:- https://www.youtube.com/watch?v=pqm7EhDcqIA&list=PLvPcqpdi6RdzfhJcQhMaS7dzTa8iunEIV \n\nDriving Tips :- https://youtu.be/zYthLpVWufI\n\n Your Ticket Number is: \nअप्पके टिकट नंबर है \n`+data1
})
                    // console.log(data1)
                  })

                  .catch(function (error) {
                    console.log(error);
                  });

              } 

              
              
              else if (button_id === "NO") {
                await Whatsapp.sendSimpleButtons({
                  message: `Please start again by pressing below button\nकृपया दुबारा शुरवात करे , निचे दिए हुए बटन से !!!🔁🔁🔁`,

                  recipientPhone: recipientPhone,
                  listOfButtons: [
                    {
                      headers: "hello",
                      title: " दुबारा करे / reset ",
                      id: "reset",
                }]});
              }
              
               else if (button_id === "Yes" &&  noob.problem=='TyrePuncher/टायर पंचर ') {
                var noob = CustomerSession.get(recipientPhone).cart.reduce(
                  function (acc, x) {
                    for (var key in x) acc[key] = x[key];
                    
                    return acc;

                  },
                  {}
                );
                console.log(noob,"tyrep");
         
                postApi1(noob, recipientPhone, vehiclenumber[indexof]);
                var config = {
                  method: "post",
                  url: "https://apis.fretron.com/issue/v1/issue",
                  headers: {
                    Authorization:
                      "Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w",
                    "Content-Type": "application/json",
                  },
                  data: dataTyre,
                };
                axios(config)
                  .then(async (response) => {
                    const data1 = JSON.stringify(response.data.data.issueNo);
                  await Whatsapp.sendText({
                    recipientPhone:recipientPhone,
                    message:`Your complaint has be register with us our executive will contact you in ⏱15 minutes⏱ !!  \n\nआपकी कंप्लेंट कण्ट्रोल रूम में दर्ज हो चुकी है !!! अप्पकी केस की चेक हो रही है ⏱15  मिनट ⏱ में अप्पको कण्ट्रोल रूम से कॉल आजाएगे  !!🙏 \n\nकंप्लेंट कण्ट्रोल रूम से क्लोज /बंद होने पर ही खर्चा पास होगा🕵🏼‍♀️🕵🏼‍♀️🕵🏼‍♀️ !! \n\nतब तक ये वीडियो देखे !👇🏼👇🏼👇🏼!\n\n Training videos:- https://www.youtube.com/watch?v=pqm7EhDcqIA&list=PLvPcqpdi6RdzfhJcQhMaS7dzTa8iunEIV \n\nDriving Tips :- https://youtu.be/zYthLpVWufI\n\n Your Ticket Number is: \nअप्पके टिकट नंबर है \n`+data1
                    })
                    // console.log(data1)
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
              else if (button_id === "Yes" && noob.issue=='🧾 हिसाब समस्या  🔎' ) {
                var noob = CustomerSession.get(recipientPhone).cart.reduce(
                  function (acc, x) {
                    for (var key in x) acc[key] = x[key];
                    return acc;
                  },
                  {}
                );
                console.log(noob,"hisab");
               
                postApi2(noob, recipientPhone, vehiclenumber[indexof]);
                var config = {
                  method: "post",
                  url: "https://apis.fretron.com/issue/v1/issue",
                  headers: {
                    Authorization:
                      "Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w",
                    "Content-Type": "application/json",
                  },
                  data: dataHisab,
                };
               var axios = require('axios');
                axios(config)
                  .then(async (response) => {
                    console.log(response.text)
                    const data1 = JSON.stringify(response.data.data.issueNo);
                  await Whatsapp.sendText({
                    recipientPhone:recipientPhone,
                    message:`Your complaint has be register with us our executive will contact you in ⏱15 minutes⏱ !!  \n\nआपकी कंप्लेंट कण्ट्रोल रूम में दर्ज हो चुकी है !!! अप्पकी केस की चेक हो रही है ⏱15  मिनट ⏱ में अप्पको कण्ट्रोल रूम से कॉल आजाएगे  !!🙏 \n\nकंप्लेंट कण्ट्रोल रूम से क्लोज /बंद होने पर ही खर्चा पास होगा🕵🏼‍♀️🕵🏼‍♀️🕵🏼‍♀️ !! \n\nतब तक ये वीडियो देखे !👇🏼👇🏼👇🏼!\n\n Training videos:- https://www.youtube.com/watch?v=pqm7EhDcqIA&list=PLvPcqpdi6RdzfhJcQhMaS7dzTa8iunEIV \n\nDriving Tips :- https://youtu.be/zYthLpVWufI\n\n Your Ticket Number is: \nअप्पके टिकट नंबर है \n`+data1
                    })
                    // console.log(data1)
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }

              else if (button_id === "Yes" && noob.issue=='👨‍💼 गाड़ी मालिक 🎧' ) {
                var noob = CustomerSession.get(recipientPhone).cart.reduce(
                  function (acc, x) {
                    for (var key in x) acc[key] = x[key];
                    return acc;
                  },
                  {}
                );
                console.log(noob,"Gm");
               
                postApi3(noob, recipientPhone, vehiclenumber[indexof]);
                var config = {
                  method: "post",
                  url: "https://apis.fretron.com/issue/v1/issue",
                  headers: {
                    Authorization:
                      "Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w",
                    "Content-Type": "application/json",
                  },
                  data: dataGm,
                };
               var axios = require('axios');
                axios(config)
                  .then(async (response) => {
                    console.log(response.text)
                    const data1 = JSON.stringify(response.data.data.issueNo);
                  await Whatsapp.sendText({
                    recipientPhone:recipientPhone,
                    message:`Your complaint has be register with us our executive will contact you in ⏱15 minutes⏱ !!  \n\nआपकी कंप्लेंट कण्ट्रोल रूम में दर्ज हो चुकी है !!! अप्पकी केस की चेक हो रही है ⏱15  मिनट ⏱ में अप्पको कण्ट्रोल रूम से कॉल आजाएगे  !!🙏 \n\nकंप्लेंट कण्ट्रोल रूम से क्लोज /बंद होने पर ही खर्चा पास होगा🕵🏼‍♀️🕵🏼‍♀️🕵🏼‍♀️ !! \n\nतब तक ये वीडियो देखे !👇🏼👇🏼👇🏼!\n\n Training videos:- https://www.youtube.com/watch?v=pqm7EhDcqIA&list=PLvPcqpdi6RdzfhJcQhMaS7dzTa8iunEIV \n\nDriving Tips :- https://youtu.be/zYthLpVWufI\n\n Your Ticket Number is: \nअप्पके टिकट नंबर है \n`+data1
                    })
                    // console.log(data1)
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }

              else if (button_id === "Yesbattery"  ) {
                var noob = CustomerSession.get(recipientPhone).cart.reduce(
                  function (acc, x) {
                    for (var key in x) acc[key] = x[key];
                    return acc;
                  },
                  {}
                );
                console.log(noob,"battery");

                postApi5(noob, recipientPhone, vehiclenumber[indexof]);
                var config = {
                  method: "post",
                  url: "https://apis.fretron.com/issue/v1/issue",
                  headers: {
                    Authorization:
                      "Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w",
                    "Content-Type": "application/json",
                  },
                  data: dataBattery,
                };

                axios(config)
                  .then(async (response) => {
                    const data1 = JSON.stringify(response.data.data.issueNo);
await Whatsapp.sendText({
  recipientPhone:recipientPhone,
  message:`Your complaint has be register with us our executive will contact you in ⏱15 minutes⏱ !!  \n\nआपकी कंप्लेंट कण्ट्रोल रूम में दर्ज हो चुकी है !!! अप्पकी केस की चेक हो रही है ⏱15  मिनट ⏱ में अप्पको कण्ट्रोल रूम से कॉल आजाएगे  !!🙏 \n\nकंप्लेंट कण्ट्रोल रूम से क्लोज /बंद होने पर ही खर्चा पास होगा🕵🏼‍♀️🕵🏼‍♀️🕵🏼‍♀️ !! \n\nतब तक ये वीडियो देखे !👇🏼👇🏼👇🏼!\n\n Training videos:- https://www.youtube.com/watch?v=pqm7EhDcqIA&list=PLvPcqpdi6RdzfhJcQhMaS7dzTa8iunEIV \n\nDriving Tips :- https://youtu.be/zYthLpVWufI\n\n Your Ticket Number is: \nअप्पके टिकट नंबर है \n`+data1
})
                    // console.log(data1)
                  })

                  .catch(function (error) {
                    console.log(error);
                  });

              }





                if (button_id === "gaadi_malik_help" && numberOfIssuesInCart ===1) {

                  let value = "issue";
                await addToDriverBotCart({ data, value, recipientPhone });



                  await Whatsapp.sendImage({
                    recipientPhone: recipientPhone,
                    url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    caption: `AMC Information/ ऐ.ऍम.सी जानकारी 📰📰📰`,
                  });
                  await Whatsapp.sendSimpleButtons({
                    message: `${recipientName}, \nIs your vehicle loaded or empty?\n*आपकी गाड़ी लोड है या खाली ?*\n🚚🚚🚚`,
                    recipientPhone: recipientPhone,
                    listOfButtons: [
                      {
                        headers: "hello",
                        title: "लोड ",
                        id: "Loaded_gaadimalik",
                      },
                      {
                        headers: "hello",
                        title: "खाली",
                        id: "Empty_gaadimalik",
                      },
                    ],
                  });

              }
              if ((button_id === "Loaded_gaadimalik" ||button_id ==="Empty_gaadimalik" || button_id ==="Loadedvehicle" || button_id ==="Emptyvehicle" || button_id ==="Empty_hisab" || button_id ==="Loaded_hisab" ) && numberOfIssuesInCart === 2) {

                let data = button_id;
                let value = "vehicle_Status";
                await addToDriverBotCart({ data, value, recipientPhone });
                let numberOfIssuesInCart = listOfIssuesInCart({
                  recipientPhone,
                }).count;
                console.log(numberOfIssuesInCart, "aksdfbk");
                await Whatsapp.sendImage({
                  recipientPhone: recipientPhone,
                  url: "https://i.ibb.co/gjLkSfG/location-png.png",
                  caption: `Please Share Your current Location 🌏🌏🌏` + "\n\nकृपा Whatsapp पे करंट लोकेशन भेजे , फोटो क अनुसार !!",
                });


              }
              if(button_id === "reset"){
                // await Whatsapp.sendText({
                //   recipientPhone: recipientPhone,
                //   message: "*🚨APML कंट्रोल रूम 🚨*\n--------------------------------------\n\n Please wait while we verify your details !! \n\n कृपया इंतज़ार करे , तब तक हम आपका डिटेल्स चेक करते है  !!",
                // });
               CustomerSession.get(recipientPhone).cart = [];
              let value = "text";
              await addToDriverBotCart({ data, value, recipientPhone });
              console.log(
                CustomerSession.get(recipientPhone).cart,
                "Puybaskdfb"
              );
              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
              console.log(numberOfIssuesInCart, "aksdfbk");
              await Whatsapp.sendImage({
                recipientPhone: recipientPhone,
                url: "https://i.ibb.co/4Nt5vm7/APML-Logo.png",
              });
              await Whatsapp.sendSimpleButtons({
                message: `जय हिन्द 🙏, \n\n   *🚨APML कंट्रोल रूम 🚨*\n--------------------------------------\n\nकृपया समस्या चुनें 👇👇👇`,

                recipientPhone: recipientPhone,
                listOfButtons: [
                  {
                    headers: "hello",
                    title: " 🚚 गाड़ी का काम 🔩",
                    id: "Vehicle_Issue",
                  },
                  {
                    headers: "hello",
                    title: "🧾 हिसाब समस्या  🔎",
                    id: "hisab_issue",
                  },
                  {
                    headers: "hellodsg",
                    title: "👨‍💼 गाड़ी मालिक 🎧",
                    id: "gaadi_malik_help",
                  },
                ],
              });}

              if(((button_id === "Vehicle_Issue" || button_id === "gaadi_malik_help" ||button_id === "hisab_issue" ) && (numberOfIssuesInCart !== 1 ))||(( button_id === "Loaded_gaadimalik" ||button_id ==="Empty_gaadimalik" || button_id ==="Loadedvehicle" || button_id ==="Emptyvehicle" || button_id ==="Empty_hisab" || button_id ==="Loaded_hisab" ) &&(numberOfIssuesInCart !== 2))){
             
                await Whatsapp.sendSimpleButtons({
                  message: `Please start again by pressing below button\nकृपया दुबारा शुरवात करे , निचे दिए हुए बटन से !!!\n🔁🔁🔁 `,
  
                  recipientPhone: recipientPhone,
                  listOfButtons: [
                    {
                      headers: "hello",
                      title: " दुबारा करे / reset",
                      id: "reset",
                    }
  
                  ],
                })}
if(button_id ==='Yes_s'){

  let data = 'Yes';
  let value = "Stepney_availibility";
  await addToDriverBotCart({ data, value, recipientPhone });
  let numberOfIssuesInCart = listOfIssuesInCart({
    recipientPhone,
  }).count;
  
  console.log(numberOfIssuesInCart, "aksdfbk");


  await Whatsapp.sendText({
    message: `${recipientName}, \n\n" Please Call To This Number :- 7415462045  and Submit the ticket `,
    recipientPhone: recipientPhone,
  });
  await Whatsapp.sendSimpleButtons({
    message: `${recipientName}, \n\n*Are you Sure want to\n submit this ticket?*\n* क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
    recipientPhone: recipientPhone,
    listOfButtons: [
      {
        headers: "hello",
        title: "Yes  ",
        id: "Yes",
      },
      {
        headers: "hello",
        title: "NO ",
        id: "NO",
      },
    ],
  });
}


if(button_id ==='battery'||button_id ==='battery1'||button_id ==='battery2'){

  let data = incomingMessage.button_reply.title;
  let value = "Battery_Subissue";
  await addToDriverBotCart({ data, value, recipientPhone });
  let numberOfIssuesInCart = listOfIssuesInCart({
    recipientPhone,
  }).count;
  
  console.log(numberOfIssuesInCart, "battery sub issue added");


  await Whatsapp.sendText({
    
    
    message: `Please Upload One Photo of Battery Proof 📲📸\n\nकृपया बैटरी प्रूफ की एक फोटो अपलोड करें 📲📸`,
    recipientPhone: recipientPhone,
  });
}

if(button_id ==='No_s'){
  let data = 'No';
  let value = "Stepney_availibility";
  await addToDriverBotCart({ data, value, recipientPhone });
  let numberOfIssuesInCart = listOfIssuesInCart({
    recipientPhone,
  }).count;
  console.log(numberOfIssuesInCart, "aksdfbk");


  await Whatsapp.sendText({
    message: `${recipientName}, \n\n"Go to nearest shop and send mechanic mobile number !!\n\nआस पास कोई पंक्चर की दुकान पर पहुंचकर , मैकेनिक का मोबाइल नंबर भेजो !!📞📞📞 `,
    recipientPhone: recipientPhone,
  });
}
if(button_id ==='Yes_b'){
  let data = 'Not Workable';
  let value = "Stepney_availibility";
  await addToDriverBotCart({ data, value, recipientPhone });
  let numberOfIssuesInCart = listOfIssuesInCart({
    recipientPhone,
  }).count;
   console.log(numberOfIssuesInCart, "aksdfbk");


  await Whatsapp.sendText({
    message: `${recipientName}, \n\n" Please send damaged stepney photo.\nकृपया स्टपनी का फोटो भेजे   `,
    recipientPhone: recipientPhone,
  });
}
//123
             
            }
            if (typeOfMsg === "radio_button_message") {

              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
               console.log(numberOfIssuesInCart,"yyyyyyyyyqqqqqq")

              if (typeOfMsg === "radio_button_message" && numberOfIssuesInCart === 4 ){


              let selectionId = incomingMessage.list_reply.id; // the Driver clicked and submitted a radio button
              let data = incomingMessage.list_reply.title;
              let value = "problem";
              await addToDriverBotCart({ data, value, recipientPhone });
              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
               console.log(numberOfIssuesInCart, "aksdfbk");
              if (selectionId.startsWith("issue_")) {
                let issue_id = selectionId.split("_")[1];



                switch (Number(issue_id)) {
                  case 1:
                    await Whatsapp.sendImage({
                      recipientPhone: recipientPhone,
                      url: "http://www.lesschwab.com/on/demandware.static/-/Library-Sites-LesSchwabLibrary/default/dw6f009656/images/learningCenter/article/tile/TileArticleFlatTireReplaced_600-300.jpg",
                      caption: `Please Upload One Photo of Punctured Tyre as per example 📲📸\n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें 📲📸`,
                    });

                    break;
                  case 2:
                    await Whatsapp.sendImage({
                      recipientPhone: recipientPhone,
                      url: "https://www.aacdelavan.com/wp-content/uploads/2019/02/Alternator-Replacement-and-Repair-Services-in-Delavan-1.jpg",
                      caption: "\nयह हिस्सा ए.एम.सी (AMC)✅  बीमा में शामिल है\n",
                    });
                    await Whatsapp.sendSimpleButtons({
                      message: `Are you Sure want to \n submit this ticket?\n क्या आपकी कंप्लेंट दर्ज करदे ?\n \n\n *⚠️नोट: गलत टिकट न बनाये* !!⚠️`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    });

                    break;
                  case 3:
                    await Whatsapp.sendImage({
                      recipientPhone: recipientPhone,
                      url: "https://innovationdiscoveries.space/wp-content/uploads/2019/11/Main-Components-of-Gear-Box-1-1200x720.jpg",
                      caption: "\nयह हिस्सा ए.एम.सी (AMC)✅  बीमा में शामिल है\n  ",
                    });
                    await Whatsapp.sendSimpleButtons({
                      message: `Are you Sure want to \n submit this ticket?\n क्या आपकी कंप्लेंट दर्ज करदे ?\n \n\n *⚠️नोट: गलत टिकट \n न बनाये* !!⚠️`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    });

                    break;
                  case 4:
                     await Whatsapp.sendImage({
                      recipientPhone: recipientPhone,
                      url: "https://www.falmouthmotorcar.com/wp-content/uploads/2015/03/clutch1.jpg",
                      caption: "\nयह हिस्सा ए.एम.सी (AMC)✅  बीमा में शामिल है\n\n ",
                    });
                    await Whatsapp.sendSimpleButtons({
                      message: `Are you Sure want to submit this ticket?\n क्या आपकी कंप्लेंट दर्ज करदे ?\n \n\n *⚠️नोट: गलत टिकट \n न बनाये⚠️* !!`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    });
                    break;
                  case 5:
                   
                    await Whatsapp.sendSimpleButtons({
                      message: `Are you Sure want to submit this ticket?\n क्या आपकी कंप्लेंट दर्ज करदे ?\n \n\n *⚠️नोट: गलत टिकट न बनाये* !!⚠️`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    });
                    break;
                  case 6:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "http://www.lesschwab.com/on/demandware.static/-/Library-Sites-LesSchwabLibrary/default/dw6f009656/images/learningCenter/article/tile/TileArticleFlatTireReplaced_600-300.jpg",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n*क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    });

                    break;
                  case 7:
                    
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n *Please select sub issue of Battery * \n *बैटरी में क्या दिक्कत आरही है ?\n कृपया चुने !!!* \n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "चार्जिंग",
                          id: "battery",
                        },
                        {
                          headers: "hello",
                          title: "केबल/टर्मिनल ",
                          id: "battery1",
                        },
                        {
                          headers: "hello",
                          title: "फट गयी ",
                          id: "battery2",
                        }
                      ],
                    });

                    break;
                  case 8:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "http://www.lesschwab.com/on/demandware.static/-/Library-Sites-LesSchwabLibrary/default/dw6f009656/images/learningCenter/article/tile/TileArticleFlatTireReplaced_600-300.jpg",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });

                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n* क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
             ;
                  case 9:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "http://www.lesschwab.com/on/demandware.static/-/Library-Sites-LesSchwabLibrary/default/dw6f009656/images/learningCenter/article/tile/TileArticleFlatTireReplaced_600-300.jpg",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });

                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 10:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "http://www.lesschwab.com/on/demandware.static/-/Library-Sites-LesSchwabLibrary/default/dw6f009656/images/learningCenter/article/tile/TileArticleFlatTireReplaced_600-300.jpg",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });

                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n* क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 11:
                    await Whatsapp.sendSimpleButtons({
                      message: `\n\n Only amount as per SOP will be passed\n\nखर्चा जितना आपका बनेगा उतना हे मिलेगा। \n कृपया एक्स्ट्रा पैसे की गकत टिकट न बनाए।  \n कृपया Rs चुनें 👇👇👇`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "शार्ट एडवांस 💵  ",
                          id: "short",
                        },
                        {
                          headers: "hello",
                          title: "रोटी खर्चा💶 ",
                          id: "roti",
                        },
                        {
                          headers: "hellodsg",
                          title: "अन्य खर्चा 💷",
                          id: "otherkharcha",
                        },
                      ],
                    });

                    break;
                  case 12:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 13:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 14:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 15:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.pinimg.com/originals/ef/45/f6/ef45f6255b57e4e51d4851146dc14507.jpg54 ",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 16:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n* क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 17:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?\n क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 18:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })

                    break;
                  case 19:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please Upload One Photo of Punctured Tyre as per example \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;
                    case 20:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please Upload One Photo of Mileage as per example \n\nकृपया उदाहरण के अनुसार माइलेजकी एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*
                      `,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;case 21:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please select the yes option to raised the issue \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n* क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;case 22:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please select the yes option to raised the issue  \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;case 23:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please select the yes option to raised the issue  \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;case 24:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please select the yes option to raised the issue  \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n* क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;case 25:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please select the yes option to raised the issue  \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;case 26:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please select the yes option to raised the issue  \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;case 27:
                    // await Whatsapp.sendImage({
                    //   recipientPhone: recipientPhone,
                    //   url: "https://i.ibb.co/Qmy9Pjp/image.png",
                    //   caption: `Please select the yes option to raised the issue  \n\nकृपया उदाहरण के अनुसार पंचर टायर की एक फोटो अपलोड करें`,
                    // });
                    await Whatsapp.sendSimpleButtons({
                      message: `${recipientName}, \n\n*Are you Sure want to submit this ticket?*\n *क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                      recipientPhone: recipientPhone,
                      listOfButtons: [
                        {
                          headers: "hello",
                          title: "Yes  ",
                          id: "Yes",
                        },
                        {
                          headers: "hello",
                          title: "NO ",
                          id: "NO",
                        },
                      ],
                    })
                    break;
                }
              }
            } else {
              await Whatsapp.sendSimpleButtons({
                message: `Please start again by pressing below button\nकृपया दुबारा शुरवात करे , निचे दिए हुए बटन से !!!\n🔁🔁🔁 `,

                recipientPhone: recipientPhone,
                listOfButtons: [
                  {
                    headers: "hello",
                    title: " दुबारा करे / reset",
                    id: "reset",
                  }

                ],
              })
          }
          }
            if (typeOfMsg === "media_message") {
              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
        
              
              console.log(numberOfIssuesInCart, "aksdfbk");
              if (typeOfMsg === "media_message" && numberOfIssuesInCart ===5 ) {
              console.log(incomingMessage);
              let dataP = incomingMessage.image.id;
              //
              const url = "https://graph.facebook.com/v14.0/" + dataP;
              const options = {
                headers: {
                  Authorization:
                    "Bearer xxxxxxxxxxxxxxxxxxx",
                },
              };
              https.get(url, options, (response) => {
                // var result = response.text();
                let finalData = "";
                response.on("data", function (data) {
                  finalData += data.toString();
                });
                response.on("end", function () {
                  const parsedData = JSON.parse(finalData);
                  console.log(parsedData);
                  const imageDataURI = require("image-data-uri");
                  const fetchImage = async (
                    file_name,
                    recipientPhone,
                    callback
                  ) => {
                    var data = "";

                    const url = parsedData.url;

                    var config = {
                      method: "get",
                      url: url,
                      headers: {
                        Authorization:
                          "Bearer xxxxxxxxxxxxxxxxxxx",
                      },
                      data: data,
                    };
                    axios({
                      ...config,
                      responseType: "arraybuffer",
                    })
                      .then(async (response) => {
                        const data = response.data;
                        const datauri =
                          "data:image/jpeg;base64," + data.toString("base64");
                        fs.writeFileSync(file_name + ".txt", datauri);
                        await imageDataURI.outputFile(
                          datauri,
                          file_name + ".jpeg"
                        );
                        callback("success", undefined);
                      })
                      .catch(function (error) {
                        console.log(error);
                        callback(undefined, error);
                      });
                  };
                  const uploadImage = require("./uploadToDrive");
                  const imageFileName = "new_image";
                  fetchImage(imageFileName, recipientPhone, (res, error) => {
                    if (error) {
                      console.log("error while fetching image");
                    } else {
                      console.log(res);
                      uploadImage(imageFileName, (res, error) => {
                        if (error) {
                          console.log("error while uploading image");
                        } else {
                          console.log("https://drive.google.com/file/d/" + res);
                          let data = "https://drive.google.com/file/d/" + res;
                          let value = "proof_link";
                          addToDriverBotCart({ data, value, recipientPhone });
                          let numberOfIssuesInCart = listOfIssuesInCart({
                            recipientPhone,
                          }).count;
                           console.log(numberOfIssuesInCart,CustomerSession.get(recipientPhone).cart);
                        }
                      });
                    }
                  });
                });
              });
              //
              // let data=incomingMessage.image.id
              let value = "proof";
              await addToDriverBotCart({ data, value, recipientPhone });
              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
             

            
              await Whatsapp.sendImage({
                recipientPhone: recipientPhone,
                url: "https://i.ibb.co/c8gqsBB/download-1.jpg",
                caption: `Please Enter the tyre Number\n\nकृपया टायर नंबर टाइप करे , 👀 ध्यान से 👀!!`,
              });
            }
            if (typeOfMsg === "media_message" && numberOfIssuesInCart ===8 ) {
              console.log(incomingMessage);
              let dataP = incomingMessage.image.id;
              //
              const url = "https://graph.facebook.com/v14.0/" + dataP;
              const options = {
                headers: {
                  Authorization:
                    "Bearer xxxxxxxxxxxxxxxxxxx",
                },
              };
              https.get(url, options, (response) => {
                // var result = response.text();
                let finalData = "";
                response.on("data", function (data) {
                  finalData += data.toString();
                });
                response.on("end", function () {
                  const parsedData = JSON.parse(finalData);
                  console.log(parsedData);
                  const imageDataURI = require("image-data-uri");
                  const fetchImage = async (
                    file_name,
                    recipientPhone,
                    callback
                  ) => {
                    var data = "";

                    const url = parsedData.url;

                    var config = {
                      method: "get",
                      url: url,
                      headers: {
                        Authorization:
                          "Bearer xxxxxxxxxxxxxxxxxxx",
                      },
                      data: data,
                    };
                    axios({
                      ...config,
                      responseType: "arraybuffer",
                    })
                      .then(async (response) => {
                        const data = response.data;
                        const datauri =
                          "data:image/jpeg;base64," + data.toString("base64");
                        fs.writeFileSync(file_name + ".txt", datauri);
                        await imageDataURI.outputFile(
                          datauri,
                          file_name + ".jpeg"
                        );
                        callback("success", undefined);
                      })
                      .catch(function (error) {
                        console.log(error);
                        callback(undefined, error);
                      });
                  };
                  const uploadImage = require("./uploadToDrive");
                  const imageFileName = "new_image";
                  fetchImage(imageFileName, recipientPhone, (res, error) => {
                    if (error) {
                      console.log("error while fetching image");
                    } else {
                      console.log(res);
                      uploadImage(imageFileName, (res, error) => {
                        if (error) {
                          console.log("error while uploading image");
                        } else {
                          console.log("https://drive.google.com/file/d/" + res);
                          let data = "https://drive.google.com/file/d/" + res;
                          let value = "stepney_link";
                          addToDriverBotCart({ data, value, recipientPhone });
                          let numberOfIssuesInCart = listOfIssuesInCart({
                            recipientPhone,
                          }).count;
                          console.log(numberOfIssuesInCart,CustomerSession.get(recipientPhone).cart);
                        }
                      });
                    }
                  });
                });
              });
              //
              // let data=incomingMessage.image.id
           
             
              await Whatsapp.sendText({
                message: `${recipientName}, \n\n" "Go to nearest shop and send mechanic mobile number !!\n\nआस पास कोई पंक्चर की दुकान पर पहुंचकर , मैकेनिक का मोबाइल नंबर भेजो !!📞📞📞 `,
                recipientPhone: recipientPhone,
              });
            }
            if (typeOfMsg === "media_message" && numberOfIssuesInCart ===6 && CustomerSession.get(recipientPhone).cart[4].problem=="Battery/बैटरी" ) {
              console.log(incomingMessage);
              console.log(
                CustomerSession.get(recipientPhone).cart[4].problem,
                "battery"
              );
              let dataP = incomingMessage.image.id;
              //
              const url = "https://graph.facebook.com/v14.0/" + dataP;
              const options = {
                headers: {
                  Authorization:
                    "Bearer xxxxxxxxxxxxxxxxxxx",
                },
              };
              https.get(url, options, (response) => {
                // var result = response.text();
                let finalData = "";
                response.on("data", function (data) {
                  finalData += data.toString();
                });
                response.on("end", function () {
                  const parsedData = JSON.parse(finalData);
                  console.log(parsedData);
                  const imageDataURI = require("image-data-uri");
                  const fetchImage = async (
                    file_name,
                    recipientPhone,
                    callback
                  ) => {
                    var data = "";

                    const url = parsedData.url;

                    var config = {
                      method: "get",
                      url: url,
                      headers: {
                        Authorization:
                          "Bearer xxxxxxxxxxxxxxxxxxx",
                      },
                      data: data,
                    };
                    axios({
                      ...config,
                      responseType: "arraybuffer",
                    })
                      .then(async (response) => {
                        const data = response.data;
                        const datauri =
                          "data:image/jpeg;base64," + data.toString("base64");
                        fs.writeFileSync(file_name + ".txt", datauri);
                        await imageDataURI.outputFile(
                          datauri,
                          file_name + ".jpeg"
                        );
                        callback("success", undefined);
                      })
                      .catch(function (error) {
                        console.log(error);
                        callback(undefined, error);
                      });
                  };
                  const uploadImage = require("./uploadToDrive");
                  const imageFileName = "new_image";
                  fetchImage(imageFileName, recipientPhone, (res, error) => {
                    if (error) {
                      console.log("error while fetching image");
                    } else {
                      console.log(res);
                      uploadImage(imageFileName, (res, error) => {
                        if (error) {
                          console.log("error while uploading image");
                        } else {
                          console.log("https://drive.google.com/file/d/" + res);
                          let data = "https://drive.google.com/file/d/" + res;
                          let value = "proof_link2";
                          addToDriverBotCart({ data, value, recipientPhone });
                          let numberOfIssuesInCart = listOfIssuesInCart({
                            recipientPhone,
                          }).count;
                          console.log(numberOfIssuesInCart,CustomerSession.get(recipientPhone).cart);
                        }
                      });
                    }
                  });
                });
              });
              //
              // let data=incomingMessage.image.id
           
              // help - await for 5 sec as ticket is raised before image url
              await Whatsapp.sendSimpleButtons({
                message: `${recipientName}, \n\n*Are you Sure want to submit this ticketb ?*\n* क्या आपकी कंप्लेंट दर्ज करदे ?*\n \n\n *⚠️नोट: गलत टिकट न बनाये⚠️*`,
                recipientPhone: recipientPhone,
                listOfButtons: [
                  {
                    headers: "hello",
                    title: "Yes  ",
                    id: "Yesbattery",
                  },
                  {
                    headers: "hello",
                    title: "NO ",
                    id: "No",
                  },
                ],
              });
            }
          

          }

            let numberOfIssuesInCart = listOfIssuesInCart({
              recipientPhone,
            }).count;
             console.log(numberOfIssuesInCart, "aksdfbk");
            if (typeOfMsg === "location_message") {

              let numberOfIssuesInCart = listOfIssuesInCart({
                recipientPhone,
              }).count;
               console.log(numberOfIssuesInCart,"zzzzzzzz")
               let issues = CustomerSession.get(recipientPhone).cart[2].vehicle_status;
               console.log(issues,"gm")


              if (typeOfMsg === "location_message" && numberOfIssuesInCart ==3 && (issues == "Loaded_gaadimalik" ||issues == "Empty_gaadimalik")){
                console.log(issues,"Location on Gaadi Malik issue")


              await Whatsapp.sendText({
                recipientPhone: recipientPhone,
                message: `Your Location has been registered with us !! \n\n आपकी लोकेशन हमें मिल चुकी है !!✅✅✅`,
              });



              Whatsapp.sendRadioButtons({
                recipientPhone: recipientPhone,
                headerText: `APML - :`,
                bodyText: `\n\n कृपया समस्या चुनें  👇👇👇`,
                footerText: `Agarwal Packers & Movers Ltd ®`,
                listOfSections,
                headers: `hello`,
              });


              let lat = incomingMessage.location.latitude
              let long = incomingMessage.location.longitude

              let data = "https://www.google.com/maps/place/"+lat+","+long
              let value = "location";
              await addToDriverBotCart({ data, value, recipientPhone })

            }
              else if (typeOfMsg === "location_message" && numberOfIssuesInCart ==3 && (issues == "Loadedvehicle" ||issues == "Emptyvehicle")){

                console.log(issues,"Location on Vehicle  issue")

                let listOfSections = [
                  {
                    title: `IssueForv`,
                    headers: `hello`,
                    rows: [
                      {
                        id: "issue_1",
                        title: "TyrePuncher/टायर पंचर ",
                        description: "tyre ka kaam...",
                      },
                      {
                        id: "issue_2",
                        title: "Altinator/आल्टरनेटर",
                        description: "Altinator ka kaam ...",
                      },
                      {
                        id: "issue_3",
                        title: "Gear /गियर ",
                        description: "gear ka kaam ...",
                      },
                      {
                        id: "issue_4",
                        title: "Clutch/क्लच",
                        description: "clutch ka kaam ...",
                      },
                      {
                        id: "issue_5",
                        title: "Starting Issue/स्टार्ट ",
                        description: "starter ka kaam ...",
                      },
                      {
                        id: "issue_6",
                        title: "Accident/ऐक्सीडेंट ",
                        description: "Emergency",
                      },
                      {
                        id: "issue_7",
                        title: "Battery/बैटरी",
                        description: "battery ka kaam ...",
                      },
                      {
                        id: "issue_8",
                        title: "New Tyre/टायर की समस्या",
                        description: "naya tyre ...",
                      },
                      {
                        id: "issue_9",
                        title: "Other Issue/अन्य मुद्दे",
                        description: "aur kaam hai ...",
                      },
                    ],
                  },
                ];

                await Whatsapp.sendText({
                  recipientPhone: recipientPhone,
                  message: `Your Location has been registered with us !! \n\n आपकी लोकेशन हमें मिल चुकी है !!✅✅✅`,
                });



                Whatsapp.sendRadioButtons({
                  recipientPhone: recipientPhone,
                  headerText: `APML- :`,
                  bodyText: `\n कृपया समस्या चुनें  👇👇👇`,
                  footerText: `Agarwal Packers & Movers Ltd ®`,
                  listOfSections,
                  headers: `hellov`,
                });

                let lat = incomingMessage.location.latitude
                let long = incomingMessage.location.longitude

                let data = "https://www.google.com/maps/place/"+lat+","+long
                let value = "location";
                await addToDriverBotCart({ data, value, recipientPhone });
              }

                else if (typeOfMsg === "location_message" && numberOfIssuesInCart ==3 && (issues == "Loaded_hisab" || issues == "Empty_hisab")) {


                console.log(issues,"Location on Vehicle  issue")

                let listOfSections = [
                  {
                    title: `IssueForv`,
                    headers: `hello`,
                    rows: [
                      {
                        id: "issue_20",
                        title: "mileage /माइलेज",
                        description: "mileage issue...",
                      },
                      {
                        id: "issue_21",
                        title: "Entry/एंट्री",
                        description: "Entry ka issue...",
                      },
                      {
                        id: "issue_22",
                        title: "fooding/फूडिंग",
                        description: "khana kharcha...",
                      },
                      {
                        id: "issue_23",
                        title: "salary/सैलरी",
                        description: "salary issue...",
                      },
                      {
                        id: "issue_24",
                        title: "Short KM/शार्ट किलोमीटर",
                        description: "kilometer kam... ",
                      },
                      {
                        id: "issue_25",
                        title: "naam paise/नाम पैसे",
                        description: "naam ke pasia...",
                      },
                      {
                        id: "issue_26",
                        title: "nikale paise/निकले पैसे",
                        description: "nikale pasia issue....",
                      },
                      {
                        id: "issue_27",
                        title: "Other Issue/अन्य मुद्दे",
                        description: "aur kaam hai ...",
                      },

                    ],
                  },
                ];

                await Whatsapp.sendText({
                  recipientPhone: recipientPhone,
                  message: `Your Location has been registered with us !! \n\n आपकी लोकेशन हमें मिल चुकी है !!✅✅✅`,
                });
                Whatsapp.sendRadioButtons({
                  recipientPhone: recipientPhone,
                  headerText: `APML- :`,
                  bodyText: `\n कृपया समस्या चुनें  👇👇👇`,
                  footerText: `Agarwal Packers & Movers Ltd ®`,
                  listOfSections,
                  headers: `hellov`,
                });

                let lat = incomingMessage.location.latitude
                let long = incomingMessage.location.longitude

                let data = "https://www.google.com/maps/place/"+lat+","+long
                let value = "location";
                await addToDriverBotCart({ data, value, recipientPhone });
              }

            }
            // | incomingMessage.text.body.match(/[2]/)|| incomingMessage.text.body.match(/[3]/)|| incomingMessage.text.body.match(/[4]/)|| incomingMessage.text.body.match(/[5]/)|| incomingMessage.text.body.match(/[6]/)|| incomingMessage.text.body.match(/[7]/)|| incomingMessage.text.body.match(/[8]/)|| incomingMessage.text.body.match(/[9]/)
          }
          
         
            else if(!TF){console.log(shplissue)
            
if (incomingMessage.type == 'text_message') {

  let numberOfIssuesInCart = emplyLostPackage({
    recipientPhone,
  }).count;



 
  if(incomingMessage.text.body.split("-")[0].toUpperCase()==="SHPL" ){

    ShplSession.set(recipientPhone, {
      sessionInfo: [],
    });

    data = incomingMessage.text.body.split("-")[1]
    let value = "number"
    await addToSHPLBotCart({ data, value, recipientPhone });
    console.log(data, "data inside the cart ")
    


    await Whatsapp.sendSimpleButtons({
    
        message:'Hey! '+recipientName+', \n\n 🎫We warmly Welcome you to the *Agarwal Packers & Movers Ltd.* ISSUE TICKETTING BOT. \n\n\nThis bot is designed to streamline the Issues Ticketing Process.Our bot will provide you with helpful prompts and suggestions to make the process as smooth as possible.\n\nThank you for being a part of *Agarwal Packers & Movers Ltd.*, where innovation and technology meet to provide you with the best experience.😊',
        recipientPhone:recipientPhone,
       
        listOfButtons: [
          {
              title: 'Escalations',
              id: 'escalation',
          },
          {
              title: 'Tracking Update',
              id: 'tracking',
          },
          {
            title: 'Abnormalities',
            id: 'no',
        },
       
      ],
      
    })
    
  }
  else if(numberOfIssuesInCart === 2 && shplissue.cons === 'Escalations'||numberOfIssuesInCart === 2 && shplissue.cons === 'Tracking Update'||numberOfIssuesInCart === 2 && shplissue.cons === 'abnormalities'){
    let data = incomingMessage.text.body
    let value = "cart_data";
    await addToSHPLBotCart({ data, value, recipientPhone });
    console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")
    Whatsapp.sendSimpleButtons({
      
      message:'Hey! '+recipientName+', \n\nWould you like to Confirm Your Issue?',
      recipientPhone:recipientPhone,
     
      listOfButtons: [
        {
            title: 'YES',
            id: 'yes',
        },
        {
            title: 'NO',
            id: 'no',
        },
     
    ],
    
  })

  }
  else{
    await Whatsapp.sendText({
              message: `You are not registered as Driver. Please contact Control Room on 9077773333.\n\nआपका नंबर हमारे सिस्टम में रजिस्टर्ड नहीं है।  कृपया ९०७७७७३३३३ पैर कॉल करे और नंबर अपडेट करवाए।   
               `,
              recipientPhone: recipientPhone,
             
            });
  }

  
  
  
}
if (typeOfMsg === 'simple_button_message') {
  let button_id = incomingMessage.button_reply.id;
  let button_id1 = incomingMessage.button_reply.title
  let numberOfIssuesInCart = emplyLostPackage({
    recipientPhone,
  }).count;

  if(button_id === 'escalation' && numberOfIssuesInCart === 1||button_id === 'tracking' && numberOfIssuesInCart === 1||button_id === 'abnormalities' && numberOfIssuesInCart === 1){
    let data = button_id1
    let value = "cons";
    await addToSHPLBotCart({ data, value, recipientPhone });
    console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")
    await Whatsapp.sendText({
      message:"Please Type Your Remark",
      recipientPhone: recipientPhone
    })

    
    






   

  }
  if(button_id === 'no' && numberOfIssuesInCart === 3){
    let data = button_id
    let value = "cons";
    await addToSHPLBotCart({ data, value, recipientPhone });
    console.log(recipientPhone, "aaaaaaaaaaaaaaaaaaaa")
    await Whatsapp.sendText({
      message:"OOPS!😞❌\nPress the link again to do the issue again,type *'SHPL-"+shplissue.number+"'*",
      recipientPhone: recipientPhone
    })
    ShplSession.set(recipientPhone, {
      sessionInfo: [],
    });

    
    






   

  }
  if(button_id === 'yes' && numberOfIssuesInCart === 3){

    
    var axios = require('axios');

    var config = {
      method: 'get',
    maxBodyLength: Infinity,
      url: 'https://apis.fretron.com/shipment-view/shipments/v1?filters={"_consignment_":{"contractToParty":["SIEMENS HEALTHCARE PRIVATE LIMITED"]},"__version":2}',
      headers: { 
        'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w'
      }
    };
    
    axios(config)
    .then(function (response) {
      //console.log(response.data);
      var alluuid = []
      var match_uuid=[]
      for (let i = 0; i < response.data.length; i++) {
        var abc={
          uuid:response.data[i].uuid,
          shipmentnumber:response.data[i].shipmentNumber
        }
        alluuid.push(abc )
        }
        alluuid.map((e)=>{
          if(e.shipmentnumber==shplissue.number){
            match_uuid.push(e.uuid)
          }

        })
        console.log(match_uuid);

var data = JSON.stringify({
  "issueType": shplissue.cons,
  "resourceId": match_uuid[0],
  "assignee": {
    "address": null,
    "profileThumbnailString": null,
    "mobileNumber": "9958037755",
    "authToken": null,
    "updates": null,
    "uuid": "c3ec1027-c009-40d7-ae1f-639857dfd03e",
    "mergedUserIds": null,
    "isGod": null,
    "profileDocumentId": null,
    "otpEnabled": null,
    "onBoardingType": null,
    "alternateEmails": null,
    "name": "supriya phapale",
    "tokens": null,
    "alternateMobileNumbers": null,
    "email": "head.kam@agarwalpackers.com"
  },
  "priority": "LOW",
  "resourceType": "ShipmentObject",
  "resourceIdentifier": "LC000003835",
  "tags": [],
  "issueSummery": shplissue.cons,
  "issueDescription": "this is by WhatsappBot",
  "descriptionHTML": "<div>this is by WhatsappBot</div>",
  "showIn": [
    "shipment",
    "fleet"
  ],
  "reporter": null,
  "userFollowers": [
    {
      "address": null,
      "profileThumbnailString": null,
      "mobileNumber": "8291849565",
      "authToken": null,
      "updates": null,
      "uuid": "777d9c20-125f-48ae-81fc-53eb6ec726fe",
      "mergedUserIds": null,
      "isGod": null,
      "profileDocumentId": null,
      "otpEnabled": null,
      "onBoardingType": null,
      "alternateEmails": null,
      "name": "Priyaesh Patel",
      "tokens": null,
      "alternateMobileNumbers": null,
      "email": "data.science@agarwalpackers.com"
    },
    {
      "address": null,
      "profileThumbnailString": null,
      "mobileNumber": "9958037755",
      "authToken": null,
      "updates": null,
      "uuid": "c3ec1027-c009-40d7-ae1f-639857dfd03e",
      "mergedUserIds": null,
      "isGod": null,
      "profileDocumentId": null,
      "otpEnabled": null,
      "onBoardingType": null,
      "alternateEmails": null,
      "name": "supriya phapale",
      "tokens": null,
      "alternateMobileNumbers": null,
      "email": "head.kam@agarwalpackers.com"
    }
  ],
  "issueTypeId": "3945b52f-418b-488d-a328-94b064352ca1",
  "customFields": [
    {
      "indexedValue": [
        "Remarks :"
      ],
      "fieldKey": "Remarks : ",
      "multiple": false,
      "description": "reason asking for otp ",
      "remark": null,
      "uuid": "2325e17d-f977-42cf-9aa3-25a715c65144",
      "required": false,
      "accessType": null,
      "input": null,
      "unit": null,
      "valueType": "string",
      "options": [],
      "fieldType": "text",
      "value": shplissue.cart_data,
      "isRemark": false
    },
    {
      "indexedValue": [
        "Kam Remarks_null"
      ],
      "fieldKey": "Kam Remarks",
      "multiple": false,
      "description": "",
      "remark": null,
      "uuid": "9e538403-dd34-4ed6-ab86-67347b065356",
      "required": false,
      "accessType": null,
      "input": null,
      "unit": null,
      "valueType": "string",
      "options": [],
      "fieldType": "text",
      "value": null,
      "isRemark": false
    }
  ],
  "attachments": []
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://apis.fretron.com/issue/v1/issue',
  headers: { 
    'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  if(response.data.status==200){
    Whatsapp.sendText({
      message: `*THANK YOU*\n Your TICKET IS GENRATED`,
      recipientPhone: recipientPhone
  
    });
  }
  
})
.catch(function (error) {
  Whatsapp.sendText({
    message: `there is something wrong Please Contact to APML Tech deparment`,
    recipientPhone: recipientPhone

  });
});







    
    
    
    
    
    })
    .catch(function (error) {
      console.log(error);
    });
        ShplSession.set(recipientPhone, {
      sessionInfo: [],
    });

  }
 
  
}}
          
        //   else if(Empl &&!TF){
        //     if(typeOfMsg === "text_message" && Empl)
        //     { 
              
        //       let numberOfIssuesInCart = emplyLostPackage({
        //         recipientPhone,
        //       }).count;
              
        //       console.log(numberOfIssuesInCart,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ start wala hai yeh ")
        //       if(incomingMessage.text.body.toUpperCase()=="START" ){
        //         ShplSession.get(recipientPhone).sessionInfo = [];
        //         data =recipientPhone
        //         let value = "number";
        //         await addToSHPLBotCart({ data, value, recipientPhone });
        //        console.log(recipientPhone,"aa")

        //         await Whatsapp.sendImage({
        //           recipientPhone: recipientPhone,
        //           url: "https://i.ibb.co/7GbMmrk/1.jpg",           
        //         });
        //               // await Whatsapp.sendText({
        //               //   recipientPhone:recipientPhone,
        //               //   message:`Welcome to SHPL-APML ORDERS `
        //               // })
        //               let listOfSections=[{title: `CONSIGNOR`,
        //           headers: `hello`,
        //           rows: [
        //             {
        //               id: "consignor1",
        //               title: "NAVA SHEVA",
        //               description: "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD:Navi Mumbai",
        //             },
        //             {
        //               id: "consignor2",
        //               title: "APML BHIWANDI",
        //               description: "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD:Bhiwandi",
        //             },
        //             {
        //               id: "consignor3",
        //               title: "MUMBAI AIRPORT",
        //               description: "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD:Mumbai",
        //             },{
        //               id: "consignor4",
        //               title: "APML CHOWK",
        //               description: "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD:Navi Mumbai",
        //             },{
        //               id: "consignor5",
        //               title: "PRESS METAL",
        //               description: "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.:Bhiwandi",
        //             },{
        //               id: "consignor6",
        //               title: "RAJLAXMI LOGISTICS",
        //               description: "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD:Bhiwandi",
        //             }]}]
        //               Whatsapp.sendRadioButtons({
        //                 recipientPhone: recipientPhone,
        //                 headerText: `👋 Hey  `+recipientName ,
        //                 bodyText: `\n\n🙏 Welcome to APML - SHPL Orders \n\n👇🏼 *Please select Consignor from below*`,
        //                 footerText: `\nAgarwal Packers & Movers Ltd ®`,
        //                 listOfSections,
        //                 headers: `hello`,
        //               })


                      
        //         }
        //       // if(incomingMessage.text.body && numberOfIssuesInCart===2){
        //       //   let numberOfIssuesInCart = emplyLostPackage({
        //       //     recipientPhone,
        //       //   }).count;
        //       //   data =incomingMessage.text.body
        //       //   let value = "desc";
        //       //   await addToSHPLBotCart({ data, value, recipientPhone });
                
        //       //   console.log(numberOfIssuesInCart,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ date wale ka hai  ")
        //       //   await Whatsapp.sendText({
        //       //     recipientPhone:recipientPhone,
        //       //     message:`please enter the Date In the Format of (DD-MM-YY) `
        //       //   })
                
        //       // }
        //       if(incomingMessage.text.body){

        //         let numberOfIssuesInCart = emplyLostPackage({
        //           recipientPhone,
        //         }).count;
        //         if( numberOfIssuesInCart ===3){
        //           data =incomingMessage.text.body
        //           let value = "date";
        //           await addToSHPLBotCart({ data, value, recipientPhone });
        //           let numberOfIssuesInCart = emplyLostPackage({
        //             recipientPhone,
        //           }).count;
        //           console.log(data,value,numberOfIssuesInCart,"-------------------")
               
        //           let listOfSections=[{title: `Vehicle Type`,
        //           headers: `hello`,
        //           rows: [
        //             {
        //               id: "1",
        //               title: "14FT",
        //               description: "ACE/AUTO/PICKUP/",
        //             },
        //             {
        //               id: "2",
        //               title: "17FT",
        //               description: "7 MT",
        //             },
        //             {
        //               id: "3",
        //               title: "19FT ",
        //               description: "7MT",
        //             },{
        //               id: "4",
        //               title: "20FT OPEN ",
        //               description: "9 MT",
        //             },{
        //               id: "5",
        //               title: "20FT AIR SUSPENSION",
        //               description: "AIR SUSPENSION",
        //             },{
        //               id: "6",
        //               title: "20FT TRAILER",
        //               description: "20-22MT",
        //             },
        //             {
        //               id: "7",
        //               title: "22FT ",
        //               description: "16 MT",
        //             },
        //             {
        //               id: "8",
        //               title: "40FT HB TRAILER",
        //               description: "MT",
        //             }
        //         ,
        //         {
        //           id: "9",
        //           title: "40FT SB TRAILER",
        //           description: "MT",
        //         }]}]
        //             Whatsapp.sendRadioButtons({
        //               recipientPhone: recipientPhone,
        //               headerText: `Hey`,
        //               bodyText: `\n\n🚛 Please select -Vehicle Type\n`,
        //               footerText: `Agarwal Packers & Movers Ltd ®`,
        //               listOfSections,
        //               headers: `hello`,
        //             })
        //         }
        //         else if(numberOfIssuesInCart ===2){
        //           data =incomingMessage.text.body
        //           let value = "dest";
        //           await addToSHPLBotCart({ data, value, recipientPhone });
        //           let numberOfIssuesInCart = emplyLostPackage({
        //             recipientPhone,
        //           }).count;
        //           console.log(data,value,numberOfIssuesInCart,"-------------------")
        //             await Whatsapp.sendText({
        //               recipientPhone:recipientPhone,
        //               message:`🕰️ Please enter the Pick-up Date In the Format of (DD-MM-YYYY) `
        //             })
        //         }
        //       }
        //   }
        //     if(typeOfMsg === "simple_button_message"){
        //       let button_id = incomingMessage.button_reply.id;
              
        //     if (button_id === "Yes_t" ) {
             
               
                
        //         var noob = ShplSession.get(recipientPhone).sessionInfo.reduce(
        //           //  noob =new noob(),
        //           function (acc, x) {
        //             for (var key in x) acc[key] = x[key];
        //             console.log(x,"%%%%%%%%%%%%%%%%")
        //             return acc;
        //           },
        //           {}      
        //         );
             
        //         // console.log(noob, recipientPhone,noob.cons.split(":")[0],"$$$$$$",noob.cons.split(":")[1],"=============================================================");
        //         postApi4(noob, recipientPhone,Name[indexof1],Apmcode[indexof1],Branch_Name[indexof1]);
        //         var config = {
        //           method: 'post',
        //           url: '
          
          
        //             'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NjI0NTA4MjYsInVzZXJJZCI6ImI0M2RhM2M0LTEyY2ItNGQ1My1iZjJkLWVkNjRhMjYwMDlkOCIsImVtYWlsIjoiYXBtbGludGVyQGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyODYwNzU4ODAiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQdW5pdCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.u0bxTwD-id2pLwW72D-wLkXQkm-ZSzY0DSJY8FaVBaE', 
        //             'Content-Type': 'application/json'
        //           },
        //           data : datamissing
        //         };
                
        //         axios(config)
        //         .then(function (response) {
        //           console.log(JSON.stringify(response.data));
        //           if(response.data.data.successCount==1){
        //              Whatsapp.sendText({
        //               recipientPhone:recipientPhone,
        //               message:"Your Order Has been Created Successfully !! 😀✔✔ \n" + 
                       
        //                   "\n🗺️ Origin :"+ noob.cons.split(":")[1]+  
        //                   "\n📍Destination :"+ noob.dest+                   
        //                   // "\n⛯Consignor :"+ noob.cons.split(":")[0]+                        
        //                   "\n🕰️Pickup Date :"+ noob.date +   
        //                   "\n🚛 Vehicle-type :"+ noob.vehicletype+
        //                   "\n📦 Order By :"+ recipientName
                        
        //             })
        //             Whatsapp.sendText({
        //               recipientPhone: 919860014001,
        //               message:" *SHPL-ORDER-RECIEVED* \n\nDear Traffic team please provide vehicle number \n" + 
                   
        //               "\n🗺️ Origin :"+ noob.cons.split(":")[1]+                     
        //               "\n⛯Consignor :"+ noob.cons.split(":")[0]+                        
        //               "\n🕰️Pickup Date :"+ noob.date +   
        //               "\n📍Destination :"+ noob.dest+
        //               "\n🚛 Vehicle-type :"+ noob.vehicletype+
        //               "\n📦 Order By :"+ recipientName
                        
        //             })
        //           }
        //           else if(response.data.data.failureCount==1){
        //              Whatsapp.sendText({
        //               recipientPhone:'919860014001',
        //               message:`Your Order Has not been Created "Please Retype 'Start' 😐 " !! `
        //             })
        //           }
        //         })
        //         .catch(function (error) {
        //           console.log(error);
        //         });
                 
                
        //       }
        //       else if(button_id=='No_t'){
        //         await Whatsapp.sendText({
        //           message: `${recipientName}, \n\n"Please Try Again "Start"`,
        //           recipientPhone: recipientPhone,
        //         });
        //       }
             
              


        //     }
        //   //   if(typeOfMsg === "media_message"){
        //   //     let numberOfIssuesInCart = emplyLostPackage({
        //   //       recipientPhone,
        //   //     }).count;
        //   //     if(typeOfMsg === "media_message" && numberOfIssuesInCart ===0 ){
        //   //     let dataP = incomingMessage.image.id;
              
        //   //     const url = "https://graph.facebook.com/v14.0/" + dataP;
        //   //     const options = {
        //   //       headers: {
        //   //         Authorization:
        //   //           "Bearer xxxxxxxxxxxxxxxxxxx",
        //   //       },
        //   //     };
        //   //     https.get(url, options, (response) => {
                
        //   //       let finalData = "";
        //   //       response.on("data", function (data) {
        //   //         finalData += data.toString();
        //   //       });
        //   //       response.on("end", function () {
        //   //         const parsedData = JSON.parse(finalData);
        //   //         console.log(parsedData);
        //   //         const imageDataURI = require("image-data-uri");
        //   //         const fetchImage = async (
        //   //           file_name,
        //   //           recipientPhone,
        //   //           callback
        //   //         ) => {
        //   //           var data = "";
  
        //   //           const url = parsedData.url;
  
        //   //           var config = {
        //   //             method: "get",
        //   //             url: url,
        //   //             headers: {
        //   //               Authorization:
        //   //                 "Bearer xxxxxxxxxxxxxxxxxxx",
        //   //             },
        //   //             data: data,
        //   //           };
        //   //           axios({
        //   //             ...config,
        //   //             responseType: "arraybuffer",
        //   //           })
        //   //             .then(async (response) => {
        //   //               const data = response.data;
        //   //               const datauri =
        //   //                 "data:image/jpeg;base64," + data.toString("base64");
        //   //               fs.writeFileSync(file_name + ".txt", datauri);
        //   //               await imageDataURI.outputFile(
        //   //                 datauri,
        //   //                 file_name + ".jpeg"
        //   //               );
        //   //               callback("success", undefined);
        //   //             })
        //   //             .catch(function (error) {
        //   //               console.log(error);
        //   //               callback(undefined, error);
        //   //             });
        //   //         };
        //   //         const uploadImage = require("./uploadToDrive");
        //   //         const imageFileName = "new_image";
        //   //         fetchImage(imageFileName, recipientPhone, (res, error) => {
        //   //           if (error) {
        //   //             console.log("error while fetching image");
        //   //           } else {
        //   //             console.log(res);
        //   //             uploadImage(imageFileName, (res, error) => {
        //   //               if (error) {
        //   //                 console.log("error while uploading image");
        //   //               } else {
        //   //                 console.log("https://drive.google.com/file/d/" + res);
        //   //                 let data = "https://drive.google.com/file/d/" + res;
                       
                           
             
        //   //     let value = "imageLink";
        //   //      addToSHPLBotCart({ data, value, recipientPhone });
        //   //     let numberOfIssuesInCart = emplyLostPackage({
        //   //       recipientPhone,
        //   //     }).count;
        //   //     console.log(data,value,numberOfIssuesInCart)
                          
        //   //               }
        //   //             });
        //   //           }
        //   //         });
        //   //       });
        //   //     });



        //   //     await Whatsapp.sendText({
        //   //       recipientPhone:recipientPhone,
        //   //       message:`Your Image has been succesfully uploaded ✅ \n आपकी ईमेज सफलतापूर्वक अपलोड हो गई है ✅`
        //   //     })
        //   //     let listOfSections=[{title: `aaa`,
        //   // headers: `hello`,
        //   // rows: [
        //   //   {
        //   //     id: "carton_box",
        //   //     title: "Carton Box📦 ",
        //   //     description: "d",
        //   //   },
        //   //   {
        //   //     id: "CorrugatedRoll_Strechfilm",
        //   //     title: "Corrugated_Strechfilm🧱",
        //   //     description: "dd",
        //   //   },
        //   //   {
        //   //     id: "OnlyStrechfilm",
        //   //     title: "Only Strech Film🧻",
        //   //     description: "ddd",
        //   //   },{
        //   //     id: "NoPacking",
        //   //     title: "No packing ❌",
        //   //     description: "dddd",
        //   //   }]}]
        //   //     Whatsapp.sendRadioButtons({
        //   //       recipientPhone: recipientPhone,
        //   //       headerText: `Hey`+recipientName,
        //   //       bodyText: `\n\n Please select Type of Packing :- \n कृपया पैकिंग का प्रकार चुनें:-`,
        //   //       footerText: `Agarwal Packers & Movers Ltd ®`,
        //   //       listOfSections,
        //   //       headers: `hello`,
        //   //     })
              
        //   //   }
        //   // }
        //     if(typeOfMsg === "radio_button_message") {
            
        //       let numberOfIssuesInCart = emplyLostPackage({
        //         recipientPhone,
        //       }).count;
        //       console.log(numberOfIssuesInCart,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ radio wala ")
        //       if(typeOfMsg === "radio_button_message" && numberOfIssuesInCart ===1 ) {
               
        //       let selectionId = incomingMessage.list_reply.id; // the Driver clicked and submitted a radio button
        //       let data = incomingMessage.list_reply.description;
        //       let numb=0;
              
        //       data =incomingMessage.list_reply.description
        //         let value = "cons";
        //         await addToSHPLBotCart({ data, value, recipientPhone });
        //         let numberOfIssuesInCart = emplyLostPackage({
        //           recipientPhone,
        //         }).count;
        //         console.log(data,value,numberOfIssuesInCart,"-------------------")
        //       if(selectionId=="consignor1"){
        //         numb =1;
        //       }else if(selectionId=="consignor2"){numb =2;}
        //       else if(selectionId=="consignor3"){numb =3;}
        //       else if(selectionId=="consignor4"){ numb =4;}
        //       else if(selectionId=="consignor5"){numb =5;}
        //       else if(selectionId=="consignor6"){ numb =6;}
        //       switch (numb) {
        //         case 1:
        //           await Whatsapp.sendImage({
        //             recipientPhone: recipientPhone,
        //             url: "https://i.ibb.co/j6VnHGY/1.jpg",           
        //           });
                 
        //           await Whatsapp.sendText({
        //             message: `Thank you,\n✅We have registered consignor!!\n\n📍Please type the Destination `,
        //             recipientPhone: recipientPhone,
        //             headers: `aaa`,
        //           });

        //           break;
        //           case 2:
                  
        //             await Whatsapp.sendImage({
        //               recipientPhone: recipientPhone,
        //               url: "https://i.ibb.co/JBwsrkc/3.png",           
        //             });
        //             await Whatsapp.sendText({
        //               message: `Thank you,\n✅We have registered consignor!! \n\n📍Please type the Destination`,
        //               recipientPhone: recipientPhone,
        //               headers: `aaa`,
        //             });
  
        //             break;
        //             case 3:
        //               await Whatsapp.sendImage({
        //                 recipientPhone: recipientPhone,
        //                 url: "https://i.ibb.co/r5JC5fH/55.png",           
        //               });
        //               await Whatsapp.sendText({
        //                 message: `Thank you,\n✅We have registered consignor!!\n\n📍Please type the Destination `,
        //                 recipientPhone: recipientPhone,
        //                 headers: `aaa`,
        //               });
  
        //             break;
        //             case 4:
        //               await Whatsapp.sendImage({
        //                 recipientPhone: recipientPhone,
        //                 url: "https://i.ibb.co/NKqQNkh/2.png",           
        //               });
        //               await Whatsapp.sendText({
        //                 message: `Thank you,\n✅We have registered consignor!!\n\n📍Please type the Destination `,
        //                 recipientPhone: recipientPhone,
        //                 headers: `aaa`,
        //               });
  
        //             break;
        //             case 5:
        //               await Whatsapp.sendText({
        //                 message: `Thank you,\n✅We have registered consignor!!\n\n📍Please type the Destination `,
        //                 recipientPhone: recipientPhone,
        //                 headers: `aaa`,
        //               });
  
        //             break;
        //             case 6:
        //               await Whatsapp.sendText({
        //                 message: `Thank you,\n✅We have registered consignor!!\n\n📍Please type the Destination `,
        //                 recipientPhone: recipientPhone,
        //                 headers: `aaa`,
        //               });
  
        //             break;
                   
        //         }
        //     }
        //     else if(typeOfMsg === "radio_button_message" && numberOfIssuesInCart ===4){
        //       let selectionId = incomingMessage.list_reply.id; // the Driver clicked and submitted a radio button
        //       let data = incomingMessage.list_reply.title;
        //       let numb=0;
              
        //       data =incomingMessage.list_reply.title
        //         let value = "vehicletype";
        //         await addToSHPLBotCart({ data, value, recipientPhone });
        //         let numberOfIssuesInCart = emplyLostPackage({
        //           recipientPhone,
        //         }).count;
        //         console.log(data,value,numberOfIssuesInCart,"-------------------")
        //       if(selectionId=="1"){
        //         numb =7;
        //       }
              
        //       else if(selectionId=="2"){numb =8;}
        //       else if(selectionId=="3"){ numb =9;}
        //       else if(selectionId=="4"){ numb =10;}
        //       else if(selectionId=="5"){numb =11;}
        //       else if(selectionId=="6"){ numb =12;}
        //       switch (numb) {
                
        //             case 7:
        //               await Whatsapp.sendSimpleButtons({
        //                 message: ` \n\n📦 *Do you Want to confirm the Order?*`,
        //                 recipientPhone: recipientPhone,
                      
        //                   listOfButtons: [
        //                     {
        //                         title: 'Yes  ',
        //                         id: `Yes_t`,
        //                     },
        //                     {
        //                         title: 'No  ',
        //                         id: 'No_t',
        //                     },
                            
        //                 ],
                    
        //               });
  
        //             break;
        //             case 8:
        //               await Whatsapp.sendSimpleButtons({
        //                 message: ` \n\n📦 *Do you Want to confirm the Order?*`,
        //                 recipientPhone: recipientPhone,
                      
        //                   listOfButtons: [
        //                     {
        //                         title: 'Yes  ',
        //                         id: `Yes_t`,
        //                     },
        //                     {
        //                         title: 'No  ',
        //                         id: 'No_t',
        //                     },
                            
        //                 ],
                    
        //               });
  
        //             break;
        //             case 9:
        //               await Whatsapp.sendSimpleButtons({
        //                 message: ` \n\n📦 *Do you Want to confirm the Order?*`,
        //                 recipientPhone: recipientPhone,
                      
        //                   listOfButtons: [
        //                     {
        //                         title: 'Yes  ',
        //                         id: `Yes_t`,
        //                     },
        //                     {
        //                         title: 'No  ',
        //                         id: 'No_t',
        //                     },
                            
        //                 ],
                    
        //               });
  
        //             break;
        //             case 10:
        //               await Whatsapp.sendSimpleButtons({
        //                 message: ` \n\n📦 *Do you Want to confirm the Order?*`,
        //                 recipientPhone: recipientPhone,
                      
        //                   listOfButtons: [
        //                     {
        //                         title: 'Yes  ',
        //                         id: `Yes_t`,
        //                     },
        //                     {
        //                         title: 'No ',
        //                         id: 'No_t',
        //                     },
                            
        //                 ],
                    
        //               });
  
        //             break;
        //             case 11:
        //               await Whatsapp.sendSimpleButtons({
        //                 message: ` \n\n📦 *Do you Want to confirm the Order?*`,
        //                 recipientPhone: recipientPhone,
                      
        //                   listOfButtons: [
        //                     {
        //                         title: 'Yes   ',
        //                         id: `Yes_t`,
        //                     },
        //                     {
        //                         title: 'No  ',
        //                         id: 'No_t',
        //                     },
                            
        //                 ],
                    
        //               });
  
        //             break;
        //             case 12:
        //               await Whatsapp.sendSimpleButtons({
        //                 message: ` \n\n📦 *Do you Want to confirm the Order?*`,
        //                 recipientPhone: recipientPhone,
                      
        //                   listOfButtons: [
        //                     {
        //                         title: 'Yes  ',
        //                         id: `Yes_t`,
        //                     },
        //                     {
        //                         title: 'No  ',
        //                         id: 'No_t',
        //                     },
                            
        //                 ],
                    
        //               });
  
        //             break;
        //         }
        //     }
        //   }
        //     if (typeOfMsg === "location_message") {
        //       let numberOfIssuesInCart = emplyLostPackage({
        //         recipientPhone,
        //       }).count;
              
        //       if (typeOfMsg === "location_message" && numberOfIssuesInCart===2) {
                
                
        //       await Whatsapp.sendText({
        //         recipientPhone: recipientPhone,
        //         message: `Your Location has been registered with us !! \n\n आपकी लोकेशन हमें मिल चुकी है !!✅✅✅`,
        //       });

        //       await Whatsapp.sendText({
        //         recipientPhone: recipientPhone,
        //         message: `Please Type description & place of goods ⌨️ \n\n Eg:- "1 Golden Shoe 👞 Stand,looks expensive -Godown 3 left back side" \n\nकृपया विवरण टाइप करें और सामान का स्थान ️ \n जैसे: - "1 गोल्डन शू 👞 स्टैंड, महंगा लग रहा है -गोडाउन 3 लेफ्ट बैक साइड"`,
        //       });
            

        //       let lat = incomingMessage.location.latitude
        //       let long = incomingMessage.location.longitude

        //       let data = "https://www.google.com/maps/place/"+lat+","+long
        //       let value = "Location";
        //       await addToSHPLBotCart({ data, value, recipientPhone });
              

            
        //   }
        // }
        // }

          
          else {
            await Whatsapp.sendText({
              message: `You are not registered as Driver. Please contact Control Room on 9077773333.\n\nआपका नंबर हमारे सिस्टम में रजिस्टर्ड नहीं है।  कृपया ९०७७७७३३३३ पैर कॉल करे और नंबर अपडेट करवाए।   
               `,
              recipientPhone: recipientPhone,
              headers: `Soury `,
            });
          }
        
        } catch (error) {
          console.error({ error });
          return res.sendStatus(500);
        }
      }

      console.log("POST: Someone is pinging me!");
      return res.sendStatus(200);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});
// function api(){
//   const url = "https://apis.fretron.com/shipment-view/drivers/drivers?size=1500";
// const options = {
//   headers: {
//     Authorization:
//       "Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NDkyNDgyODksInVzZXJJZCI6ImNlZWMxMzkwLWUyZjUtNDZkMC1iOTBlLWNiN2NkNDEwNzU3MiIsImVtYWlsIjoiaW50ZWdyYXRpb25AYXBtbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI5MDAwMDAwMDA0Iiwib3JnSWQiOiI0MDUyYWIyNC0wNTQzLTRjZDQtYjUxNy05ZTc4ZWZlZTRmZWQiLCJuYW1lIjoiQVBNTCBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.WV8p9lLMRft2DfrzikLpp_zSJIwrBEp0U2Oy4IWkp6w",
//   },
// };
// var driverMobileNos = [];
// https.get(url, options, (response) => {
//   // var result = response.text();
//   let finalData = "";
//   response.on("data", function (data) {
//     finalData += data.toString();
//   });
//   response.on("end", function () {
//     const parsedData = JSON.parse(finalData);
//     driverMobileNos = parsedData.data.map((x) => x.mobileNumber);
//     console.log(driverMobileNos)
//     // console.log("hello")
//   });
//   //
//   return response;

// })}
var dataP;
function postApi(customer, recipientPhone, vehiclenumber) {
  dataP = JSON.stringify({
    issueType: "Driver Issue",
    resourceId: null,
    assignee: {
      address: null,
      profileThumbnailString: null,
      mobileNumber: "9077773333",
      authToken: null,
      updates: null,
      uuid: "92efa410-671a-482a-8324-030bfbd79e19",
      mergedUserIds: null,
      isGod: null,
      profileDocumentId: null,
      otpEnabled: null,
      onBoardingType: null,
      alternateEmails: null,
      name: "ControlRoom Calldesk",
      tokens: null,
      alternateMobileNumbers: null,
      email: "apm",
    },
    priority: "LOW",
    resourceType: "Control Room- Call Desk",
    resourceIdentifier: null,
    tags: [],
    issueSummery: "Driver Issue",
    issueDescription: "Case yet not Attended",
    descriptionHTML: "<div>Case yet not Attended</div>",
    reporter: null,
    userFollowers: [
      {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "8291849565",
        "authToken": null,
        "updates": null,
        "uuid": "777d9c20-125f-48ae-81fc-53eb6ec726fe",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "Priyaesh Patel",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "data.science@agarwalpackers.com"
    },
    {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "7428132074",
        "authToken": null,
        "updates": null,
        "uuid": "8e90e073-cb8b-489a-b1aa-493197aba392",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "Gayatri Jha",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "gayatri.jha@agarwalpackers.com"
    },
    {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9967931686",
        "authToken": null,
        "updates": null,
        "uuid": "9054a397-d2af-401c-a431-884dd90b6f05",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "Sachin Shelke",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "apm3052"
    },
    {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9077773333",
        "authToken": null,
        "updates": null,
        "uuid": "92efa410-671a-482a-8324-030bfbd79e19",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "ControlRoom Calldesk",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "apm"
    },
    {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "8286075880",
        "authToken": null,
        "updates": null,
        "uuid": "b43da3c4-12cb-4d53-bf2d-ed64a26009d8",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "Punit",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "apmlinter@gmail.com"
    }
    ],
    issueTypeId: "43aaa07a-226a-49f1-b859-243104119aff",
    dueAt: Number(Date.now()),
    customFields: [
      {

      "indexedValue": [
        "Driver Mobile Number"
    ],
    "fieldKey": "Driver Mobile Number",
    "multiple": false,
    "description": "",
    "remark": null,
    "uuid": "157a081d-94e2-4fd2-86fb-3ce3e8339f57",
    "required": false,
    "accessType": null,
    "input": null,
    "unit": null,
    "valueType": "string",
    "options": [],
    "fieldType": "text",
    "value": recipientPhone,
    "isRemark": false
},
{
    "indexedValue": [
        "Vehicle Number"
    ],
    "fieldKey": "Vehicle Number",
    "multiple": false,
    "description": "",
    "remark": null,
    "uuid": "eb04baba-d224-4190-9e2b-b827a6a05c02",
    "required": false,
    "accessType": null,
    "input": null,
    "unit": null,
    "valueType": "string",
    "options": [],
    "fieldType": "text",
    "value": vehiclenumber,
    "isRemark": false
},
{
    "indexedValue": [
        "Issue Type"
    ],
    "fieldKey": "Issue Type",
    "multiple": false,
    "description": "",
    "remark": null,
    "uuid": "223911da-ffa3-4d83-9ff6-64c211192bb9",
    "required": false,
    "accessType": null,
    "input": null,
    "unit": null,
    "valueType": "string",
    "options": [],
    "fieldType": "text",
    "value": customer.issue,
    "isRemark": false
},
{
    "indexedValue": [
        "Problem Is"
    ],
    "fieldKey": "Problem Is",
    "multiple": false,
    "description": "",
    "remark": null,
    "uuid": "d52a611b-766c-4e59-81fc-7360b097c159",
    "required": false,
    "accessType": null,
    "input": null,
    "unit": null,
    "valueType": "string",
    "options": [],
    "fieldType": "text",
    "value": customer.problem,
    "isRemark": false
},

{
    "indexedValue": [
        "Vehicle Status Bot"
    ],
    "fieldKey": "Vehicle Status Bot",
    "multiple": false,
    "description": "",
    "remark": null,
    "uuid": "b236a629-974f-43cc-9b40-07bda644eafd",
    "required": false,
    "accessType": null,
    "input": null,
    "unit": null,
    "valueType": "string",
    "options": [],
    "fieldType": "text",
    "value": customer.vehicle_status,
    "isRemark": false
},

{
    "indexedValue": [
        "Location_Bot"
    ],
    "fieldKey": "Location_Bot",
    "multiple": false,
    "description": "",
    "remark": null,
    "uuid": "0913e9cd-4717-4e73-8701-6b943ede668e",
    "required": false,
    "accessType": null,
    "input": null,
    "unit": null,
    "valueType": "string",
    "options": [],
    "fieldType": "url",
    "value": customer.location,
    "isRemark": false
},
{
  "indexedValue": [
      "Location_test1323"
  ],
  "fieldKey": "Location",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "8e1156c4-eccd-46e8-b233-e0c149b04377",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "string",
  "options": [],
  "fieldType": "address",
  "value": "test1323",
  "isRemark": false
},
{
  "indexedValue": [],
  "fieldKey": "Problem Proof 1",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "3290b19c-d525-4b38-b98b-1a7793ba48f6",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "arrayOfJson",
  "options": [],
  "fieldType": "file",
  "value": null,
  "isRemark": false
},
{
  "indexedValue": [
      "Current Status_UNATTENDED"
  ],
  "fieldKey": "Current Status",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "cb28f12a-2c95-499c-9598-6aad74bab467",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "string",
  "options": [
      "UNATTENDED",
      "WIP",
      "ONWAY DOCUMENTATION PENDING",
      "ALL DONE"
  ],
  "fieldType": "select",
  "value": "UNATTENDED",
  "isRemark": false
},
{
  "indexedValue": [
      "Work Place_null"
  ],
  "fieldKey": "Work Place",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "a8d9b278-7c68-48a9-8f8a-2fbaffa10f14",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "string",
  "options": [
      "Apml Workshop- KWS",
      "Apml Workshop- CWK",
      "Workshop-(AL,TATA.EI)",
      "Local"
  ],
  "fieldType": "select",
  "value": null,
  "isRemark": false
},
{
  "indexedValue": [],
  "fieldKey": "Estimate",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "2df582c3-0ef0-4f91-8980-bd35fa652257",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "arrayOfJson",
  "options": [],
  "fieldType": "file",
  "value": null,
  "isRemark": false
},
{
  "indexedValue": [
      "Amount Paid By_null"
  ],
  "fieldKey": "Amount Paid By",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "825db51b-9d5c-49f0-b3f3-1ac05bf9d768",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "string",
  "options": [
      "Control Room Tripsheet",
      "Control  Room IMPS",
      "Driver",
      "No Payment"
  ],
  "fieldType": "select",
  "value": null,
  "isRemark": false
},
{
  "indexedValue": [
      "Parts Cost_null"
  ],
  "fieldKey": "Parts Cost",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "776f545e-db3a-4333-a508-fe015a458de0",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "string",
  "options": [],
  "fieldType": "text",
  "value": null,
  "isRemark": false
},
{
  "indexedValue": [
      "Labour Cost_null"
  ],
  "fieldKey": "Labour Cost",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "11cac5f1-3b7b-4e7e-8f27-a599b8e56e84",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "string",
  "options": [],
  "fieldType": "text",
  "value": null,
  "isRemark": false
},
{
  "indexedValue": [
      "TOTAL_null"
  ],
  "fieldKey": "TOTAL",
  "multiple": false,
  "description": "",
  "remark": null,
  "uuid": "d1781d44-cae8-4d81-bcd8-cb66fb618c57",
  "required": false,
  "accessType": null,
  "input": null,
  "unit": null,
  "valueType": "string",
  "options": [],
  "fieldType": "text",
  "value": null,
  "isRemark": false
},
{
  "indexedValue": [],
  "fieldKey": "INVOICE PIC",
  "multiple": false,
  "description": "",
  "remark": "",
  "uuid": "1ea55150-5912-426a-a781-f8d9c242d916",
  "required": false,
  "accessType": null,
  "input": "",
  "unit": "",
  "valueType": "arrayOfJson",
  "options": [],
  "fieldType": "file",
  "value": null,
  "isRemark": false
},
{
  "indexedValue": [
      "No of Times Open_2"
  ],
  "fieldKey": "No of Times Open",
  "multiple": false,
  "description": "",
  "remark": "",
  "uuid": "2e67cf0e-4ca6-4acf-9596-bd5e394c3c5f",
  "required": false,
  "accessType": null,
  "input": "",
  "unit": "",
  "valueType": "string",
  "options": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
  ],
  "fieldType": "select",
  "value": "1",
  "isRemark": false
} 
    ],
    attachments: [],
  });
}


var dataTyre;
function postApi1(customer, recipientPhone, vehiclenumber) {
  dataTyre = JSON.stringify({
      issueType: "Tyre Puncture Bot",
      resourceId: null,
      assignee: {
                  address: null,
                profileThumbnailString: null,
                  mobileNumber: "7415462045",
                  authToken: null,
                  updates: null,
                  uuid: "885fe4a9-54fc-490e-9a2d-20e13bf45064",
                  mergedUserIds: null,
                  isGod: null,
                  profileDocumentId: null,
                  otpEnabled: null,
                  onBoardingType: null,
                  alternateEmails: null,
                  name: "ABHISHEK GAUTAM",
                  tokens: null,
                  alternateMobileNumbers: null,
                  email: "yaswant.suthar@jktyremobility.com"
              },
      priority: "LOW",
      resourceType: "Admin - Mumbai Goregaon Office",
      resourceIdentifier: null,
      tags: [],
      "issueSummery": "Tyre Puncture Bot",
      "issueDescription": "Test Auto Generation Tickets",
      "descriptionHTML": "<div>Test Auto Generation Tickets</div>",
      "reporter": null,
      "userFollowers": [{
      "address": null,
      "profileThumbnailString": null,
      "mobileNumber": "7988591213",
      "authToken": null,
      "updates": null,
      "uuid": "599387c8-93db-4ae5-b5db-652ac137720f",
      "mergedUserIds": null,
      "isGod": null,
      "profileDocumentId": null,
      "otpEnabled": null,
      "onBoardingType": null,
      "alternateEmails": null,
      "name": "ASHOK",
      "tokens": null,
      "alternateMobileNumbers": null,
      "email": "apm4582" }],
      "issueTypeId": "42029f03-08f9-4e93-86d9-bd08db0077d4",
      "dueAt": Number(Date.now()),
       "customFields": [
                  {
                      "indexedValue": [
                          "Driver Mobile Number_1234567"
                      ],
                      "fieldKey": "Driver Mobile Number",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "157a081d-94e2-4fd2-86fb-3ce3e8339f57",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": recipientPhone,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Vehicle Number_null"
                      ],
                      "fieldKey": "Vehicle Number",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "eb04baba-d224-4190-9e2b-b827a6a05c02",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": vehiclenumber,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Issue Type_Dummy Punit"
                      ],
                      "fieldKey": "Issue Type",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "223911da-ffa3-4d83-9ff6-64c211192bb9",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.issue,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Problem Is_Dummy Punit"
                      ],
                      "fieldKey": "Problem Is",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "d52a611b-766c-4e59-81fc-7360b097c159",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.problem,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Proof Link_null"
                      ],
                      "fieldKey": "Proof Link",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "2e1f06d4-3c0e-4aad-8591-1baae8184763",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "url",
                      "value": customer.proof_link,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Vehicle Status Bot_null"
                      ],
                      "fieldKey": "Vehicle Status Bot",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "b236a629-974f-43cc-9b40-07bda644eafd",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.vehicle_status,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Coverage_null"
                      ],
                      "fieldKey": "Coverage",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "52bd154c-df1c-4816-b7dd-d006637d1221",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": null,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Last Inspection Date_null"
                      ],
                      "fieldKey": "Last Inspection Date",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "797b9f6c-b45f-49d7-a1bd-8326c72cebd0",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": null,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Days After Inspection_null"
                      ],
                      "fieldKey": "Days After Inspection",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "f27a641a-4d52-4ed2-94c8-f72f30fa9584",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": null,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Location_Bot_null"
                      ],
                      "fieldKey": "Location_Bot",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "0913e9cd-4717-4e73-8701-6b943ede668e",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "url",
                      "value": customer.location,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Tyre Number_null"
                      ],
                      "fieldKey": "Tyre Number",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "7935b569-f1d0-4a46-94a4-798b6cd58224",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.Tyre_number,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Shopekeeper_number_bot_null"
                      ],
                      "fieldKey": "Shopekeeper_number_bot",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "0f2723c8-a46f-4a7d-8172-134181768598",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.Shopekeeper_number,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Estimate Amount_null"
                      ],
                      "fieldKey": "Estimate Amount",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "089e6fd0-32d6-4082-b425-1abb05de6f90",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.estimate_amount,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "alignment age bot_null"
                      ],
                      "fieldKey": "alignment age bot",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "6727a45c-8856-4a45-b464-322e23c354f3",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": null,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Stepney Availibilty_null"
                      ],
                      "fieldKey": "Stepney Availibilty",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "3d034fa7-0098-4885-b7dc-d01cce2268ef",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.Stepney_availibility,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Stepney Photo_null"
                      ],
                      "fieldKey": "Stepney Photo",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "68685863-bcab-4c12-8b7e-8c6915b7a28a",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "url",
                      "value": customer.stepney_link,
                      "isRemark": false
                  }
              ],
      attachments: []
      
  });
}




var dataHisab;
function postApi2(customer, recipientPhone, vehiclenumber) {
  dataHisab = JSON.stringify({
      issueType: "Hisab Issue",
      resourceId: null,
      assignee: {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9082684034",
        "authToken": null,
        "updates": null,
        "uuid": "29940730-22c1-49cb-b2e9-bf4d85aec47b",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "PRAKASH PRATAP SINGH",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "prakash.singh@agarwalpackers.com"
    },
      priority: "LOW",
      resourceType: "Vehicle Audit",
      resourceIdentifier: null,
      tags: [],
      "issueSummery": "Hisab Issue",
      "issueDescription": "Test Auto Generation Tickets",
      "descriptionHTML": "<div>Test Auto Generation Tickets</div>",
      "reporter": null,
      "userFollowers": [{
      "address": null,
      "profileThumbnailString": null,
      "mobileNumber": "8286075880",
      "authToken": null,
      "updates": null,
      "uuid": "29940730-22c1-49cb-b2e9-bf4d85aec47b",
      "mergedUserIds": null,
      "isGod": null,
      "profileDocumentId": null,
      "otpEnabled": null,
      "onBoardingType": null,
      "alternateEmails": null,
      "name": "PRAKASH PRATAP SINGH",
      "tokens": null,
      "alternateMobileNumbers": null,
      "email": "prakash.singh@agarwalpackers.com" }],
      "issueTypeId": "c54f67c5-8a2a-4c20-9be0-2c444eae5369",
      "dueAt": Number(Date.now()),
       "customFields": [
                  {
                      "indexedValue": [
                          "Driver Mobile Number"
                      ],
                      "fieldKey": "Driver Mobile Number",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "157a081d-94e2-4fd2-86fb-3ce3e8339f57",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": recipientPhone,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Vehicle Number_null"
                      ],
                      "fieldKey": "Vehicle Number",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "eb04baba-d224-4190-9e2b-b827a6a05c02",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": vehiclenumber,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Issue Type_Dummy Punit"
                      ],
                      "fieldKey": "Issue Type",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "223911da-ffa3-4d83-9ff6-64c211192bb9",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.issue,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Problem Is_Dummy Punit"
                      ],
                      "fieldKey": "Problem Is",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "d52a611b-766c-4e59-81fc-7360b097c159",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.problem,
                      "isRemark": false
                  },
                  
                  {
                      "indexedValue": [
                          "Vehicle Status Bot_null"
                      ],
                      "fieldKey": "Vehicle Status Bot",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "b236a629-974f-43cc-9b40-07bda644eafd",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.vehicle_status,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Location_Bot_null"
                      ],
                      "fieldKey": "Location_Bot",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "0913e9cd-4717-4e73-8701-6b943ede668e",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "url",
                      "value": customer.location,
                      "isRemark": false
                  }
              ],
      attachments: []
      
  });
}


var dataGm;
function postApi3(customer, recipientPhone, vehiclenumber) {
  dataGm = JSON.stringify({
      issueType: "Gaadi Malik Issue",
      resourceId: null,
      assignee: {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9967931686",
        "authToken": null,
        "updates": null,
        "uuid": "9054a397-d2af-401c-a431-884dd90b6f05",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "Sachin Shelke",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "apm3052"
    },
      priority: "LOW",
      resourceType: "Control Room - Gaadi Malik",
      resourceIdentifier: null,
      tags: [],
      "issueSummery": "Gaadi Malik Issue",
      "issueDescription": "Test Auto Generation Tickets",
      "descriptionHTML": "<div>Test Auto Generation Tickets</div>",
      "reporter": null,
      "userFollowers": [{
      "address": null,
      "profileThumbnailString": null,
      "mobileNumber": "9967931686",
      "authToken": null,
      "updates": null,
      "uuid": "9054a397-d2af-401c-a431-884dd90b6f05",
      "mergedUserIds": null,
      "isGod": null,
      "profileDocumentId": null,
      "otpEnabled": null,
      "onBoardingType": null,
      "alternateEmails": null,
      "name":"Sachin Shelke",
      "tokens": null,
      "alternateMobileNumbers": null,
      "email": "apm3052" }],
      "issueTypeId": "dd4b2810-9075-44c1-996d-cb9b269857df",
      "dueAt": Number(Date.now()),
       "customFields": [
                  {
                      "indexedValue": [
                          "Driver Mobile Number"
                      ],
                      "fieldKey": "Driver Mobile Number",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "157a081d-94e2-4fd2-86fb-3ce3e8339f57",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": recipientPhone,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Vehicle Number_null"
                      ],
                      "fieldKey": "Vehicle Number",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "eb04baba-d224-4190-9e2b-b827a6a05c02",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": vehiclenumber,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Issue Type_Dummy Punit"
                      ],
                      "fieldKey": "Issue Type",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "223911da-ffa3-4d83-9ff6-64c211192bb9",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.issue,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Problem Is_Dummy Punit"
                      ],
                      "fieldKey": "Problem Is",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "d52a611b-766c-4e59-81fc-7360b097c159",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.problem,
                      "isRemark": false
                  },
              
                  {
                      "indexedValue": [
                          "Vehicle Status Bot_null"
                      ],
                      "fieldKey": "Vehicle Status Bot",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "b236a629-974f-43cc-9b40-07bda644eafd",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "text",
                      "value": customer.vehicle_status,
                      "isRemark": false
                  },
                  {
                      "indexedValue": [
                          "Location_Bot_null"
                      ],
                      "fieldKey": "Location_Bot",
                      "multiple": false,
                      "description": "",
                      "remark": null,
                      "uuid": "0913e9cd-4717-4e73-8701-6b943ede668e",
                      "required": false,
                      "accessType": null,
                      "input": null,
                      "unit": null,
                      "valueType": "string",
                      "options": [],
                      "fieldType": "url",
                      "value": customer.location,
                      "isRemark": false
                  },
                  {
                    "indexedValue": [
                        "Advance sub issue"
                    ],
                    "fieldKey": "Advance sub issue",
                    "multiple": false,
                    "description": "",
                    "remark": "",
                    "uuid": "984592f9-0314-46e9-b315-545628847428",
                    "required": false,
                    "accessType": null,
                    "input": null,
                    "unit": "",
                    "valueType": "string",
                    "options": [],
                    "fieldType": "text",
                    "value": customer.Advance_Reason,
                    "isRemark": false
                }
              ],
      attachments: []
      
  });
}

var datamissing;
function postApi4(noob,recipientPhone,x,y,z){
  datamissing = JSON.stringify([
    {
      "Origin": noob.cons.split(":")[1],
      "Destination": "Mumbai",
      "Vehicle Type": "ORDER MISC FIELD",
      "Transportation Service": "FTL",
      "Customer(*)": "SIEMENS HEALTHCARE PRIVATE LIMITED",
      "Consignor(*)": noob.cons.split(":")[0],
      "Consignee(*)": "Unknown",
      "Pickup Date(DD-MM-YYYY)": noob.date,
      "Booking Branch": "MUMBAI",
      "Contract Number": null,
      "Freight": null,
      "Measurement Type(*)": "weight",
      "Quantity(*)": "1",
      "Quantity UOM(*)": "Units",
      "cf_ORDER BY": recipientPhone,
      "cf_Destination": noob.dest,
      "cf_Vehicle-type": noob.vehicletype
    }
  ]
    
  )

}



var dataBattery;
function postApi5(customer, recipientPhone, vehiclenumber) {
  dataBattery = JSON.stringify({
      issueType: "Battery Issues",
      resourceId: null,
      assignee: {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9077773333",
        "authToken": null,
        "updates": null,
        "uuid": "92efa410-671a-482a-8324-030bfbd79e19",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "ControlRoom Calldesk",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "apm"
    },
      priority: "LOW",
      resourceType: "Control Room- Call Desk",
      resourceIdentifier: null,
      tags: [],
      "issueSummery": "Battery Issues",
      "issueDescription": "Case not yet attended",
      "descriptionHTML": "<div>Case not yet attended</div>",
      "reporter": null,
      "userFollowers": [{
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "7428132074",
        "authToken": null,
        "updates": null,
        "uuid": "8e90e073-cb8b-489a-b1aa-493197aba392",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "Gayatri Jha",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "gayatri.jha@agarwalpackers.com"
    },
    {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "9077773333",
        "authToken": null,
        "updates": null,
        "uuid": "92efa410-671a-482a-8324-030bfbd79e19",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "ControlRoom Calldesk",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "apm"
    },
    {
        "address": null,
        "profileThumbnailString": null,
        "mobileNumber": "8291849565",
        "authToken": null,
        "updates": null,
        "uuid": "777d9c20-125f-48ae-81fc-53eb6ec726fe",
        "mergedUserIds": null,
        "isGod": null,
        "profileDocumentId": null,
        "otpEnabled": null,
        "onBoardingType": null,
        "alternateEmails": null,
        "name": "Priyaesh Patel",
        "tokens": null,
        "alternateMobileNumbers": null,
        "email": "data.science@agarwalpackers.com"
    }],
      "issueTypeId": "70844784-1bca-4d21-bba1-7ba1c4b54794",
      "dueAt": Number(Date.now()),
       "customFields": [
        {
          "indexedValue": [
              "No of Times Open_1"
          ],
          "fieldKey": "No of Times Open",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "2e67cf0e-4ca6-4acf-9596-bd5e394c3c5f",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9"
          ],
          "fieldType": "select",
          "value": "1",
          "isRemark": false
      },
      {
          "indexedValue": [
              "Vehicle Number_TEST"
          ],
          "fieldKey": "Vehicle Number",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "eb04baba-d224-4190-9e2b-b827a6a05c02",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "text",
          "value": vehiclenumber,
          "isRemark": false
      },
      {
          "indexedValue": [
              "Vehicle Status Bot_TEST"
          ],
          "fieldKey": "Vehicle Status Bot",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "b236a629-974f-43cc-9b40-07bda644eafd",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "text",
          "value": customer.vehicle_status,
          "isRemark": false
      },
      {
          "indexedValue": [
              "Driver Mobile Number_TEST"
          ],
          "fieldKey": "Driver Mobile Number",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "157a081d-94e2-4fd2-86fb-3ce3e8339f57",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "text",
          "value": recipientPhone,
          "isRemark": false
      },
      {
          "indexedValue": [
              "Issue Type_TEST"
          ],
          "fieldKey": "Issue Type",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "223911da-ffa3-4d83-9ff6-64c211192bb9",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "text",
          "value": customer.issue ,
          "isRemark": false
      },
      {
          "indexedValue": [
              "Problem Is_TEST"
          ],
          "fieldKey": "Problem Is",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "d52a611b-766c-4e59-81fc-7360b097c159",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "text",
          "value": customer.problem,
          "isRemark": false
      },
      {
        "indexedValue": [
            "Proof Link_null"
        ],
        "fieldKey": "Proof Link",
        "multiple": false,
        "description": "",
        "remark": null,
        "uuid": "2e1f06d4-3c0e-4aad-8591-1baae8184763",
        "required": false,
        "accessType": null,
        "input": null,
        "unit": null,
        "valueType": "string",
        "options": [],
        "fieldType": "url",
        "value": customer.proof_link2,
        "isRemark": false
    },
      {
          "indexedValue": [
              "Location_Bot_TEST"
          ],
          "fieldKey": "Location_Bot",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "0913e9cd-4717-4e73-8701-6b943ede668e",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "url",
          "value":customer.location,
          "isRemark": false
      },
      {
          "indexedValue": [
              "Sub-Issue_TEST"
          ],
          "fieldKey": "Sub-Issue",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "220b9005-5d16-4e48-a4a9-52114701bb40",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "text",
          "value": customer.Battery_Subissue,
          "isRemark": false
      },
      {
        "indexedValue": [
            "Sop Link_null"
        ],
        "fieldKey": "Sop Link",
        "multiple": false,
        "description": "",
        "remark": null,
        "uuid": "5ca8c41d-e9c0-466c-ac11-022234fa12d4",
        "required": false,
        "accessType": null,
        "input": null,
        "unit": null,
        "valueType": "string",
        "options": [],
        "fieldType": "url",
        "value": "https://sites.google.com/view/batteryaa/home",
        "isRemark": false
    },
     
      {
          "indexedValue": [
              "Location_TEST"
          ],
          "fieldKey": "Location",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "8e1156c4-eccd-46e8-b233-e0c149b04377",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "address",
          "value": null,
          "isRemark": false
      },
      {
          "indexedValue": [],
          "fieldKey": "Problem Proof 1",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "3290b19c-d525-4b38-b98b-1a7793ba48f6",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "arrayOfJson",
          "options": [],
          "fieldType": "file",
          "value": null,
          "isRemark": false
      },
      {
          "indexedValue": [
              "Current Status_UNATTENDED"
          ],
          "fieldKey": "Current Status",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "cb28f12a-2c95-499c-9598-6aad74bab467",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [
              "UNATTENDED",
              "WAIT FOR APPROVAL",
              "WIP",
              "PAYMENT PENDING",
              "ONWAY DOCUMENTATION PENDING ",
              "ON WAY PAYMENT PENDING"
          ],
          "fieldType": "select",
          "value": "UNATTENDED",
          "isRemark": false
      },
      {
          "indexedValue": [],
          "fieldKey": "Estimate",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "2df582c3-0ef0-4f91-8980-bd35fa652257",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "arrayOfJson",
          "options": [],
          "fieldType": "file",
          "value": null,
          "isRemark": false
      },
      {
          "indexedValue": [
              "Amount Paid By_Control  Room IMPS"
          ],
          "fieldKey": "Amount Paid By",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "825db51b-9d5c-49f0-b3f3-1ac05bf9d768",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [
              "Control Room Tripsheet",
              "Control  Room IMPS",
              "Driver",
              "No Payment"
          ],
          "fieldType": "select",
          "value": null,
          "isRemark": false
      },
      {
          "indexedValue": [],
          "fieldKey": "INVOICE PIC",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "1ea55150-5912-426a-a781-f8d9c242d916",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "arrayOfJson",
          "options": [],
          "fieldType": "file",
          "value": null,
          "isRemark": false
      },
      {
          "indexedValue": [
              "TOTAL_TEST"
          ],
          "fieldKey": "TOTAL",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "d1781d44-cae8-4d81-bcd8-cb66fb618c57",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [],
          "fieldType": "text",
          "value": null,
          "isRemark": false
      },
      {
          "indexedValue": [
              "Added to Inventory? _Yes"
          ],
          "fieldKey": "Added to Inventory? ",
          "multiple": false,
          "description": "",
          "remark": null,
          "uuid": "72fb481b-763e-4a44-82f3-605810a170ed",
          "required": false,
          "accessType": null,
          "input": null,
          "unit": null,
          "valueType": "string",
          "options": [
              "Yes",
              "No"
          ],
          "fieldType": "yes-no",
          "value": "No",
          "isRemark": false
      }
  ],
      attachments: []
      
  });
}


module.exports = router;
