const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/urlShoertner',{
    useNewUrlParser : true, useUnifiedTopology : true
})
mongoose.connection.on('error', (err)=>{
    console.log('>> Failed to connect to MongoDB, retrying...');
})

app.set('view engine' , 'ejs')

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/shortUrls', (req, res) => {

})

app.listen(process.env.PORT || 5000);