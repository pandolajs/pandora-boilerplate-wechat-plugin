/**
 * @fileOverview Gulp concrete tasks for boilerplate of wechat plugin
 * @author sizhao | 870301137@qq.com
 * @version 1.0.0 | 2019-03-06 | sizhao  // 初始版本
*/

const del = require('del')

const yaml = require('../gulp-plugin-yaml')
const font = require('../gulp-plugin-font')

module.exports = {
  // 清除 dest 目录
  'dist/**': (gulp, src) => {
    gulp.task('clean', (done) => {
      del.sync(src)
      done()
    })

    return {
      name: 'clean',
      watch: false
    }
  },

  // 构建配置, | 之后用来指定第三个参是数组还是字符串，可选 a 或者 plugin | examples, 默认 s
  'config/app.yaml|a': (gulp, src, dest = [], ...args) => {
    const name = `build:config`
    gulp.task(name, (done) => {
      const stream = gulp.src(src)
        .pipe(yaml(...args))

      dest.reduce((stream, adest) => {
        return stream.pipe(gulp.dest(adest.dest))
      }, stream)

      done()
    })

    return {
      name,
      src,
      watch: true
    }
  },

  // font 配置
  'icons/*.svg|examples': (gulp, src, dest) => {
    const name = 'build:font'

    gulp.task(name, ['examples:copy', 'examples:build:less'], (done) => {
      gulp.src(src, { buffer: false })
        .pipe(font({
          fontName: 'icon-font',
          dest: dest
        }))

      done()
    })

    return {
      name,
      src,
      watch: true
    }
  }
}
