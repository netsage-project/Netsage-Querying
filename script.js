
const { Client } = require('@elastic/elasticsearch')
//For password security. 
require('dotenv').config();
//Create .env file and setup the following 
//USER_NAME : netsage username to access elasticsearch datasource 
//USER_PASSWORD : password to authenticate. 



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
  
//   // callback API
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
client.search({
    index: 'om-ns-netsage-*',
    body: {
      query: {
        match: {'meta.sensor_id.keyword' :'University of Hawaii Tstat' }
      }
    }
  }, (err, result) => {
        //Handle error
    if (err) console.log(err);
    if(result){
        //do things with the result. 
        console.log(result.body.hits); 
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
