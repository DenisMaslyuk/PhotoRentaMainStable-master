const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

var passport = require('passport');
var settings = require('./config/settings');
require('./config/passport')(passport);
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Import Model
const Product = require("./models/Product");
const Profile = require("./models/Profile");

var CurUser=null;

// Connect to MongoDB
mongoose.connect(
  "mongodb://localhost:27017/simple-mern",
  () => console.log("MongoDB is connected")
);
app.use(fileUpload());
// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Get all of our posts
app.get("/api/posts", (req, res) => {
  Product.find({}).then(posts => {
    res.json(posts);
  });
});



app.get("/api/curuser", (req, res) => {
  res.json(CurUser)
});
app.post("/api/curuser", (req, res) => {
  CurUser=null
});

// Get One of Our posts
app.get("/api/product/:id", (req, res) => {
  Product.findOne({ _id: req.params.id }).then(product => {
    res.json(product);
  });
});
app.get("/api/profile/", (req, res) => {
  Profile.findOne({ login: CurUser }).then(profile => {
    res.json(profile);
  });
});

// Create and Update post
app.post("/api/posts", (req, res) => {
  const data = {
    productName: req.body.productName,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    availability: req.body.availability,
  };
  Product.findOne({ _id: req.body.id }, (err, post) => {
    if (post) {
      Product.findByIdAndUpdate(req.body.id, data, { upsert: false }).then(
        updated => {
          res.json(updated);
        }
      );
    } else {
      Product.create(data).then(created => {
        res.json(created);
      });
    }
  });
});

//Добваление и обновление профиля
app.post("/api/profiles", (req, res) => {
  const data = {
    login:req.body.login,
    profileName: req.body.profileName,
    profileSecondName: req.body.profileSecondName,
    passport: req.body.passport,
    urlImagePassport: req.body.urlImagePassport,
  };
  Profile.findOne({ login: req.body.login }, (err, post) => {
    if (post) {
      Profile.findByIdAndUpdate(post.id, data, { upsert: false }).then(
        updated => {
          res.json(updated);
        }
      );
    } else {
      Profile.create(data).then(created => {
        res.json(created);
      });
    }
  });
});



// Delete selected post
app.post("/api/posts/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id).then(post => {
    res.json({ message: "Your post was deleted!" });
  });
});


app.post('/api/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});


app.post('/api/register', function(req, res) {
  const data = {
    login:req.body.username
  };
  Profile.create(data)
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

app.post('/api/login', function(req, res) {
  
  CurUser=req.body.username;
  
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});




app.listen(3333, () => console.log("Server is running on port 3333"));
