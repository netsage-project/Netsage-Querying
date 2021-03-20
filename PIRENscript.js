
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



// This loop will query and store docs in an output file.  
// The number of docs per file can be set in querySize variable.
var querySize = 10; // max is 1000
for (let i = 0; i < 3; i++) {
  var startDoc = i * querySize;
  client.search({
    index: 'om-ns-netsage-*',
    body: {
      from: startDoc,
      size: querySize,  
      query: {
          match: {'meta.src_organization':'University of Hawaii'}
      }
    }
  }, (err, result) => {
        //Handle error
    if (err) console.log(err);
    if(result){
        console.log(result); 
        myJSON = JSON.stringify(result.body.hits);
        fs.writeFile('./outputFile' + i + '.json', myJSON, err => {
          if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
        })
    }
  })
}


//The result is always in the following format. 
//   {
//     body: object | boolean
//     statusCode: number
//     headers: object
//     warnings: [string],
//     meta: object
//   }
