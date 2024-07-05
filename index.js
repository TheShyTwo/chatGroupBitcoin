import express from 'express'
const app = express()
const port = 3000
import http from 'http'
const server = http.createServer(app)
import {Server} from 'socket.io'
import delay from 'delay'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('on-chat', data => {
        io.emit('user-chat', data)
    })
})


server.listen(port, () => {
    console.log(`listening on port ${port}`)
})

async function broadcastBitcoinPrice() {
    while (true) {
        const price = 71345 + Math.random() * 500
        io.emit('bitcoin-price', {
            price: parseFloat(price.toFixed(2))
        })
        await delay(500)
    }
}

broadcastBitcoinPrice()