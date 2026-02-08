"use strict";
const router = require("express").Router();
const axios = require("axios");
var moment = require("moment-timezone");
const WhatsappCloudAPI = require("whatsappcloudapi_wrapper")

//----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
const Whatsapp = new WhatsappCloudAPI({
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_wabaId,
});

const ShplSession = new Map();

router.get("/meta_wa_callbackurl", (req, res) => {
  try {
    console.log("GET: Someone is pinging me!");

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (
      mode &&
      token &&
      mode === "subscribe" &&
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

router.post("/meta_wa_callbackurl", async (req, res) => {
  console.log("POST: Someone is pinging me!");
  try {
    let data = Whatsapp.parseMessage(req.body);

    if (data?.isMessage) {
      let incomingMessage = data.message;
      // console.log(incomingMessage, "+++++++++ ye bhej rah hai+++++++");
      let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
      let recipientName = incomingMessage.from.name;
      let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
      let message_id = incomingMessage.message_id; // extract the message

      if (!ShplSession.get(recipientPhone)) {
        ShplSession.set(recipientPhone, {
          sessionInfo: [],
        });
      }
      let emplyLostPackage = ({ recipientPhone }) => {
        let issues1 = ShplSession.get(recipientPhone).sessionInfo;
        let count = issues1.length;
        // console.log(count);
        return { issues1, count };
      };

      let addToSHPLBotCart = async ({ data, value, recipientPhone }) => {
        // console.log(data, value, recipientPhone, "in darir");
        if (value == "number") {
          ShplSession.get(recipientPhone).sessionInfo.push({ number: data });
        } else if (value == "cons") {
          ShplSession.get(recipientPhone).sessionInfo.push({ cons: data });
        } else if (value == "cart_data") {
          ShplSession.get(recipientPhone).sessionInfo.push({ cart_data: data });
        } else if (value == "description") {
          ShplSession.get(recipientPhone).sessionInfo.push({
            description: data,
          });
        } else if (value == "location") {
          ShplSession.get(recipientPhone).sessionInfo.push({ location: data });
        }
      };
      let numberOfIssuesInCart = emplyLostPackage({
        recipientPhone,
      }).count;

      var noob = ShplSession.get(recipientPhone).sessionInfo.reduce(function (
        acc,
        x
      ) {
        for (var key in x) acc[key] = x[key];
        return acc;
      },
      {});

      console.log(noob, "daaaa");
      console.log(typeOfMsg, "mmmmmmmm");
      console.log(numberOfIssuesInCart, "llll");

//       if (typeOfMsg === "text_message") {
//         let numberOfIssuesInCart = emplyLostPackage({
//           recipientPhone,
//         }).count;

//         if (incomingMessage.text.body.toUpperCase() === "PRO") {
//           ShplSession.set(recipientPhone, {
//             sessionInfo: [],
//           });

//           let header = "Booking Appointment";
//           let body =
//             "👋 Hi there! Thanks for reaching out to book an appointment. I'm here to help! 📅🕰️📝";
//           let button = "Select Options";
//           let listOfSections = [
//             {
//               title: `Booking Appointment`,
//               headers: `Types`,
//               rows: [
//                 {
//                   id: "1",
//                   title: "Dentist",
//                   description: "Appointment",
//                 },
//                 {
//                   id: "2",
//                   title: "Haircut",
//                   description: "/styling",
//                 },
//                 {
//                   id: "3",
//                   title: "Spa",
//                   description: "Treatment",
//                 },
//                 {
//                   id: "4",
//                   title: "Body",
//                   description: "Massage",
//                 },
//               ],
//             },
//           ];

//           await Whatsapp.sendRadioButtons({
//             recipientPhone: recipientPhone,
//             headerText: header,
//             bodyText: body,
//             buttonText: button,
//             footerText: `© 2023 AUTOWHAT`,
//             listOfSections,
//           });

//           data = recipientPhone;
//           let value = "number";
//           await addToSHPLBotCart({ data, value, recipientPhone });

//           data = incomingMessage.text.body.toUpperCase();
//           value = "cons";
//           await addToSHPLBotCart({ data, value, recipientPhone });
//         }
//       } 
//       else if (typeOfMsg === "radio_button_message" && noob.cons === "PRO") {
//         let data = incomingMessage.list_reply.id;
//         let message = "";

//         console.log(numberOfIssuesInCart, "hhhhhhhh");
//         console.log(data, "ddddddddd");

//         if (numberOfIssuesInCart === 2) {
//           let header = "Time Slots";
//           let body = "👋 Hello there! Thank you for reaching out to us! 😊 We're excited to connect with you. 🕒Please take a moment to select a time slot from the options below";
//           let buttons = "Select Options";
//           let listOfSections = [
//             {
//               title: `Time slot`,
//               headers: `Time Slot`,
//               rows: [
//                 {
//                   id: "1",
//                   title: "8-10",
//                   description: "AM",
//                 },
//                 {
//                   id: "2",
//                   title: "10-11",
//                   description: "AM",
//                 },
//                 {
//                   id: "3",
//                   title: "12-2",
//                   description: "PM",
//                 },
//                 {
//                   id: "4",
//                   title: "4-6",
//                   description: "PM",
//                 },
//                 // {
//                 //   id: "5",
//                 //   title: "Very Bad",
//                 //   description: "disappointment",
//                 // },
//               ],
//             },
//           ];
//           await Whatsapp.sendRadioButtons({
//             recipientPhone: recipientPhone,
//             headerText: header,
//             bodyText: body,
//             // buttonText: button,
//             footerText: `© 2023 AUTOWHAT`,
//             listOfSections,
//           });
//           data = recipientPhone;
//           let value = "description";
//           await addToSHPLBotCart({ data, value, recipientPhone });
//         } else if (numberOfIssuesInCart === 3) {
//           message = `👋 Dear ${recipientName}!,\n\ would you like to confirm your process?`;
//         }

//         await Whatsapp.sendSimpleButtons({
//           message: message,
//           recipientPhone: recipientPhone,
//           listOfButtons: [
//             {
//               title: "yes",
//               id: "yes",
//             },
//             {
//               title: "cancel",
//               id: "cancel",
//             },
//           ],
//         });
//         ShplSession.get(recipientPhone).sessionInfo.push({ rating: data });
//       }
//       else if (typeOfMsg === "simple_button_message" && noob.cons === "PRO") {
//         let buttonId = incomingMessage.button_reply.id;

//         if (buttonId === "yes") {
//           let message =
//             "🎉 Thank you for booking your appointment with us! We can't wait to see you! 🙌";
//           await Whatsapp.sendText({
//             message: message,
//             recipientPhone: recipientPhone,
//           });
//         } else if (buttonId === "cancel") {
//           let message =
//             "👋 No worries, we completely understand. We hope you're able to reschedule with us in the future. Thank you for letting us know and have a great day! 😊📅";
//           await Whatsapp.sendText({
//             message: message,
//             recipientPhone: recipientPhone,
//           });
//         }

//         ShplSession.get(recipientPhone).sessionInfo.push({
//           recommend: buttonId,
//         });
//         noob["recommend"] = buttonId;
//         let sheetData = [noob.number, noob.rating, noob.recommend];
//         // postToSheet("Sheet1!A:C", [sheetData])

//         var data111 = JSON.stringify({
//           name: recipientName,
//           number: noob.number,
//           tofrom: noob.cons,
//           rating: noob.rating,
//           recommend: noob.recommend,
//         });

//         var config = {
//           method: "post",
//           maxBodyLength: Infinity,
//           url: "https://script.google.com/macros/s/AKfycbwvlXE4R2_ueKeJBmZXlbnkdxkH5e1cMQv9y7zm7AJk6Y7tZMxxPW6yC32AXRdbh8ueRQ/exec?action=addUser",
//           headers: {
//             "Content-Type": "application/json",
//             Cookie:
//               "NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo",
//           },
//           data: data111,
//         };
//         var axios = require("axios");
//         axios(config)
//           .then(function (response) {
//             // console.log(JSON.stringify(response.data));
//             ShplSession.set(recipientPhone, {
//               sessionInfo: [],
//             });
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       }
      
         if (typeOfMsg === "text_message") {
        let numberOfIssuesInCart = emplyLostPackage({
          recipientPhone,
        }).count;

         if (incomingMessage.text.body.toUpperCase() === "CAR") {
          ShplSession.set(recipientPhone, {
            sessionInfo: [],
          });

          let header = "Vehical Booking ";
          let body =
            "👋 Hi there! Thanks for reaching out to vehi book an appointment. I'm here to help! 📅🕰️📝";
          let button = "Select Options";
          let listOfSections = [
            {
              title: `Booking Appointment`,
              headers: `Types`,
              rows: [
                {
                  id: "1",
                  title: "Car",
                  description: "Car",
                },
                {
                  id: "2",
                  title: "Bike",
                  description: "bike",
                },
                {
                  id: "3",
                  title: "Scooter",
                  description: "Scooter",
                },
                {
                  id: "4",
                  title: "biCycle",
                  description: "biCycle",
                },
                {
                  id: "5",
                  title: "Truck",
                  description: "Truck",
                },
              ],
            },
          ];

          await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: header,
            bodyText: body,
            buttonText: button,
            footerText: `© 2023 AUTOWHAT`,
            listOfSections,
          });

          data = recipientPhone;
          let value = "number";
          await addToSHPLBotCart({ data, value, recipientPhone });

          data = incomingMessage.text.body.toUpperCase();
          value = "cons";
          await addToSHPLBotCart({ data, value, recipientPhone });
        } } 
         else if (typeOfMsg === "radio_button_message" && noob.cons === "CAR") {
        let data = incomingMessage.list_reply.id;
        let message = "";

        console.log(numberOfIssuesInCart, "hhhhhhhh");
        console.log(data, "ddddddddd");

        if (numberOfIssuesInCart === 2) {
          let header = "For number of days";
          let body = "select any time slot from below options";
          let buttons = "Select Options";
          let listOfSections = [
            {
              title: `For Days`,
              headers: `Number of days`,
              rows: [
                {
                  id: "1",
                  title: "For 1",
                  description: 'day',
                },
                {
                  id: "2",
                  title: "For 2",
                  description: "days",
                },
                {
                  id: "3",
                  title: "For 3",
                  description: "days",
                },
                {
                  id: "4",
                  title: "For 4",
                  description: "days",
                },
                {
                  id: "5",
                  title: "For 5",
                  description: "days",
                },
                {
                  id: "6",
                  title: "For 6",
                  description: "days",
                },
                {
                  id: "7",
                  title: "For 7+",
                  description: "days",
                },
              ],
            },
          ];
          await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: header,
            bodyText: body,
            // buttonText: button,
            footerText: `© 2023 AUTOWHAT`,
            listOfSections,
          });
          data = recipientPhone;
          let value = "description";
          await addToSHPLBotCart({ data, value, recipientPhone });
        } else if (numberOfIssuesInCart === 3) {
          message = `👋 Dear ${recipientName}!,\n\ would you like to confirm your process?`;
        }

        await Whatsapp.sendSimpleButtons({
          message: message,
          recipientPhone: recipientPhone,
          listOfButtons: [
            {
              title: "yes",
              id: "yes",
            },
            {
              title: "cancel",
              id: "cancel",
            },
          ],
        });
        ShplSession.get(recipientPhone).sessionInfo.push({ rating: data });
      }  
         else if (typeOfMsg === "simple_button_message" && noob.cons === "CAR") {
        let buttonId = incomingMessage.button_reply.id;

        if (buttonId === "yes") {
          let message =
            "🙏 Thank you for using our Vehical booking service! 🚗 We hope you have a safe and enjoyable journey.";
          await Whatsapp.sendText({
            message: message,
            recipientPhone: recipientPhone,
          });
        } else if (buttonId === "cancel") {
          let message =
            "👋 No worries, we completely understand. We hope you're able to reschedule with us in the future. Thank you for letting us know and have a great day! 😊📅";
          await Whatsapp.sendText({
            message: message,
            recipientPhone: recipientPhone,
          });
        }

        ShplSession.get(recipientPhone).sessionInfo.push({
          recommend: buttonId,
        });
        noob["recommend"] = buttonId;
        let sheetData = [noob.number, noob.rating, noob.recommend];
        // postToSheet("Sheet1!A:C", [sheetData])

        var data111 = JSON.stringify({
          name: recipientName,
          number: noob.number,
          tofrom: noob.cons,
          rating: noob.rating,
          recommend: noob.recommend,
        });

        var config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://script.google.com/macros/s/AKfycbwvlXE4R2_ueKeJBmZXlbnkdxkH5e1cMQv9y7zm7AJk6Y7tZMxxPW6yC32AXRdbh8ueRQ/exec?action=addUser",
          headers: {
            "Content-Type": "application/json",
            Cookie:
              "NID=511=VxXq6TKWzp-4tGAxp2Hn7PZ42hp1Qq4X_pcoh2vRIGH3zf9XaDG6Xl-nbiDThg7mACrtkVM1C2TsdYCQzNA1WmFOK8Amgv94tZLOkpGdV3AAve3HsbkPA5v8AL4TACw84oRbhzICoxbp4v6PMsnJe6E1JuDeTW0GJIGRTiHDOjo",
          },
          data: data111,
        };
        var axios = require("axios");
        axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            ShplSession.set(recipientPhone, {
              sessionInfo: [],
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }    
      
      
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
