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
console.log("User model loaded successfully");
const { Await } = require('react-router-dom');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Products API running');
});

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

app.post("/login", async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.name) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        } else {
            resp.send({ result: 'No User Found' });
        }
    } else {
        resp.send({ result: 'No User Found' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
