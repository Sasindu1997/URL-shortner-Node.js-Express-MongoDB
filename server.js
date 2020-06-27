const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShortner',{
    useNewUrlParser : true, useUnifiedTopology : true
})

mongoose.connection.on('error', (err)=>{
    console.log('>> Failed to connect to MongoDB, retrying...');
})

app.set('view engine' , 'ejs')
app.use(express.urlencoded({ extended : false}))

//route 01
app.get('/', async (req,res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls})
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full : req.body.fullUrl })
    res.redirect('/')
})

//route 02
app.get('/:shortUrl', async(req, res) =>{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if(shortUrl == null) return res.sendStatus(400)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);