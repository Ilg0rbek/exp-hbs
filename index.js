const express = require('express')
const dotenv = require('dotenv')
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars')
const session = require('express-session')
const mongostore = require('connect-mongodb-session')(session)
const path = require('path');
const flash = require('connect-flash')
const homeRoutes = require('./routes/homeRoutes')
const postersRoutes = require('./routes/posterRoutes')
const authRoutes = require('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const hbsHalpers = require('./utils/hbsHalpers')
const connectDB = require('./config/db')

//config dotenv 
dotenv.config()

const app = express()

//initialize sessionStore
const store = new mongostore({
    collection: 'sessions',
    uri: process.env.MONGO_URI
})

app.use(flash())

//connec DB
connectDB()


//engine express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//middleware 
app.use(express.static(path.join('public')))


//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//register handlebars halper
hbsHalpers(Handlebars)


//session configuratsions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

//initilaize routes
app.use('/', homeRoutes)
app.use('/posters', postersRoutes)
app.use('/auth', authRoutes)
app.use('/profile', userRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})