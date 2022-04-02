const path = require('path')


const fs = require('fs')
const gm = require('gm').subClass({imageMagick: true});

const img = path.join(__dirname, 'w3.jpeg')
const target = path.join(__dirname, 'w3-ppp.jpeg')
gm(img)
.resize(750)
.quality(20)
.write(target, function (err) {
  if (!err) console.log('done');
});