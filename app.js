const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')

const campgroundRoute = require('./routes/campground.route')
const reviewRoute = require('./routes/review.route')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



app.use('/campgrounds', campgroundRoute)
app.use('/campgrounds/:id/reviews', reviewRoute)

app.get('/', (req, res) => {
    res.render('home')
})

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statuCode = 500 } = err
    if (!err.message) err.message = 'Oh No. Something Went Wrong!'
    res.status(statuCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})