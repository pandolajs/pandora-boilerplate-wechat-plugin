/**
 * @fileOverview gulp task generater
 * @author houquan | houquan@babytree-inc.com
 * @version 1.0.0 | 2019-03-06 | houquan  // 初始版本
*/

const log = require('fancy-log')
const concreteTask = require('./tasks/concrete')
const abstractTask = require('./tasks/abstract')

// gulp 任务构建器
class TaskBuilder {
  constructor (gulp, options = {}) {
    this.gulp = gulp
    const { patterns = { src: 'dist/plugin' }, env = 'development' } = options

    this.env = env

    const patternsArr = []
    Object.keys(patterns).forEach((key) => {
      const pattern = {
        src: key,
        dest: patterns[key]
      }

      patternsArr.push(pattern)
    })

    this.patterns = patternsArr
    this.map = patterns

    this.tasks = []
  }

  _watchHandlerCreator (tasks) {
    return (filePath) => {
      log(`File ${filePath} was modified, ${tasks.join(',')} will run ...`)
    }
  }

  watch (pattern, tasks = []) {
    const { gulp, _watchHandlerCreator: watchCreator, env } = this

    if (env === 'development') {
      gulp.watch(pattern, tasks)
        .on('change', watchCreator(tasks))
    }
  }

  build () {
    const { gulp, patterns, tasks, env, map }  = this

    // 构建具象的 task
    Object.keys(concreteTask).forEach((key) => {
      const [pattern, type = 'plugin'] = key.split('|')
      const buildTask = concreteTask[key]

      const { name, watch, src } = buildTask(gulp, pattern, type === 'a' ? patterns : map[type], env)

      if (watch) {
        this.watch(src, [ name ])
      }

      tasks.push(name)
    })

    // 构建抽象 task
    patterns.forEach(({ src: psrc, dest }) => {
      Object.keys(abstractTask).forEach((taskName) => {
        const buildTask = abstractTask[taskName]
        const { name, watch, src } = buildTask(gulp, psrc, dest)

        if (watch) {
          this.watch(src, [ name ])
        }

        tasks.push(name)
      })
    })

    return tasks
  }
}

module.exports = TaskBuilder
