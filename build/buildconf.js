// 生成对应环境的配置文件
let path = require('path')
let fs = require('fs')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


function copyFile (sourceFile, destFile) {
  var data = fs.readFileSync(sourceFile)
  fs.writeFileSync(destFile, data)
}

let configFile = resolve('build/app.pro.js')
if (process.env.NODE_ENV === 'development') {
  configFile = resolve('build/app.dev.js')
} else if (process.env.NODE_ENV === 'pro') {
  configFile = resolve('build/app.pro.js')
}

let sourceFile = configFile
let destFile = resolve('src/api.js')

copyFile(sourceFile, destFile)
