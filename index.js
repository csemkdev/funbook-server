require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

// Create peer server
ExpressPeerServer(http, { path: '/' })

app.get('/api', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend has been successful worked!"
    })
})

// Routes
app.use('/api', require('./src/routes/authRoutes'));
app.use('/api', require('./src/routes/userRoutes'))
app.use('/api', require('./src/routes/postRoutes'))
app.use('/api', require('./src/routes/commentRoutes'))
app.use('/api', require('./src/routes/notifyRoutes'))
app.use('/api', require('./src/routes/messageRoutes'))

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to mongodb')
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('web'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'web', 'index.html'))
    })
}

const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port', port)
})