/**
 * @fileOverview 项目构建脚本
 * @author sizhao | 870301137@qq.com
 * @version 1.0.0 | 2018-06-13 | sizhao      // 初始版本
 * @version 1.1.0 | 2019-02-21 | sizhao      // 重写 gulp watch 方法，修复不监听新增文件的问题
*/

const gulp = require('gulp')
const chalk = require('chalk')
const watch = require('glob-watcher')
const log = require('fancy-log')

const TaskBuilder = require('./TaskBuilder')

const env = process.env.NODE_ENV || 'development'

// 重写 watch 方法
gulp.watch = (patterns, tasks = []) => {
  return watch(patterns, (done) => {
    tasks.forEach((name) => {
      const task = gulp.tasks[name]

      if (task) {
        gulp.start(name)
      } else {
        log(`${task} is not defined`)
      }
    })
    done()
  })
}

const tbuilder = new TaskBuilder(gulp, {
  patterns: {
    src: 'dist/plugin',
    examples: 'dist/examples'
  },
  env
})

const tasks = tbuilder.build()

gulp.task('default', tasks, () => {
  log('build successfully.')
  log('开始监听文件.')
})
