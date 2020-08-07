const WebSocket = require('ws')

const wsServer = new WebSocket.Server({
    port: 8080,
    host: '192.168.2.27'
})

wsServer.on('connection', function connect(ws,req) {
    console.log('WebSocket connected')
    const clientName = req.connection.remoteAddress
    wsServer.clients.forEach((client) => {
        client.send(JSON.stringify(`歡迎${clientName}進入聊天室`))
    })

    ws.on('message', function incoming(msg) {
        console.log(clientName+":"+JSON.parse(msg))
        // 渲染各個client端
        wsServer.clients.forEach((client) => {
            client.send(`${clientName}說${msg}`)
        })
    })
})