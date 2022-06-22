const express = require('express')
const dotenv = require('dotenv')
const { engine } = require('express-handlebars');
const path = require('path');
const homeRoutes = require('./routes/homeRoutes')
const postersRoutes = require('./routes/posterRoutes')
const connectDB = require('./config/db')
//config dotenv 
dotenv.config()

//connec DB
connectDB()

const app = express()

//engine express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//middleware 
app.use(express.static(path.join('public')))


//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//initilaize routes
app.use('/', homeRoutes)
app.use('/posters', postersRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})