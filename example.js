var generateAddress = require('./index.js')

var target = process.argv[2]

if (target) {
  generateAddress.startingWith(target)
} else {
  console.log('please enter a target')
}


