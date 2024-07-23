// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();  // Load environment variables from .env file

// const dbHOST = process.env.DBHOST;

// mongoose.connect(dbHOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })
//     .then(() => {
//         console.log('MongoDB Connected...');
//     })
//     .catch((err) => {
//         console.error('Error while connecting to MongoDB:', err);
//     });



const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

const dbHOST = process.env.DBHOST;

mongoose.connect(dbHOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    connectTimeoutMS: 10000,  // 10 seconds
    socketTimeoutMS: 45000    // 45 seconds
})
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch((err) => {
        console.error('Error while connecting to MongoDB:', err);
    });
