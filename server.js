let express        = require('express')
let bodyParser     = require('body-parser')
let session        = require('express-session')
let app            = express()

//Moteur de Templates
app.set('view engine', 'ejs')

//Midleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'azazaz',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))


//Routes
app.get('/', (request, response) => {
    let Message = require('./models/message')
    Message.all(function (messages) {
    response.render('pages/index', {messages: messages }) 
    })
})

app.get('/message/:id', (request, response) => {
    let Message = require('./models/message')
    Message.find(request.params.id, function (message) {
        response.render('messages/show', {message: message})
    })
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.flash('error', "Vous n'avez pas poster de message")
        response.redirect('/') 
    } else {
        let Message = require('./models/message')
        Message.create(request.body.message, function () {
            request.flash('success', 'Envoyé')  
            response.redirect('/')
        })
    }

})

app.listen(8080) 