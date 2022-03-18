const Jimp = require('jimp')

const resizing = async(req, res, next) => {
  const { path: tmpDir } = req.file
  console.log(tmpDir)

  Jimp.read(tmpDir)
    .then(image => {
      return image
        .resize(250, 250) // resize
        .write(tmpDir) // save
    })
    .then(() => {
      next()
    })
    .catch(error => {
      next(error)
    })
}

module.exports = resizing
