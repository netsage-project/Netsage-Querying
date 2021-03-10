
const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')
//For password security. 
require('dotenv').config();
//Create .env file and setup the following 
//USER_NAME=netsage username to access elasticsearch datasource 
//USER_PASSWORD=password to authenticate. 



const userName = process.env.USER_NAME; 
const password = process.env.USER_PASSWORD; 


// SET UP CLIENT 
//node : elasticsearch endpoint url 
//auth : Can use username and password as well as API Key if available. 
const client = new Client({
  node: 'https://netsage-elk1.grnoc.iu.edu/esproxy2',
  auth: {
    username: userName,
    password: password
  }
})

// ANOTHER METHOD TO SETUP CLIENT 

// const client = new Client({
//     node: 'https://username:password@url'
// })

//API KEY AUTHENTICATION FOR CLIENT 

// const client = new Client({
//     node: 'endpoint_URL_here,
//     auth: {
//       apiKey: 'apikey_here'
//     }
//   })




//USAGE

// promise API
// const result = await client.search({
//     index: 'my-index',
//     body: {
//       query: {
//         match: { hello: 'world' }
//       }
//     }
//   })
  
// callback API 
//   client.search({
//     index: 'my-index',
//     body: {
//       query: {
//         match: { hello: 'world' }
//       }
//     }
//   }, (err, result) => {
//     if (err) console.log(err)
//   })

//EXAMPLE SEARCH QUERY 
// client.search({
//     index: 'om-ns-netsage-*',
//     body: {
//       query: {
//         match: {'meta.sensor_id.keyword' :'University of Hawaii Tstat' }
//       }
//     }
//   }, (err, result) => {
//         //Handle error
//     if (err) console.log(err);
//     if(result){
//         UHresults = result.body.hits;
//         console.log(UHresults); 
//         myJSON = JSON.stringify(UHresults);
//         fs.writeFile('./testOutput.json', myJSON, err => {
//           if (err) {
//               console.log('Error writing file', err)
//           } else {
//               console.log('Successfully wrote file')
//           }
//         })
//     }
//   })

  client.search({
    index: 'om-ns-netsage-*',
    body: {
      query: {
          match: {'meta.sensor_id' :'University of Hawaii Tstat' }
      }
    }
  }, (err, result) => {
        //Handle error
    if (err) console.log(err);
    if(result){
        UHresults = result.body.hits;
        console.log(UHresults); 
        myJSON = JSON.stringify(UHresults);
        fs.writeFile('./testOutput.json', myJSON, err => {
          if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
        })
    }
  })

//The result is always in the following format. 
//   {
//     body: object | boolean
//     statusCode: number
//     headers: object
//     warnings: [string],
//     meta: object
//   }
