// const express = require('express');
// const cors = require("cors");
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const multer = require('multer');
// require('./db/config');
// const User = require("./db/User");
// const { Await } = require('react-router-dom');


// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Products API running');
// });


// app.post("/register",async (req,resp)=>{
//      let user= new User(req.body);
//      let result =await user.save();
//      result = result.toObject();
//      delete result.password;
//      resp.send(result);
// });

// app.post("/login", async (req,resp)=>{
//     console.log(req.body)
//     if(req.body.password && req.body.name) {
//     let user = await User.findOne(req.body).select("-password");
//     if(user)
//      {
//         resp.send(user)
//      }else{
//         resp.send({result : 'No User Found'})
//      }
//     } else {
//         resp.send({result : 'No User Found'})
//     }

// })

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
require('./db/config');
const User = require("./db/User");
const { Await } = require('react-router-dom');

dotenv.config();

const corsConfig = {
    origin: "*",
    credentials: true,
    methods : ["GET", "POST", "PUT", "DELETE"],
};

const app = express();

app.use(express.json());
app.use(cors(corsConfig));

app.get('/', (req, res) => {
    res.send('Products API running');
});

// API for the Sign-up
app.post("/register", async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        resp.send(result);
    } catch (error) {
        resp.status(500).send({ error: 'Failed to register user' });
    }
});

// API for the login
app.post("/login", async (req, resp) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                resp.send(user);
            } else {
                resp.status(404).send({ result: 'No User Found' });
            }
        } else {
            resp.status(400).send({ result: 'Email and password are required' });
        }
    } catch (error) {
        resp.status(500).send({ error: 'Failed to login user' });
    }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
