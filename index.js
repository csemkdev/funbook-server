require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const path = require('path');
const sentMail = require('./sentMail');

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to mongodb')
})


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

app.post('/contact', (req, res) => {
    // console.log(req.body);
    try {

        sentMail({
            to: req.body.email,
            subject: req.body.subject + '| Mail from MAYUR Web Services | ',
            text: `
                Hello ${req.body.fullname},
                <br/>
                <br/>

                Thank you for getting in touch with me. I will contact you between two and seven days.
                <br/>
                <br/>

                Your Sincerely
                <br/>Mayur Kamble
            `
        })

        sentMail({
            to: 'cse.mkamble@gmail.com',
            subject: 'Mail from Your Web Services',
            text: `
                Dear Mr. Kamble,
                <br/>
                <br/>

                ${req.body.fullname} is traying to contact you. 
                <br/>Message: 
                <br/>${req.body.queries}
                <br/>
                <br/>

                Your Sincerely
                <br/>${req.body.fullname}
            `
        })

        return res.status(200).json({
            success: true,
            message: "Message Has Been Successfuly Sent"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "BACKEND SERVER ERORR!"
        })
    }
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