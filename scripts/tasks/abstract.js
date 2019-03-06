/**
 * @fileOverview Gulp abstract tasks for the Pandora boilerplate of wechat plugin
 * @author sizhao | 870301137@qq.com
 * @version 1.0.0 | 2019-03-06 | sizhao  // 初始版本
*/

const imagemin = require('gulp-imagemin')

const buildConfig = require('../../build.config')
const alias = require('../gulp-plugin-alias')
const npm = require('../gulp-plugin-npm')
const wxss = require('../gulp-plugin-wxss')

module.exports = {
  // 构建 less
  'build:less': (gulp, src, dest) => {
    const name = `${src}:build:less`
    const srcPattern = `${src}/**/*.less`

    gulp.task(name, (done) => {
      gulp.src(srcPattern, { base: src })
        .pipe(wxss())
        .pipe(gulp.dest(dest))

      done()
    })

    return {
      name,
      src: srcPattern,
      watch: true
    }
  },

  // 编译 js, 进行别名和 npm 依赖处理
  'build:js': (gulp, src, dest) => {
    const name = `${src}:build:js:alias`
    const srcPattern = `${src}/**/*.js`

    gulp.task(name, (done) => {
      gulp.src(srcPattern, { base: src })
        .pipe(alias(buildConfig.alias[src]))
        .pipe(npm({
          dest
        }))
        .pipe(gulp.dest(dest))

      done()
    })

    return {
      name,
      src: srcPattern,
      watch: true
    }
  },

  // 复制
  'copy': (gulp, src, dest) => {
    const name = `${src}:copy`
    const srcPattern = `${src}/**/*.@(wxml|wxss|json|wxs)`

    gulp.task(name, (done) => {
      gulp.src(srcPattern, { base: src })
        .pipe(gulp.dest(dest))

      done()
    })

    return {
      name,
      src: srcPattern,
      watch: true
    }
  },

  // 图片压缩
  'compress:image': (gulp, src, dest) => {
    const name = `${src}:compress:image`
    const srcPattern = `${src}/**/*.@(png|jpg|gif)`

    gulp.task(name, (done) => {
      gulp.src(srcPattern, { base: src })
        .pipe(imagemin())
        .pipe(gulp.dest(dest))

      done()
    })

    return {
      name,
      src: srcPattern,
      watch: true
    }
  }
}
