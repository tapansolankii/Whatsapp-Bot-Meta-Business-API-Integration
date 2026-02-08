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
  alluuid = []
  for (let i = 0; i < response.data.length; i++) {
    var abc={
      uuid:response.data[i].uuid,
      shipmentnumber:response.data[i].shipmentNumber
    }
    alluuid.push(abc )
    
    }

    console.log(alluuid);





})
.catch(function (error) {
  console.log(error);
});
