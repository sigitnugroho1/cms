var express = require('express');
var router = new express.Router();
var bcrypt = require('bcrypt');
var config = require('../config/config');
var helpers = require('../helpers/util');
var jwt = require('jsonwebtoken')
const User = require('../models/user')



// /* GET users listing. */
// pake promise
router.get('/', (req, res) => {
  User.find().then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).send(err)
  })
})



router.post('/register', (req, res) => {
  if (req.body.password == req.body.retypepassword) {

    // hash user password before saving into database
    let hash = bcrypt.hashSync(req.body.password, 7);
    let hash2 = bcrypt.hashSync(req.body.retypepassword, 7);

    let user = new User({
      email: req.body.email,
      password: hash,
      retypepassword: hash2
    })
    user.save().then(users => {
      let token = helpers.token(users.email, users.password, config.secret, 86400)
      res.json({
        data: {
          email: users.email
        },
        token: token
      })
    }).catch(err => {
      res.json({
        error: true,
        message: err.message
      })
    })
  } else {
    res.json({
      error: true,
      message: 'password and retypepassword are not match'
    })
  }
})



router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then(user => {
      // console.log('=========', user);
      if (!user) {
        res.json({ error: true, message: "Email Not Found" })
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign({ email: user.email }, config.secret, { expiresIn: 86400 });
          user.token = token
          user.save(err => {
            res.json({
              data: {
                email: user.email
              },
              token: token
            })
          })
        } else {
          res.json({
            error: true,
            message: 'Password Invalid'
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    }
    )
})



router.post('/check', (req, res) => {
  var token = req.body.token || req.query.token || req.header['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) res.json({ valid: false })
      else {
        User.findOne({
          email: decoded.email,
          token: token
        }, (err, user) => {
          if (user) {
            res.json({ valid: true })
          } else {
            res.json({ valid: false })
          }
        })
      }
    })
  }
})


router.get('/destroy', (req, res, next) => {
  User.findOne({ email: req.query.email }, (err, user) => {
    User.updateOne({ email: req.query.email }, { $set: { token: null } }, (err) => {
      if (err) return res.send(err);
      res.status(201).json({
        logout: true
      })
    })
  })
})





// router.delete('/:id', (req, res) => {
//   User.findByIdAndRemove(req.params.id, (err, data) => {
//     if (err) return res.status(500).send(err)
//     return res.status(200).json(data)
//   })
// })


// router.post('/', (req, res) => {
//   let user = new User({
//     email: req.body.email,
//     password: req.body.password,
//     retypepassword: req.body.retypepassword
//   })
//   user.save((err, data) => {
//     if (err) return res.status(500).send(err)
//     return res.status(200).json(data)
//   })
// })


module.exports = router;

