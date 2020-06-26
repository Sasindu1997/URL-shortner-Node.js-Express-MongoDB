const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const shortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShoertner',{
    useNewUrlParser : true, useUnifiedTopology : true
})
mongoose.connection.on('error', (err)=>{
    console.log('>> Failed to connect to MongoDB, retrying...');
})

app.set('view engine' , 'ejs')
app.use(express.urlencoded({ extended : false}))

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/shortUrls', async(req, res) => {
    await shortUrl.create({ full : req.body.fullUrl })
    res.redirect('index')
})

app.listen(process.env.PORT || 5000);