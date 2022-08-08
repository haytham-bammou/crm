const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {sequelize} = require('./models')
const { errorHandler } = require('./middleware/erreorMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api/users' , require('./routes/userRoutes'))


app.use(errorHandler)



const PORT = process.env.PORT || 5000
app.listen(PORT , async () => {
    console.log(`app listening on port : ${PORT}`.green.underline)
    await sequelize.authenticate()
    console.log("database connected".cyan)
})