const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');

gulp.task('sass', function() {    
    return gulp.src('src/app/sass/style.scss')       
        .pipe(sass())       
        .pipe(cssnano())       
        .pipe(gulp.dest('src/dist/css')); 
});

gulp.task('js', function() {
    return gulp.src(['src/app/js/plugins/*.js', 'src/app/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('src/dist/js'));
});

gulp.task('default', function(done) {
    gulp.task('sass');
    gulp.task('js');
    done();
});