var express = require('express');
const image = require('../models/image');
var router = express.Router();

router.post('/', (req, res, next) => {

    if (req.body.ImgName && req.body.ImgURL && req.body.ImgDetails) {

        let newImage = new image(req.body);

        newImage.save((err, imageResponse) => {
            if (err) {
                res.send(err);
            }
            res.json(imageResponse);
        });
    }
});


router.get('/', (req, res) => {
    image.find({}, (err, images) => {
        if (err) {
            res.send(err);
        }
        res.json(images);
    })
});


router.get('/pagination', (req, res) => {

    var pageNo = parseInt(req.query.pageNo)
    var size = 3;
    var query = {};

    if(pageNo < 0 || pageNo === 0) {
        response = {
            "error" : true,
            "message" : "invalid page number, should start with 1"
        };
        res.json(response);
    }

    query.skip = size * (pageNo - 1);
    query.limit = size;

    image.count({},function(err,totalCount) {
        if(err) 
        {
            response = {"error" : true,"message" : "Error fetching data"}
        }
        image.find({},{},query,function(err,data) {
            if(err) 
            {
                response = {"error" : true,"message" : "Error fetching data"};
            } 
            else 
            {
                var totalPages = Math.ceil(totalCount / size);
                response = {"error" : false,"message" : data,"pages": totalPages};
            }
            res.json(response);
        });
    })
});


router.get('/show/:id',(req, res) => {
    image.findById(req.params.id, (err, image) => {
        if (err) {
            res.send(err);
        }
        res.json(image);
    })
})


router.get('/name/:ImgName', (req, res) => {
    image.find({ImgName:req.params.ImgName}, (err, images) => {
        if (err) {
            res.send(err);
        }
        res.json(images);
    })
});

router.get('/new', (req, res) => {
    image.find({}, (err, images) => {
        if (err) {
            res.send(err);
        }
        res.json(images);
    })
});



router.put('/:id/edit', function(req, res) {

    if(req.body.ImgDetails && req.body.ImgURL)
    {
        image.findOneAndUpdate({ _id: req.params.id },{ImgDetails:req.body.ImgDetails , ImgURL:req.body.ImgURL}, { new: true }, function(err, imageResponse) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(imageResponse);
            res.json({message: 'image details Updated!'});
        });
    }
});


router.delete('/delete/:id',(req, res) => {

    image.deleteOne({_id: req.params.id},(err)=>{
        if (err) {
            res.send(err);
        }
        res.json({ message: 'successfully deleted image' });
    })

})


module.exports = router;