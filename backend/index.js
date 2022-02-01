const app = require('express')()
const consign = require("consign")
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb.js')
app.db = db
app.mongoose = mongoose

consign()
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./api/validation.js')
.then('./api')
.then('./schedules')
.then('./config/routes.js')
.into(app)

app.listen(3000,()=>{
    console.log('O backend está executando...')
})