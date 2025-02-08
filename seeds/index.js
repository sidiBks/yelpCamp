const { mongoose } = require('mongoose')
const Campground = require('../models/campground.model')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp')

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany()
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 50) + 10
        const camp = new Campground({
            author: '67a526bd5f8800e0597833dc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            image: `https://picsum.photos/id/${random1000}/1920/1080`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repellendus obcaecati possimus, iure nulla repudiandae ab dolores id veniam odio aliquam dolore, itaque ut rerum alias vel quam ipsam repellat.',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})