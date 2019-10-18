const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const gulpConnect = require('gulp-connect');


gulp.task('default',()=>{
  gulpConnect.server({
    root: './',
    livereload: true,
    port: 2999
  });

  gulpWatch('./index.html', ()=> {
    gulp.src('./index.html')
      .pipe(gulpConnect.reload());
  });

});