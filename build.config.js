/**
 * @fileOverview 项目构建配置
 * @author sizhao | 870301137@qq.com
 * @version 1.0.0 | 2018-06-27 | sizhao        // 初始版本
*/

module.exports = {
  alias: {
    // 配置插件开发需要的模块别名
    plugin: {
      component: 'src/components',
      config: 'src/config/index.js',
      service: 'src/services'
    },
    // 配置 examples 中需要的模块别名
    examples: {
      config: 'examples/config/index.js'
    }
  }
}
