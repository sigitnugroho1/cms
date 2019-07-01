var express = require('express');
var router = express.Router();
const Maps = require('../models/maps');



// =================== search ================
router.post('/search', (req, res) => {
    let params = {};
    console.log('1====', req.body.title);


    if (req.body.title) {
        params.title = req.body.title
    }
    if (req.body.lat) {
        params.lat = req.body.lat
    }
    if (req.body.lng) {
        params.lng = req.body.lng
    }
    Maps.find(params).then(maps1 => {
        res.json(maps1);
    })
})


// ================= read ==================
router.get('/', (req, res) => {
    Maps.find().then(maps1 => {
        res.json(maps1);
    })
})


// ================= edit ==================
router.put('/:id', (req, res) => {
    let id = req.params.id;

    Maps.findByIdAndUpdate(id, {
        title: req.body.title,
        lat: req.body.lat,
        lng: req.body.lng
    }, { new: true }).then(maps => {
        if (!maps) {
            res.json({
                success: false,
                message: `updating maps has been failed id : ${id} not found`,
                data: {
                    _id: null,
                    title: null,
                    lat: null,
                    lng: null
                }
            })
        } else {
            res.json({
                success: true,
                message: 'data has been updated',
                data: {
                    _id: maps._id,
                    title: maps.title,
                    lat: maps.lat,
                    lng: maps.lng
                }
            })
        }
    }).catch(err => {
        res.json({
            success: false,
            message: 'updating maps has been failed',
            data: {
                _id: null,
                title: null,
                lat: null,
                lng: null
            }
        })
    })
})



// ================= add ===================
router.post('/', (req, res) => {
    let maps = new Maps({
        title: req.body.title,
        lat: req.body.lat,
        lng: req.body.lng
    })
    console.log("=======", req.body.title);

    maps.save().then(maps1 => {
        console.log(maps1);

        res.json({
            success: true,
            message: 'data has been added',
            data: {
                _id: maps1._id,
                title: maps1.title,
                lat: maps1.lat,
                lng: maps1.lng
            }
        })
    }).catch(err => {
        res.json({
            success: false,
            message: 'adding maps have been failed',
            maps: {
                _id: null,
                title: null,
                lat: null,
                lng: null
            }
        })
    })
})



// ============= delete ======================
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Maps.findByIdAndRemove(id).then(maps => {
        if (maps) {
            res.json({
                success: true,
                message: 'data has been deleted',
                data: {
                    _id: maps._id,
                    title: maps.title,
                    lat: maps.lat,
                    lng: maps.lng
                }
            })
        } else {
            res.json({
                success: true,
                message: `deleting maps has been failed id : ${id}`,
                data: {
                    _id: null,
                    title: null,
                    lat: null,
                    lng: null
                }
            })
        }
    }).catch(err => {
        res.json({
            success: false,
            message: 'deleting data have been failed',
            data: {
                _id: null,
                title: null,
                lat: null,
                lng: null
            }
        })
    })
})


// =============== find =================
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Maps.findById(id).then(maps => {
        res.json({
            success: true,
            message: 'data found',
            data: {
                _id: maps._id,
                title: maps.title,
                lat: maps.lat,
                lng: maps.lng
            }
        })
    }).catch(err => {
        res.json({
            success: false,
            message: 'data not found',
            data: {
                _id: null,
                title: null,
                lat: null,
                lng: null
            }
        })
    })
})




module.exports = router;