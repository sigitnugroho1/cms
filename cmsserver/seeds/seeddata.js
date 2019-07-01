const mongoose = require('mongoose');
let fs = require('fs');
let Datadate = require('../models/datadate');
let path = require('path')

mongoose.connect('mongodb://localhost:27017/cms', {
    useNewUrlParser: true,
    useCreateIndex: true
})


var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data.json')));
console.log(data);



var done = 0;
for (let i = 0; i < data.length; i++) {
    // console.log(data);

    Datadate.insertMany(data[i]).then(data => {
        done++;

        if (done === data.length) {
            exit();
        }
    }).catch(err => {
        console.log(err);
    })
}


function exit() {
    mongoose.disconnect();
}
