
const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')
//For password security. 
require('dotenv').config(); 

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




//EXAMPLE SEARCH QUERY 
client.search({
    index: 'om-ns-netsage-*',
    body: {
      size: 10000,
      query: {
        match: {'meta.sensor_id.keyword' :'University of Hawaii Tstat' }
      },
      sort: [
        {"@timestamp": "asc"},
        
      ]
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


