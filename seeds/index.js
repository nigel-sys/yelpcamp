const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose
  .connect('mongodb://localhost:27017/yelp-camp')
  .then(console.log('Connected to Mongo!'))
  .catch((err) => {
    console.log('Mongo Connection Error!');
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      //YOUR USER ID
      author: '618b9e52139fd0d7000d1987',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/nibaimgs/image/upload/v1636988008/YelpCamp/eafky9iud2xaolaeoyjt.jpg',
          filename: 'YelpCamp/eafky9iud2xaolaeoyjt',
        },
        {
          url: 'https://res.cloudinary.com/nibaimgs/image/upload/v1637071290/YelpCamp/mbn3zh4cwkpdttxdpdzy.jpg',
          filename: 'YelpCamp/mbn3zh4cwkpdttxdpdzy',
        },
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempora non veritatis eius eum quis, corrupti a architecto repudiandae quam in similique cum ea aliquam nam tempore illum molestias vitae!',
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
