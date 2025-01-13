const gulp          = require('gulp');
const babel         = require('gulp-babel');
const uglify        = require('gulp-uglify');
const rename        = require('gulp-rename');
const sass          = require('gulp-sass')(require('sass'));
const cssnano       = require('gulp-cssnano');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();

function css () {    
    return gulp.src('src/app/sass/style.scss')
        .pipe(sass.sync().on('error', sass.logError))   
        .pipe(cssnano())       
        .pipe(gulp.dest('src/dist/css'))
        .pipe(browserSync.stream());
};

function js () {
    return gulp.src(['src/app/js/plugins/*.js', 'src/app/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('src/dist/js'));
};

exports.buildcss = css;
exports.buildjs = js;
exports.watch = function () {
    gulp.watch('src/app/sass/*.scss', css);
    gulp.watch(['src/app/js/plugins/*.js', 'src/app/js/*.js'], js);
}

// gulp.task('default', function(done) {

//     // browserSync.init({
//     //     server: {
//     //         baseDir: "./"
//     //     }
//     // });
//     gulp.task('sass');
//     gulp.task('js');
//     done();
    
//     // gulp.watch(['src/app/sass/*.scss', 'src/app/js/plugins/*.js', 'src/app/js/*.js'], function(path) {
//     //     gulp.task('sass');
//     //     gulp.task('js');
//     // });
//     // gulp.watch(['src/content/*.html', 'src/dist/js/*.js']).on('change', browserSync.reload);

// });