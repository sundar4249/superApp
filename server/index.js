const express = require('express')
const cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const Orders = require("./models/orders")
const io = new Server(server,{
  cors: {
    origin: "*"
  }
});

require('dotenv').config()
const ordersRouter = require('./routes/orders')
const usersRouter = require('./routes/users')
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use('/', ordersRouter)
app.use('/', usersRouter)

const connectDb = require('./db/connectDb')
connectDb()

io.on('connection', (socket) => {
  socket.on('orderRequests', async(orderRequests)=> {
    console.log(orderRequests)
    const updateData = await Orders.findByIdAndUpdate(orderRequests._id, {orderStatusId: orderRequests.currentOrderstatusId+1})
    // //broadcast
    // io.emit('greetings','hello')
  })
  console.log('a user connected');
});



server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
