const fs = require("fs")
const path = require('path');

const arr = []

function checkDir(dirPath) {
  const dir = dirPath
  const directoryPath = path.join(__dirname, dir);

  return new Promise((res, rej) => {
    if (fs.existsSync(directoryPath)) {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          rej('Unable to scan directory: ' + err)
        }
        files.forEach(function (file) {
          if (file.substring(file.length - 3, file.length) === "txt") {
            res(arr.push(directoryPath + "/" + file))
          } else {
            res(checkDir(dir + "/" + file.toString()))
          }
        });
      })
    } else {
      return res()
    }
  })

}

checkDir("root")
  .then((res) => {
    // console.log(arr)
  })
  .catch((err) => {
    console.log(err)
  })
setTimeout(() => {
  console.log(arr)
}, 500)

