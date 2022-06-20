const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const sass = require('sass');
const gulpSass = require('gulp-sass');
const mainSass = gulpSass(sass);
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
  return del(['dist'])
}

const font = () => {
  return src('src/fonts/*{woff,woff2}')
      .pipe(dest('dist/fonts'))
}

const styles = () => {
  return src('src/css/**/*.scss')
      .pipe(mainSass())
      .pipe(concat('main.css'))
      .pipe(autoprefixes({
        cascade: false
    }))
      .pipe(cleanCSS({
        level: 2
    }))
      .pipe(dest('dist/css'))
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

const scripts = () => {
  return src([
      'src/js/**/*.js'
  ])
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify({
      toplevel: true
  }).on('error', notify.onError()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
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
watch('src/css/**/*.scss', styles)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)

exports.font = font
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, font, htmlMinify, scripts, styles, images, svgSprites, watchFiles)
