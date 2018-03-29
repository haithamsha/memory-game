
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-babel-minify');

// Sass to css 
gulp.task('sass', function () {
    return gulp.src('./lib/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./'));
});

// using babel to combile es6 to es5
gulp.task('babel', function () {
   return gulp.src('./lib/**/*.js')
   .pipe(babel({
       presets:['env']
   }))
   .pipe(rename({ suffix: '.min' }))
       .pipe(gulp.dest('./'));
});

// minify js with babel minify
gulp.task("minify",function(){
    gulp.src("./lib/**/*.js")
        .pipe(minify({
            mangle: {
                keepClassName: true
            }
        }))
        .pipe(gulp.dest("./"));
});
// Compress images
gulp.task('img', function(){
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
});

// watch files
gulp.task('watch',function(){
    gulp.watch('./lib/**/*.scss',['sass']);
    gulp.watch('./lib/**/*.js', ['babel']);
    gulp.watch('./lib/**/*.js', ['minify']);
    gulp.watch('./images/**/*', ['img']);
});

gulp.task('default', ['sass', 'watch', 'babel', 'img','minify'] );