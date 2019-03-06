/**
 * @fileOverview 自定义命令
 * @author sizhao | 870301137@qq.com
 * @version 1.0.0 | 2018-08-01 | sizhao  // 初始版本
*/

// 自定义命令行输入提示
module.exports = {
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Please input name'
    }
  ],
  action ({ cmds, argvs }) {

  }
}

/* 
module.exports = function ({ cmds, argvs }) {
  
} */