// var axios = require("axios");
// const xml2js = require("xml2js");
// var data1 = JSON.stringify({
//   "filters": {
//     "shipmentStatus": [
//       "Planned",
//       "Created"
//     ],
//     "customer": [
//       "SIEMENS HEALTHCARE PRIVATE LIMITED"
//     ],
//     "shipmentDate": {
//       "from": 1677556920000,
//       "till": 2114308947000
//     }
//   }
// });
// var config = {
//   method: "post",
//   url: "https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2",
//   headers: {
//     Authorization:
//       "Bearer xxxxxxxxxxxxxxxxxxx.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw",    
//       "Content-Type": "application/json",
//   },
//   data: data1,
// };

// setInterval(() => {
//   var vehicle_number = [];
// var shippment_number = [];
// var GoogleSheet_vehicle_number = [];
// var uniqueValue = [];
//   axios(config)
//     .then(function (response) {
//       for (var i = 0; i < response.data.data.length; i++) {
      
//           console.log(response.data.data[i].shipmentTrackingStatus)
//           vehicle_number.push(response.data.data[i].fleetInfo.vehicle.vehicleRegistrationNumber);
//           shippment_number.push(response.data.data[i].shipmentNumber);
        
//       }
//       console.log(vehicle_number, "Shippment Vehicle", shippment_number);
//       var axios = require("axios");
//       var config = {
//         method: "get",
//         url: "http://script.google.com/macros/s/AKfycbzaTq-dYbblb7yREO7nJgZKSHkmRcI9rrP8za9AVLKa6oKEX_C9n0JCuHROY0MN7GwBhw/exec?action=getUser",
//         headers: {
//           Cookie:
//             "NID=511=oDzBMbwuX12Cfg15osg66Wg4_E49_96TOcXuyIGuh4dkk9QPibfKPj5t0-kmSeMX9HuGETq0cf2MXz8cPXddQYtETb96GhAMsNMMS3Zi8MM6PsX7dByPDa828MdUwiOnMuOu0gm8LpftQuxQO-EXwSr6t6FCj2pKgfMpEifT2IA",
//         },
//       };
//       axios(config)
//         .then(function (response) {
//           for (let index = 0; index < response.data.length; index++) {
//             const element = response.data[index];
//             GoogleSheet_vehicle_number.push(element.DATA);
//           }
//           console.log(GoogleSheet_vehicle_number, "Google Sheet Vehicle");
//           uniqueValue.push(
//             ...vehicle_number.filter(
//               (x) => !GoogleSheet_vehicle_number.includes(x)
//             )
//           );
//           console.log(
//             uniqueValue,
//             "This Need to bee Pushed into the GOOGle Sheet "
//           );
//           async function senduniqueData(elemt, elmt) {
//             for (let i = 0; i < elemt.length; i++) {
//               const element = elemt[i];
//               const element1 = elmt[i];
//               var google_sheet_data = JSON.stringify({
//                 DATA: element,
//                 status: element1,
//               });
//               var google_sheet_config = {
//                 method: "post",
//                 url: "https://script.google.com/macros/s/AKfycbzaTq-dYbblb7yREO7nJgZKSHkmRcI9rrP8za9AVLKa6oKEX_C9n0JCuHROY0MN7GwBhw/exec?action=addUser",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Cookie:
//                     "NID=511=oDzBMbwuX12Cfg15osg66Wg4_E49_96TOcXuyIGuh4dkk9QPibfKPj5t0-kmSeMX9HuGETq0cf2MXz8cPXddQYtETb96GhAMsNMMS3Zi8MM6PsX7dByPDa828MdUwiOnMuOu0gm8LpftQuxQO-EXwSr6t6FCj2pKgfMpEifT2IA",
//                 },
//                 data: google_sheet_data,
//               };
//               try {
//                 const response = await axios(google_sheet_config);
//                 console.log(JSON.stringify(response.data), [i]);
//               } catch (error) {
//                 console.log(error);
//               }
//             }
//           }
//           if (uniqueValue.length != 0) {
//             senduniqueData(uniqueValue, shippment_number);
//             console.log("push the data ");
//             var Login_data = JSON.stringify({
//               username: "agarwal_usr",
//               password: "agarwal@11012023",
//             });
//             var login_config = {
//               method: "post",
//               url: "https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/user/login",
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//               data: Login_data,
//             };
//             var Login_id = [];
//             axios(login_config)
//               .then(function (response) {
//                 Login_id.push(response.data.response.id);
//                 console.log(Login_id, "TOKEN ");
//                 for (const vehiclenumber of uniqueValue) {
//                   console.log(Login_id, vehiclenumber);
//                   ulip_vehicle(vehiclenumber, Login_id);
//                 }
//               })
//               .catch(function (error) {
//                 console.log(error.status);
//               });
//             var datafasttag = JSON.stringify({
//               username: "agarwal_usr",
//               password: "agarwal@11012023",
//             });
//             var configfastag = {
//               method: "post",
//               maxBodyLength: Infinity,
//               url: "https://www.ulip.dpiit.gov.in/ulip/v1.0.0/user/login",
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//               data: datafasttag,
//             };
//             var FasttagLogin = [];
//             axios(configfastag)
//               .then((response) => {
//                 FasttagLogin.push(response.data.response.id);
//                 console.log(FasttagLogin, "FAST TAG KA TOKEN ");
//                 for (const vehiclenumber of uniqueValue) {
//                   console.log(FasttagLogin, vehiclenumber, "");
//                   Fasttag_data(vehiclenumber, FasttagLogin);
//                 }
//               })
//               .catch(function (error) {
//                 console.log(error);
//               });
//           } else {
//             console.log("dont Push the Data");
//           }
//           async function Fasttag_data(vehiclenumber, FasttagLogin) {
//             try {
//               var datafast = JSON.stringify({
//                 vehiclenumber: vehiclenumber,
//               });
//               var configfast = {
//                 method: "post",
//                 url: "https://www.ulip.dpiit.gov.in/ulip/v1.0.0/FASTAG/01",
//                 headers: {
//                   Authorization: `Bearer xxxxxxxxxxxxxxxxxxx${FasttagLogin[0]}`,
//                   "Content-Type": "application/json",
//                 },
//                 data: datafast,
//               };
//               axios(configfast)
//                 .then(function (response) {
//                   var config = {
//                     method: 'get',
//                   maxBodyLength: Infinity,
//                     url: 'https://script.google.com/macros/s/AKfycbxmbbtMzskQ-u6DCnprEzy1FW8SaQioZgGu4QwyncYFdLnZrZopVo1aMICFz3SEVp41eg/exec?action=getUser',
//                     headers: { }
//                   };
//                   axios(config)
//                   .then(function (response12) {
//                     var fasttagvnumber=[]
//                   for(var i=0;i<response12.data.length;i++ ){
//                     fasttagvnumber.push(response12.data[i].name)
//                   }  
//                     console.log(fasttagvnumber)
//                       if(response.data.response[0].response.result=="SUCCESS"){
//                         const xml = response.data.response[0].response.vehicle.vehltxnList.txn;
//                         console.log(xml.pop(), "RESPONE OF THER FAST TAG ");
//                         var final_data=xml.pop()
//                         var data = JSON.stringify({
//                           "name": final_data.vehicleRegNo,
//                           "readerReadTime":final_data.readerReadTime,
//                           "tollPlazaGeocode":final_data.tollPlazaGeocode,
//                           "tollPlazaName":final_data.tollPlazaName,
//                           "vehicleType":final_data.vehicleType
//                           });
//                           var config = {
//                             method: 'post',
//                           maxBodyLength: Infinity,
//                             url: 'https://script.google.com/macros/s/AKfycbxmbbtMzskQ-u6DCnprEzy1FW8SaQioZgGu4QwyncYFdLnZrZopVo1aMICFz3SEVp41eg/exec?action=addUser',
//                             headers: { 
//                               'Content-Type': 'application/json'
//                             },
//                             data : data
//                           };
//                           axios(config)
//                           .then(function (response) {
//                           console.log(JSON.stringify(response.data));
//                           })
//                           .catch(function (error) {
//                           console.log(error);
//                           });
//                       }
//                       else{
//                         var data = JSON.stringify({
//                           "name": vehiclenumber,
//                           "readerReadTime":"null",
//                           "tollPlazaGeocode":"null",
//                           "tollPlazaName":"null",
//                           "vehicleType":"null"
//                           });
//                           var config = {
//                             method: 'post',
//                           maxBodyLength: Infinity,
//                             url: 'https://script.google.com/macros/s/AKfycbxmbbtMzskQ-u6DCnprEzy1FW8SaQioZgGu4QwyncYFdLnZrZopVo1aMICFz3SEVp41eg/exec?action=addUser',
//                             headers: { 
//                               'Content-Type': 'application/json'
//                             },
//                             data : data
//                           };
//                           axios(config)
//                           .then(function (response) {
//                           console.log(JSON.stringify(response.data));
//                           })
//                           .catch(function (error) {
//                           console.log(error);
//                           });
//                       }
//                     // }
//                   })
//                   .catch(function (error) {
//                     console.log(error);
//                   });
//                 })
//                 .catch(function (error) {
//                   console.log(error);
//                 });
//             } catch (error) {
//               console.error(error);
//             }
//           }
//           async function ulip_vehicle(vehiclenumber, Login_id) {
//             try {
//               var dataV = JSON.stringify({
//                 vehiclenumber: `${vehiclenumber}`,
//               });
//               var config = {
//                 method: "post",
//                 url: "https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/VAHAN/01",
//                 headers: {
//                   Authorization: `Bearer xxxxxxxxxxxxxxxxxxx${Login_id[0]}`,
//                   "Content-Type": "application/json",
//                 },
//                 data: dataV,
//               };
//               axios(config)
//                 .then(function (response) {
//                   const xml = response.data.response[0].response;
//                   xml2js.parseString(xml, (err, result) => {
//                     var google_sheet_data = JSON.stringify({
//                       rc_regn_no: result.VehicleDetails.rc_regn_no[0] || null,
//                       rc_regn_dt: result.VehicleDetails.rc_regn_dt[0] || null,
//                       rc_owner_name:
//                         result.VehicleDetails.rc_owner_name[0] || null,
//                       rc_f_name: result.VehicleDetails.rc_f_name[0] || null,
//                       rc_present_address:
//                         result.VehicleDetails.rc_present_address[0] || null,
//                       rc_permanent_address:
//                         result.VehicleDetails.rc_permanent_address[0] || null,
//                       rc_mobile_no:
//                         result.VehicleDetails.rc_mobile_no[0] || null,
//                       rc_vch_catg: result.VehicleDetails.rc_vch_catg[0] || null,
//                       rc_owner_cd: result.VehicleDetails.rc_owner_cd[0] || null,
//                       rc_vh_class_desc:
//                         result.VehicleDetails.rc_vh_class_desc[0] || null,
//                       rc_chasi_no: result.VehicleDetails.rc_chasi_no[0] || null,
//                       rc_eng_no: result.VehicleDetails.rc_eng_no[0] || null,
//                       rc_maker_desc:
//                         result.VehicleDetails.rc_maker_desc[0] || null,
//                       rc_maker_model:
//                         result.VehicleDetails.rc_maker_model[0] || null,
//                       rc_body_type_desc:
//                         result.VehicleDetails.rc_body_type_desc[0] || null,
//                       rc_fuel_desc:
//                         result.VehicleDetails.rc_fuel_desc[0] || null,
//                       rc_color: result.VehicleDetails.rc_color[0] || null,
//                       rc_norms_desc:
//                         result.VehicleDetails.rc_norms_desc[0] || null,
//                       rc_fit_upto: result.VehicleDetails.rc_fit_upto[0] || null,
//                       rc_np_no:
//                         result.VehicleDetails && result.VehicleDetails.rc_np_no
//                           ? result.VehicleDetails.rc_np_no[0]
//                           : null,
//                       rc_np_upto:
//                         result.VehicleDetails &&
//                         result.VehicleDetails.rc_np_upto
//                           ? result.VehicleDetails.rc_np_upto[0]
//                           : null,
//                       rc_np_issued_by:
//                         result.VehicleDetails &&
//                         result.VehicleDetails.rc_np_issued_by
//                           ? result.VehicleDetails.rc_np_issued_by[0]
//                           : null,
//                       rc_tax_upto: result.VehicleDetails.rc_tax_upto[0] || null,
//                       rc_financer: result.VehicleDetails.rc_financer[0] || null,
//                       rc_insurance_comp:
//                         result.VehicleDetails.rc_insurance_comp[0] || null,
//                       rc_insurance_policy_no:
//                         result.VehicleDetails.rc_insurance_policy_no[0] || null,
//                       rc_insurance_upto:
//                         result.VehicleDetails.rc_insurance_upto[0] || null,
//                       rc_manu_month_yr:
//                         result.VehicleDetails.rc_manu_month_yr[0] || null,
//                       rc_unld_wt: result.VehicleDetails.rc_unld_wt[0] || null,
//                       rc_gvw: result.VehicleDetails.rc_gvw[0] || null,
//                       rc_no_cyl: result.VehicleDetails.rc_no_cyl[0] || null,
//                       rc_cubic_cap:
//                         result.VehicleDetails.rc_cubic_cap[0] || null,
//                       rc_seat_cap: result.VehicleDetails.rc_seat_cap[0] || null,
//                       rc_sleeper_cap:
//                         result.VehicleDetails.rc_sleeper_cap[0] || null,
//                       rc_stand_cap:
//                         result.VehicleDetails.rc_stand_cap[0] || null,
//                       rc_wheelbase:
//                         result.VehicleDetails.rc_wheelbase[0] || null,
//                       rc_registered_at:
//                         result.VehicleDetails.rc_registered_at[0] || null,
//                       rc_status_as_on:
//                         result.VehicleDetails.rc_status_as_on[0] || null,
//                       rc_pucc_upto:
//                         result.VehicleDetails.rc_pucc_upto[0] || null,
//                       rc_pucc_no: result.VehicleDetails.rc_pucc_no[0] || null,
//                       rc_status: result.VehicleDetails.rc_status[0] || null,
//                       rc_blacklist_status:
//                         result.VehicleDetails.rc_blacklist_status[0] || null,
//                       rc_permit_no:
//                         result.VehicleDetails &&
//                         result.VehicleDetails.rc_permit_no
//                           ? result.VehicleDetails.rc_permit_no[0]
//                           : null,
//                       rc_permit_issue_dt:
//                         result.VehicleDetails &&
//                         result.VehicleDetails.rc_permit_issue_dt
//                           ? result.VehicleDetails.rc_permit_issue_dt[0]
//                           : null,
//                       rc_permit_valid_from:
//                         result.VehicleDetails &&
//                         result.VehicleDetails.rc_permit_valid_from
//                           ? result.VehicleDetails.rc_permit_valid_from[0]
//                           : null,
//                       rc_permit_valid_upto:
//                         result.VehicleDetails &&
//                         result.VehicleDetails.rc_permit_valid_upto
//                           ? result.VehicleDetails.rc_permit_valid_upto[0]
//                           : null,
//                       rc_permit_type:
//                         result.VehicleDetails &&
//                         result.VehicleDetails.rc_permit_type
//                           ? result.VehicleDetails.rc_permit_type[0]
//                           : null,
//                       rc_noc_details:
//                         result.VehicleDetails.rc_noc_details[0] || null,
//                       rc_vh_class: result.VehicleDetails.rc_vh_class[0] || null,
//                     });
//                     var google_sheet_config = {
//                       method: "post",
//                       url: "https://script.google.com/macros/s/AKfycbzaTq-dYbblb7yREO7nJgZKSHkmRcI9rrP8za9AVLKa6oKEX_C9n0JCuHROY0MN7GwBhw/exec?action=addUser",
//                       headers: {
//                         "Content-Type": "application/json",
//                         Cookie:
//                           "NID=511=oDzBMbwuX12Cfg15osg66Wg4_E49_96TOcXuyIGuh4dkk9QPibfKPj5t0-kmSeMX9HuGETq0cf2MXz8cPXddQYtETb96GhAMsNMMS3Zi8MM6PsX7dByPDa828MdUwiOnMuOu0gm8LpftQuxQO-EXwSr6t6FCj2pKgfMpEifT2IA",
//                       },
//                       data: google_sheet_data,
//                     };
//                     try {
//                       const response = axios(google_sheet_config);
//                       console.log("Hogaya re", [i]);
//                     } catch (error) {
//                       console.log(error.status);
//                     }
//                   });
//                 })
//                 .catch(function (error) {
//                   console.log(error);
//                 });
//             } catch (error) {
//               console.error(error);
//             }
//           }
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//       // call the function to start the requests
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//     let date = new Date().toJSON();
//     console.log(date);
// }, 20000);
// // var axios = require('axios');
// // var config = {
// //   method: 'get',
// // maxBodyLength: Infinity,
// //   url: 'https://script.googleusercontent.com/a/macros/agarwalpackers.com/echo?user_content_key=liluZGoKsVsI56pRMCbhaWgXdKTyvEzljs8wXtM7ZZwxRvYrxCKbroPEdPlGYY5qa9EQ6vY05Qi1xKcZE-Y8QzE0ZFrkxCriOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCzuoJ5WTSD9188tqLxoWbKVeS6iIHTYzLJN6pUfYvVdeVlG5jFSmZBnga7jA1jJv2Ff-ndfXe0m_cBNwR9NdQAJQvZbyK2Sn14j10FjQKB0WW2AeJY_LhcNDLB45iwYI_Ty7jWPDs9-kALmaJ23tE4L5nWh-m0S0U&lib=Mste7nhVMiwHbCBqAdeBeQ0a1jiuL8Xjw',
// //   headers: { }
// // };
// // axios(config)
// // .then(function (response) {
// // var datamain=[]
// //   for(var i=0;i<response.data.length;i++ ){
// //     if(response.data[i].rc_regn_no!="" && response.data[i].rc_regn_no!="#N/A"&&response.data[i].rc_regn_no!="Vehicle Number"){
// //       var obj={
// //         rc_regn_no:response.data[i].rc_regn_no,
// //         rc_fit_upto:response.data[i].rc_fit_upto,
// //         rc_insurance_upto:response.data[i].rc_insurance_upto,
// //         rc_pucc_upto:response.data[i].rc_pucc_upto,
// //         rc_np_upto:response.data[i].rc_np_upto,
// //         rc_permit_valid_upto:response.data[i].rc_permit_valid_upto
// //       }
// //       datamain.push(obj)
// //     }
// //   }
// //   console.log(datamain)
// // })
// // .catch(function (error) {
// //   console.log(error);
// // });



const google_sheet_data = JSON.stringify({
    rc_regn_no: result.VehicleDetails.rc_regn_no[0] || null,
    rc_regn_dt: result.VehicleDetails.rc_regn_dt[0] || null,
    rc_owner_name:
      result.VehicleDetails.rc_owner_name[0] || null,
    rc_f_name: result.VehicleDetails.rc_f_name[0] || null,
    rc_present_address:
      result.VehicleDetails.rc_present_address[0] || null,
    rc_permanent_address:
      result.VehicleDetails.rc_permanent_address[0] || null,
    rc_mobile_no:
      result.VehicleDetails.rc_mobile_no[0] || null,
    rc_vch_catg: result.VehicleDetails.rc_vch_catg[0] || null,
    rc_owner_cd: result.VehicleDetails.rc_owner_cd[0] || null,
    rc_vh_class_desc:
      result.VehicleDetails.rc_vh_class_desc[0] || null,
    rc_chasi_no: result.VehicleDetails.rc_chasi_no[0] || null,
    rc_eng_no: result.VehicleDetails.rc_eng_no[0] || null,
    rc_maker_desc:
      result.VehicleDetails.rc_maker_desc[0] || null,
    rc_maker_model:
      result.VehicleDetails.rc_maker_model[0] || null,
    rc_body_type_desc:
      result.VehicleDetails.rc_body_type_desc[0] || null,
    rc_fuel_desc:
      result.VehicleDetails.rc_fuel_desc[0] || null,
    rc_color: result.VehicleDetails.rc_color[0] || null,
    rc_norms_desc:
      result.VehicleDetails.rc_norms_desc[0] || null,
    rc_fit_upto: result.VehicleDetails.rc_fit_upto[0] || null,
    rc_np_no:
      result.VehicleDetails && result.VehicleDetails.rc_np_no
        ? result.VehicleDetails.rc_np_no[0]
        : null,
    rc_np_upto:
      result.VehicleDetails &&
      result.VehicleDetails.rc_np_upto
        ? result.VehicleDetails.rc_np_upto[0]
        : null,
    rc_np_issued_by:
      result.VehicleDetails &&
      result.VehicleDetails.rc_np_issued_by
        ? result.VehicleDetails.rc_np_issued_by[0]
        : null,
    rc_tax_upto: result.VehicleDetails.rc_tax_upto[0] || null,
    rc_financer: result.VehicleDetails.rc_financer[0] || null,
    rc_insurance_comp:
      result.VehicleDetails.rc_insurance_comp[0] || null,
    rc_insurance_policy_no:
      result.VehicleDetails.rc_insurance_policy_no[0] || null,
    rc_insurance_upto:
      result.VehicleDetails.rc_insurance_upto[0] || null,
    rc_manu_month_yr:
      result.VehicleDetails.rc_manu_month_yr[0] || null,
    rc_unld_wt: result.VehicleDetails.rc_unld_wt[0] || null,
    rc_gvw: result.VehicleDetails.rc_gvw[0] || null,
    rc_no_cyl: result.VehicleDetails.rc_no_cyl[0] || null,
    rc_cubic_cap:
      result.VehicleDetails.rc_cubic_cap[0] || null,
    rc_seat_cap: result.VehicleDetails.rc_seat_cap[0] || null,
    rc_sleeper_cap:
      result.VehicleDetails.rc_sleeper_cap[0] || null,
    rc_stand_cap:
      result.VehicleDetails.rc_stand_cap[0] || null,
    rc_wheelbase:
      result.VehicleDetails.rc_wheelbase[0] || null,
    rc_registered_at:
      result.VehicleDetails.rc_registered_at[0] || null,
    rc_status_as_on:
      result.VehicleDetails.rc_status_as_on[0] || null,
    rc_pucc_upto:
      result.VehicleDetails.rc_pucc_upto[0] || null,
    rc_pucc_no: result.VehicleDetails.rc_pucc_no[0] || null,
    rc_status: result.VehicleDetails.rc_status[0] || null,
    rc_blacklist_status:
      result.VehicleDetails.rc_blacklist_status[0] || null,
    rc_permit_no:
      result.VehicleDetails &&
      result.VehicleDetails.rc_permit_no
        ? result.VehicleDetails.rc_permit_no[0]
        : null,
    rc_permit_issue_dt:
      result.VehicleDetails &&
      result.VehicleDetails.rc_permit_issue_dt
        ? result.VehicleDetails.rc_permit_issue_dt[0]
        : null,
    rc_permit_valid_from:
      result.VehicleDetails &&
      result.VehicleDetails.rc_permit_valid_from
        ? result.VehicleDetails.rc_permit_valid_from[0]
        : null,
    rc_permit_valid_upto:
      result.VehicleDetails &&
      result.VehicleDetails.rc_permit_valid_upto
        ? result.VehicleDetails.rc_permit_valid_upto[0]
        : null,
    rc_permit_type:
      result.VehicleDetails &&
      result.VehicleDetails.rc_permit_type
        ? result.VehicleDetails.rc_permit_type[0]
        : null,
    rc_noc_details:
      result.VehicleDetails.rc_noc_details[0] || null,
    rc_vh_class: result.VehicleDetails.rc_vh_class[0] || null,
  });