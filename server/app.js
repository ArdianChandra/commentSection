const express = require("express")
const { connect } = require('./config/mongodb')
const router = require('./routers/index')
const errorHandler = require('./helper/errorHandling')
const app = express()
const port = 3000
const cors = require('cors')

connect().then((database) => {
  console.log('connect to mongo');
  
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(router)
  app.use(errorHandler)
  app.listen(port, ()=> {
    console.log("running on port:", port);
  })
})