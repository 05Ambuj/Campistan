const mongoose = require("mongoose");
const cities = require("./cities");
const campground = require("../models/campground");
const { places, descriptors } = require("./seedhelpers");

const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 50);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new campground({
      location: `${cities[random1000].City},${cities[random1000].State}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].Longitude,
          cities[random1000].Latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dfqfvzfje/image/upload/v1705599980/Campistan/nhww7vzci5ero9ogdt5r.jpg",
          filename: "Campistan/prd6ddkqmfr8pbcgsuba",
        },
        {
          url: "https://res.cloudinary.com/dfqfvzfje/image/upload/v1705932324/Campistan/jtrb2h7ynwhyeiqcnec2.jpg",
          filename: "Campistan/earv1ao3it9obyfey11e",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt consequatur laborum unde facilis labore, deserunt obcaecati, aut harum fugiat, at alias suscipit. Quis aliquam numquam, voluptatem tempore obcaecati ad earum?",
      price,
      author: "65a546f830927a367f7bd556",
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
