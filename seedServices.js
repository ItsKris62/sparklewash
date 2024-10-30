// seedServices.js

// To populate the database with predefined services and additional services, create a seed script.

const mongoose = require('mongoose');
const Service = require('./models/Service');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const services = [
  {
    name: 'Laundry Services',
    basePrice: 20,
    additionalServices: [
      { name: 'Express Laundry Service', price: 10 },
      { name: 'Fabric Softener Upgrade', price: 3 },
      { name: 'Eco-Friendly Detergent', price: 5 },
      { name: 'Stain Removal Treatment', price: 7 },
    ],
  },
  {
    name: 'Airbnb Cleaning Services',
    basePrice: 100,
    additionalServices: [
      { name: 'Deep Cleaning Package', price: 80 },
      { name: 'Restocking Essentials', price: 25 },
      { name: 'Pet Hair Removal', price: 15 },
      { name: 'Pre-Guest Setup', price: 40 },
    ],
  },
  {
    name: 'Dry Cleaning Services',
    basePrice: 30,
    additionalServices: [
      { name: 'Suit & Formal Wear Package', price: 25 },
      { name: 'Delicate Garments', price: 18 },
      { name: 'Wedding Dress Preservation', price: 120 },
      { name: 'Seasonal Storage', price: 50 },
    ],
  },
  {
    name: 'Meal Prep Services',
    basePrice: 70,
    additionalServices: [
      { name: 'Personalized Meal Plan', price: 50 },
      { name: 'Organic Ingredients Upgrade', price: 20 },
      { name: 'Family Meal Pack', price: 60 },
      { name: 'Snack Add-On', price: 15 },
    ],
  },
  {
    name: 'Laundry and Ironing Services',
    basePrice: 25,
    additionalServices: [
      { name: 'Express Ironing', price: 8 },
      { name: 'Hanger & Folded Service', price: 2 },
      { name: 'Premium Wrinkle-Free Treatment', price: 5 },
      { name: 'Shirt Starch Application', price: 3 },
    ],
  },
  {
    name: 'Carpet Cleaning Services',
    basePrice: 60,
    additionalServices: [
      { name: 'Spot Treatment', price: 20 },
      { name: 'Deodorizing Treatment', price: 10 },
      { name: 'Upholstery Cleaning', price: 40 },
      { name: 'Pet Odor and Stain Removal', price: 25 },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await Service.deleteMany();
    await Service.insertMany(services);
    console.log('Database seeded!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
