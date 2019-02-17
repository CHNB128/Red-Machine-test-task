function getRandomLengthString (length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

function getRandomInRange (min, max) {
  return Math.random() * (max - min) + min
}

module.exports = {
  getRandomLengthString,
  getRandomInRange
}