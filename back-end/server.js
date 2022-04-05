const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/landscaping', {
    useNewUrlParser: true
});

// Create a scheme for items needed for the landscaping products or services
const itemSchema = new mongoose.Schema({
    description: String,
    title: String,
    price: String,
    path: String,
});

// Create a model for items in the product/service library
const Item = mongoose.model('Item', itemSchema);

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});

// Get a list of all of the items in the product/service library
app.get('/api/items', async (req, res) => {
    try {
        let items = await Item.find();
        res.status(200).send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
    const item = new Item({
        description: req.body.description,
        title: req.body.title,
        price: req.body.price,
        path: req.body.path,
    });
    try {
        await item.save();
        res.status(200).send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

//Deletes an Item from the Database, which in return will update the front side of the non admin page
app.delete('/api/items/:id', async (req, res) => {
    console.log("Deleted", req.params.id)
    try {
        await Item.deleteOne({
            _id: req.params.id
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.put('/api/items/:id', async (req, res) => {
    const idNumber = req.params.id;
    const idQuery = {
        '_id': idNumber
    }
    try {
        await Item.findByIdAndUpdate(idQuery, req.body);
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.listen(3001, () => console.log('Server listening on port 3001!'));