const fs = require("fs")
const path = require('path');

let arr = []

function check(dirPath) {
  const dir = dirPath
  const directoryPath = path.join(__dirname, dir);

  return new Promise((res, rej) => {
    if (fs.existsSync(directoryPath)) {
      let files = fs.readdirSync(directoryPath)

      files.forEach(file => {
        let fileStat = fs.statSync(directoryPath + "/" + file).isDirectory()
        if (!fileStat) {
          arr.push(directoryPath + "/" + file)
        } else {
          res(checkDir(dir + "/" + file.toString()))
        }
      })
    }
  })

}

check("root")
  .then(() => {
    console.log(arr)
  })

setTimeout(() => {
  console.log(arr)
}, 100)