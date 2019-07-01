var express = require('express');
var router = express.Router();
let Data = require('../models/data');




// // =================== SEARCH =================== //
router.post('/search', (req, res, next) => {
    let params = {};
    if (req.body.letter) {
        params.letter = req.body.letter
    }
    if (req.body.frequency) {
        params.frequency = req.body.frequency
    }
    console.log(Data);

    Data.find(params).then(data1 => {
        let data = [];
        data1.forEach(item => {

            data.push({
                _id: item._id,
                letter: item.letter,
                frequency: item.frequency
            })
        })
        res.json(data);
    })
})



// =================== READ =================== 
router.get('/', (req, res) => {
    Data.find().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        if (err) return res.status(500).send('There was problem getting Data!');
    })
})



// =================== ADD =================== //
router.post('/', (req, res) => {
    let data = new Data({
        letter: req.body.letter,
        frequency: req.body.frequency
    })

    data.save().then(data1 => {
        res.json({
            success: true,
            message: "data have been added",
            data: {
                _id: data1.id,
                letter: data1.letter,
                frequency: data1.frequency
            }
        })
    }).catch(err => {
        if (err) return res.status(500).send('There was problem adding Data!');
    })
})



// =================== EDIT =================== //

router.put('/:id', function (req, res, next) {
    let id = req.params.id;

    Data.findByIdAndUpdate(id, {
        letter: req.body.letter,
        frequency: req.body.frequency
    }, { new: true }).then(data => {
        if (!data) {
            res.json({
                success: false,
                message: `updating data have been failed id : ${id} not found`,
                data: {
                    _id: null,
                    letter: null,
                    frequency: null
                }
            })
        } else {
            res.json({
                success: true,
                message: "data have been updated",
                data: {
                    _id: data._id,
                    letter: data.letter,
                    frequency: data.frequency
                }
            })
        }
    }).catch(err => {
        if (err) return res.status(500).send('There was problem updating Data!');
    })
})



// =================== DELETE =================== //
router.delete('/:id', (req, res, next) => {

    let id = req.params.id;
    // console.log(req.params.id);

    Data.findByIdAndRemove(id, (err, dataInfo) => {
        // console.log(dataInfo);

        if (err) {
            res.json(err)
        } else {
            res.json({
                status: 'success',
                message: "data have been deleted",
                data: {
                    _id: dataInfo.id,
                    letter: dataInfo.letter,
                    frequency: dataInfo.frequency
                }
            })
        }
    })
})

// router.delete('/:id', (req, res) => {
//   User.findByIdAndRemove(req.params.id, (err, data) => {
//     if (err) return res.status(500).send(err)
//     return res.status(200).json(data)
//   })
// })


// =================== FIND =================== //
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Data.findOne({ _id: id }).then(data => {
        res.status(200).send({
            success: true,
            message: 'data found',
            data: {
                _id: data._id,
                letter: data.letter,
                frequency: data.frequency
            }
        })
    }).catch(err => {
        res.status(500).send('There was problem finding Data!');
    })
})




module.exports = router;
