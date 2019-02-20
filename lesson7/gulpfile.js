let gulp            = require('gulp'),
    minifyJS        = require('gulp-terser'),
    autoPrefixer    = require('gulp-autoprefixer'),
    bs              = require('browser-sync'),
    htmlMin         = require('gulp-htmlmin'),
    rename          = require('gulp-rename'),
    delFiles        = require('del'),
    cssMinify       = require('gulp-csso'),
    babel           = require('gulp-babel');
    

gulp.task('test', () => {
    return console.log('It works!')
})

gulp.task('html', ()=> {
    return gulp.src('app/html/**/*.html')
            .pipe(htmlMin({
                  collapseWhitespace:true
            }))
            .pipe(gulp.dest('prod'));
})

gulp.task('cssmin', () =>{
    return gulp.src('app/css/*.css')
    .pipe(autoPrefixer())
    .pipe(cssMinify())
    .pipe(gulp.dest('prod'))
})

gulp.task('jsmin', () => {
    return gulp.src('app/js/**/*.js')
            .pipe(minifyJS())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('prod/js'))
})

gulp.task('server', ()=>{
    return bs({
        server: {
            baseDir: 'prod'
        },
        browser: 'chrome'
     })
})

gulp.task('relocate_json', ()=>{
    return gulp.src('app/json/**/*.json')
    .pipe(gulp.dest('prod/json'))
})

gulp.task('clean', () => {
          return delFiles('prod');
          })

gulp.task('js:watch', () => {
    return gulp.watch('app/js/**/*.js', gulp.series('jsmin', (done) => {
        bs.reload();
        done()
    }))
});

gulp.task('default', gulp.series(
            'clean',
            gulp.parallel('html', 'cssmin','jsmin', 'relocate_json'),
            gulp.parallel('js:watch','server')))
