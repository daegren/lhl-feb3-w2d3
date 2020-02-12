const request = require('request')

request('http://google.com/not_found', (error, response, body) => {
  console.log('error:', error)
  console.log('statusCode:', response.statusCode)
  console.log('statusMessage:', response.statusMessage)
  // console.log('body:', body)
})
