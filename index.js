// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const multer = require('multer');
// require('./db/config');
// const User = require('./db/Divy');
// const Detail = require('./db/Detail');

// dotenv.config();

// const app = express();

// const corsConfig = {
//     origin: 'https://room-rooster-kappa.vercel.app',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
// };

// app.use(cors(corsConfig));

// // Explicitly handle preflight requests
// app.options('*', cors(corsConfig));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
// });

// app.get('/', (req, res) => {
//     res.send('Products API running');
// });

// app.get('/home', (req, res) => {
//     res.send('API running');
// });

// // API for Sign-up
// app.post('/register', async (req, res) => {
//     try {
//         let user = new User(req.body);
//         let result = await user.save();
//         result = result.toObject();
//         delete result.password;
//         res.send(result);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to register user' });
//     }
// });

// // API for login
// app.post('/login', async (req, res) => {
//     try {
//         if (req.body.password && req.body.email) {
//             let user = await User.findOne(req.body).select('-password');
//             if (user) {
//                 res.send(user);
//             } else {
//                 res.status(404).send({ result: 'No User Found' });
//             }
//         } else {
//             res.status(400).send({ result: 'Email and password are required' });
//         }
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to login user' });
//     }
// });

// // API to insert all the details
// app.post('/details', upload.single('image'), async (req, res) => {
//     try {
//         let detail = new Detail({
//             name: req.body.name,
//             price: req.body.price,
//             description: req.body.description,
//             phoneNumber: req.body.phoneNumber,
//             sqft: req.body.sqft,
//             bed: req.body.bed,
//             bath: req.body.bath,
//             ownername: req.body.ownername,
//             deposit: req.body.deposit,
//             FurnishedStatus: req.body.FurnishedStatus,
//             Availability: req.body.Availability,
//             Perferredfor: req.body.Perferredfor,
//             ageofconstruction: req.body.ageofconstruction,
//             info: req.body.info,
//             image: {
//                 data: req.file.buffer,
//                 contentType: req.file.mimetype,
//             },
//         });
//         let result = await detail.save();
//         res.send(result);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to save detail' });
//     }
// });

// // API to retrieve all the details from the DB
// app.get('/details', async (req, res) => {
//     try {
//         let details = await Detail.find();
//         let formattedDetails = details.map((detail) => ({
//             _id: detail._id,
//             name: detail.name,
//             price: detail.price,
//             description: detail.description,
//             phoneNumber: detail.phoneNumber,
//             sqft: detail.sqft,
//             bed: detail.bed,
//             bath: detail.bath,
//             image: detail.image ? `data:${detail.image.contentType};base64,${detail.image.data.toString('base64')}` : null,
//         }));
//         res.send(formattedDetails);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to retrieve details' });
//     }
// });

// // API to retrieve a particular detail by ID
// app.get('/details/:id', async (req, res) => {
//     try {
//         let detail = await Detail.findById(req.params.id);
//         if (!detail) {
//             return res.status(404).send({ error: 'Detail not found' });
//         }
//         let formattedDetail = {
//             _id: detail._id,
//             name: detail.name,
//             price: detail.price,
//             description: detail.description,
//             phoneNumber: detail.phoneNumber,
//             sqft: detail.sqft,
//             bed: detail.bed,
//             bath: detail.bath,
//             ownername: detail.ownername,
//             deposit: detail.deposit,
//             FurnishedStatus: detail.FurnishedStatus,
//             Availability: detail.Availability,
//             Perferredfor: detail.Perferredfor,
//             ageofconstruction: detail.ageofconstruction,
//             info: detail.info,
//             image: detail.image ? `data:${detail.image.contentType};base64,${detail.image.data.toString('base64')}` : null,
//         };
//         res.send(formattedDetail);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to retrieve detail' });
//     }
// });

// // Search endpoint
// app.get('/search', async (req, res) => {
//     try {
//         let { name, price, description } = req.query;
//         let searchCriteria = {};

//         if (name) {
//             searchCriteria.name = new RegExp(name, 'i'); // Case insensitive regex search
//         }

//         if (price) {
//             searchCriteria.price = price;
//         }

//         if (description) {
//             searchCriteria.description = new RegExp(description, 'i'); // Case insensitive regex search
//         }

//         let results = await Detail.find(searchCriteria);
//         res.send(results);
//     } catch (error) {
//         res.status(500).send({ error: 'Failed to search details' });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
require('./db/config');
const User = require('./db/Divy');
const Detail = require('./db/Photo');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://room-rooster-kappa.vercel.app', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// Middleware for parsing JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Products API running');
});

app.get('/home', (req, res) => {
    res.send('API running');
});

// API for Sign-up
app.post('/register', async (req, res) => {
    try {
        let user = new User(req.body);
        await user.validate(); // Validate user data
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        res.send(result);
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.name === 'ValidationError') {
            res.status(400).send({ error: 'Validation failed', details: error.errors });
        } else {
            res.status(500).send({ error: 'Failed to register user' });
        }
    }
});

// API for login
app.post('/login', async (req, res) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await User.findOne({ email: req.body.email, password: req.body.password }).select('-password');
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({ result: 'No User Found' });
            }
        } else {
            res.status(400).send({ result: 'Email and password are required' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ error: 'Failed to login user' });
    }
});

app.post('/details', upload.array('images', 5), async (req, res) => {
    try {
        console.log('Received request to add details');
        
        const images = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype,
        }));

        let detail = new Detail({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            phoneNumber: req.body.phoneNumber,
            sqft: req.body.sqft,
            bed: req.body.bed,
            bath: req.body.bath,
            ownername: req.body.ownername,
            deposit: req.body.deposit,
            FurnishedStatus: req.body.FurnishedStatus,
            Availability: req.body.Availability,
            Perferredfor: req.body.Perferredfor,
            ageofconstruction: req.body.ageofconstruction,
            info: req.body.info,
            location: req.body.location,
            images: images,
        });

        console.log('Detail object created, saving to database');

        let result = await detail.save();

        console.log('Detail saved successfully');
        res.send(result);
    } catch (error) {
        console.error('Error saving detail:', error);
        res.status(500).send({ error: 'Failed to save detail' });
    }
});

// API to retrieve all the details from the DB
app.get('/details', async (req, res) => {
    try {
        let details = await Detail.find();
        let formattedDetails = details.map((detail) => ({
            _id: detail._id,
            name: detail.name,
            price: detail.price,
            description: detail.description,
            phoneNumber: detail.phoneNumber,
            sqft: detail.sqft,
            bed: detail.bed,
            bath: detail.bath,
            location: detail.location,
            images: detail.images.map(image => `data:${image.contentType};base64,${image.data.toString('base64')}`),
        }));
        res.send(formattedDetails);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve details' });
    }
});

// API to retrieve a particular detail by ID
app.get('/details/:id', async (req, res) => {
    try {
        let detail = await Detail.findById(req.params.id);
        if (!detail) {
            return res.status(404).send({ error: 'Detail not found' });
        }
        let formattedDetail = {
            _id: detail._id,
            name: detail.name,
            price: detail.price,
            description: detail.description,
            phoneNumber: detail.phoneNumber,
            sqft: detail.sqft,
            bed: detail.bed,
            bath: detail.bath,
            ownername: detail.ownername,
            deposit: detail.deposit,
            FurnishedStatus: detail.FurnishedStatus,
            Availability: detail.Availability,
            Perferredfor: detail.Perferredfor,
            ageofconstruction: detail.ageofconstruction,
            info: detail.info,
            location: detail.location,
            images: detail.images.map(image => `data:${image.contentType};base64,${image.data.toString('base64')}`),
        };
        res.send(formattedDetail);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve detail' });
    }
});

// API for search functionality
app.get('/search', async (req, res) => {
    try {
        const { propertyType, location } = req.query;

        // Build the query object
        let query = {};
        if (propertyType) {
            query.name = propertyType;
        }
        if (location) {
            query.location = location;
        }

        // Execute the query
        let results = await Detail.find(query);
        let formattedResults = results.map((result) => ({
            _id: result._id,
            name: result.name,
            price: result.price,
            description: result.description,
            phoneNumber: result.phoneNumber,
            sqft: result.sqft,
            bed: result.bed,
            bath: result.bath,
            location: result.location,
            images: result.images.map(image => `data:${image.contentType};base64,${image.data.toString('base64')}`),
        }));

        res.send(formattedResults);
    } catch (error) {
        res.status(500).send({ error: 'Failed to perform search' });
    }
});

// API to delete a particular detail by ID
app.delete('/details/:id', async (req, res) => {
    try {
        const detailId = req.params.id;  // Extract the detail ID from the request parameters

        const result = await Detail.findByIdAndDelete(detailId);  // Delete the detail by ID

        if (!result) {
            return res.status(404).send({ error: 'Detail not found' });  // If no detail is found, send a 404 response
        }

        res.send({ message: 'Detail deleted successfully' });  // Send a success response
    } catch (error) {
        console.error('Error deleting detail:', error);  // Log the error to the console
        res.status(500).send({ error: 'Failed to delete detail' });  // Send a 500 response in case of error
    }
});

// API to update a particular detail by ID
app.put('/details/:id', upload.array('images', 5), async (req, res) => {
    try {
        const detailId = req.params.id;  // Extract the detail ID from the request parameters

        // Extract updated fields from the request body
        const updatedFields = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            phoneNumber: req.body.phoneNumber,
            sqft: req.body.sqft,
            bed: req.body.bed,
            bath: req.body.bath,
            ownername: req.body.ownername,
            deposit: req.body.deposit,
            FurnishedStatus: req.body.FurnishedStatus,
            Availability: req.body.Availability,
            Perferredfor: req.body.Perferredfor,
            ageofconstruction: req.body.ageofconstruction,
            info: req.body.info,
            location: req.body.location,
        };

        // Check if any images are provided in the request
        if (req.files && req.files.length > 0) {
            const images = req.files.map(file => ({
                data: file.buffer,
                contentType: file.mimetype,
            }));
            updatedFields.images = images;  // Add images to the updated fields
        }

        // Find the detail by ID and update with new fields
        const result = await Detail.findByIdAndUpdate(detailId, updatedFields, { new: true });

        if (!result) {
            return res.status(404).send({ error: 'Detail not found' });  // If no detail is found, send a 404 response
        }

        res.send(result);  // Send the updated detail as the response
    } catch (error) {
        console.error('Error updating detail:', error);  // Log the error to the console
        res.status(500).send({ error: 'Failed to update detail' });  // Send a 500 response in case of error
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

