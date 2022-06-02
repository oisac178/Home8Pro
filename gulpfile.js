const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
  return del(['dist'])
}

function buildStyles() {
  return gulp.src('src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
}

const styles = () => {
  return src('src/css/**/*.css')
      .pipe(concat('main.css'))
      .pipe(autoprefixes({
        cascade: false
    }))
      .pipe(cleanCSS({
        level: 2
    }))
      .pipe(dest('dist'))
      .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.html')
      .pipe( htmlMin({
          collapseWhitespace: true,
      }))
      .pipe(dest('dist'))
      .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
      .pipe(svgSprite({
          mode: {
              stack: {
                  sprite: '../sprite.svg'
              }
          }
      }))
      .pipe(dest('dist/images'))
}

const watchFiles = () => {
  browserSync.init({
      server: {
          baseDir: 'dist'
      }
  })
}

const images = () => {
  return src([
      'src/img/**/*.jpg',
      'src/img/**/*.png',
      'src/img/**/*.jpeg',
      'src/img/*.svg',
  ])
      .pipe(image())
      .pipe(dest('dist/images'))
}


watch('src/**/*.html', htmlMinify)
watch('src/css/**/*.css', styles)
watch('src/img/svg/**/*.svg', svgSprites)

exports.buildStyles = buildStyles
exports.watch = function () {
  gulp.watch('src/css/**/*.scss', ['sass'])
}
exports.styles = styles
exports.htmlMinify = htmlMinify
exports.default = series(clean, buildStyles, htmlMinify, styles, images, svgSprites, watchFiles)
