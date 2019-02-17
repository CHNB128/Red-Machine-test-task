const redis = require('redis')
const process = require('process')
const { getRandomLengthString, getRandomInRange } = require('./utils')

const client = redis.createClient()
let isRecipient = true
// Set error to log
client.on('error', (err) => console.error(new Date(), err))

// process getErrors flag
if (process.argv.slice(2).includes('getErrors')) {
  client.llen('broken messages', (err, len) => {
    if (err) throw err

    client.lrange('broken messages', 0, len, (err, res) => {
      if (err) throw err

      res.forEach(element => {
        console.log(element)
      })
    })

    client.del('broken messages', (err) => { if (err) throw err })

    client.quit()
    process.exit()
  })
}

function checkSernder () {
  client.watch('is sender exists', err => {
    if (err) throw err

    client.get('is sender exists', (err, res) => {
      if (err) throw err

      if (res === null) {
        client.multi()
          .set('is sender exists', true, 'EX', 1)
          .exec((err, res) => {
            if (err) throw err
            if (res !== null && res[0] === 'OK') {
              isRecipient = false
              console.log('begin sender')

              setInterval(() => {
                let message = getRandomLengthString(getRandomInRange(80, 100))

                console.log('send message:', message)
                client.set('message', message)

                client.set('is sender exists', true, 'EX', 1)
              }, 500)

            }
          })
      }
    })
  })
}

function acceptMessage () {
  client.watch('message', err => {
    if (err) throw err

    client.get('message', (err, message) => {
      if (err) throw err

      if (message !== null) {

        if (Math.random() <= 0.05) {
          client.lpush('broken messages', message)
          console.log(new Date(), 'broken messages', message)
        }

        client.multi()
          .del('message')
          .exec((err, res) => {
            if (err) throw err
            if (!res === null) console.log('message processed:', message)
          })
      }
    })

  })
}

setInterval(() => {
  if (isRecipient) acceptMessage()
  checkSernder()
}, 500)
