const { mongoose } = require('mongoose')
const Campground = require('../models/campground.model')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp')

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany()
    for (let i = 0; i < 5; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 50) + 10
        const camp = new Campground({
            author: '67a526bd5f8800e0597833dc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repellendus obcaecati possimus, iure nulla repudiandae ab dolores id veniam odio aliquam dolore, itaque ut rerum alias vel quam ipsam repellat.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/de0imsu2x/image/upload/v1739051808/cld-sample-3.jpg',
                    filename: 'YelpCamp/ioyclqd3ldz3rkhhih0h'
                },
                {
                    url: 'https://res.cloudinary.com/de0imsu2x/image/upload/v1739051808/cld-sample-4.jpg',
                    filename: 'YelpCamp/puacaveabmsppaksa9ye'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})