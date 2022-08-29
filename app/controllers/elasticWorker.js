const { Client } = require('@elastic/elasticsearch')
// const config = require('config');

const client = new Client({
    cloud: {
      id: "zy29M-WDRNy00766VjUZFQ"
    },
    auth: {
      username: "elastic",
      password: "admin311"
    }
  })

  client.info()
  .then(response => console.log(response))
  .catch(error => console.error(error))