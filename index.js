var crypto = require('crypto')
var ethUtil = require('ethereumjs-util')
var ecdsa = require('secp256k1')

module.exports = generateAddress
generateAddress.startingWith = startingWith


function generateAddress() {

  var privateKey = crypto.randomBytes(32)
  var publicKey = ecdsa.createPublicKey(privateKey)
  var address = ethUtil.pubToAddress(publicKey)

  return {
    privateKey: privateKey,
    publicKey: publicKey,
    address: address,
  }

}

function startingWith(target) {

  var matchingIdentity
  var attempts = 0
  var targetLength = target.length

  console.log('Looking for an address starting with "'+target+'".');

  while (!matchingIdentity) {
    var identity = generateAddress()
    // console.log('comparing:', identity.address.toString('hex').slice(0, targetLength), target)
    if (identity.address.toString('hex').slice(0, targetLength) === target) {
      matchingIdentity = identity
    }
    attempts++
    if (attempts%1000 === 0) {
      console.log('tried', attempts, 'identities.')
    }
  }

  console.log('Found after',attempts,'attempts!');
  console.log('Your Private Key Is:');
  console.log(matchingIdentity.privateKey.toString('hex'));
  console.log('Your Public Key Is:');
  console.log(matchingIdentity.publicKey.toString('hex'));
  console.log('Your Ethereum address is:');
  console.log(matchingIdentity.address.toString('hex'));

  return matchingIdentity

}

