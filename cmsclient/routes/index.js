var express = require('express');
var router = express.Router();
var passport = require('passport');
var superagent = require('superagent');
var helpers = require('../helpers/util')
var moment = require('moment')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('dashboard');
});


router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/home',                       // redirect to the secure admin section
  failureRedirect: '/login',                      // redirect back to the signup page if there is an error
  failureFlash: true                              // allow flash messages
}))


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',                       // redirect ke  secure admin section
  failureRedirect: '/login',                      // redirect ke signup page jika terjadi kesalahan
  failureFlash: true                              // allow flash messages
}))


router.get('/home', helpers.isLoggedIn, (req, res) => {
  // console.log(req.user);
  res.render('home', {
    data: req.user, nav: 1
  })
})

router.get('/data', helpers.isLoggedIn, (req, res) => {
  res.render('data', {
    data: req.user, nav: 2
  })
})

router.get('/datadate', helpers.isLoggedIn, (req, res) => {
  res.render('datadate', {
    data: req.user, nav: 3,
    moment
  })
})

router.get('/dmap', helpers.isLoggedIn, (req, res) => {
  res.render('dmap', {
    data: req.user, nav: 4
  })
})

router.get('/line', (req, res) => {
  res.render('line', {
    data: req.user,
    moment
  })
})


router.get('/pie', (req, res) => {
  res.render('pie', {
    data: req.user
  });
})


router.get('/bar', (req, res) => {
  res.render('bar', {
    data: req.user
  })
})

router.get('/mapsview', (req, res) => {
  res.render('mapsview', {
    data: req.user
  })
})

router.get('/logout', (req, res) => {
  res.render('dashboard');
})




module.exports = router;
