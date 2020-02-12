const net = require('net')

let clients = []

const broadcast = (data, client) => {
  clients.forEach(c => {
    if (c !== client) {
      c.write(`${client.name} > ${data}\n`)
    }
  })
}

const server = net.createServer((conn) => {
  // console.log('Client connected!')
  conn.setEncoding('utf8')
  clients.push(conn)

  conn.write("Hello! Welcome to the Chat Server!\n")
  conn.write("What is your name?\n")

  conn.on('data', (data) => {
    const parsedData = data.toString().trim()

    if (!conn.name) {
      conn.name = parsedData
      conn.write(`Hello ${conn.name}, you can now send messages to the chat room\n`)
      console.log(`${conn.name} has entered the chat room`)
      return
    }

    broadcast(parsedData, conn)
    console.log(`${conn.name} said: "${parsedData}"`)
  })

  conn.on('end', () => {
    clients = clients.filter(c => c !== conn)
    console.log(`${conn.name} has left.`)
  })
})

server.listen(1234)
