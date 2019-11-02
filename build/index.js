// 生成对应环境的配置文件
let path = require('path')
let fs = require('fs')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

function copyIt(from, to) {
  fs.writeFileSync(to, fs.readFileSync(from));
}

copyIt(resolve('./package.json'),resolve('./dist/package.json'));
copyIt(resolve('./package-lock.json'),resolve('./dist/package-lock.json'));
copyIt(resolve('./start.json'),resolve('./dist/start.json'));
