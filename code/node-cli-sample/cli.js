#!/usr/bin/env node

// Node CLi应用入口文件必须要有这样的文件头
// 如果是Linux或者macOS系统下还需要修改此文件的读写权限为755
// 具体就是通过 chmod 755 cli.js 实现修改

// 脚手架的工作过程：
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?'
  }
]).then(answers => {
  // console.log(answers)
  // 根据用户回答的结果生成文件

  // 模板目录
  const tmplDir = path.join(__dirname, 'templates')
  // 目标目录
  const destDir = process.cwd()

  // 将模板目录下的文件全部输出到目标目录
  fs.readdir(tmplDir, (err, files) => {
    if(err) throw err
    files.forEach(file => {
      // 通过模板引擎渲染文件
      ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
        if(err) throw err
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})