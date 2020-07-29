import gulp from 'gulp';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';

gulp.task('build',function(){
    return gulp.src('src/js/app.js')
    .pipe(plumber({
        errorHandler:notify.onError("Error:<%=error.message%>")
    }))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('browser-sync',function(){
    return browserSync.init({
        server:{
            baseDir:"./",
            index:"index.html"
        }
    });
});

gulp.task('bs-reload',function(){
    return browserSync.reload();
});

gulp.task('eslint', function() {
    return gulp.src(['src/**/*.json'])
      .pipe(plumber({
        errorHandler: function(error) {
          const taskName = 'eslint';
          const title = '[task]' + taskName + ' ' + error.plugin;
          const errorMsg = 'error: ' + error.message;
          console.error(title + '\n' + errorMsg);
          notify.onError({
            title: title,
            message: errorMsg,
            time: 3000
          });
        }
      }))
      .pipe(eslint({ useEslintrc: true }))
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(plumber.stop());
  });

gulp.task('default',gulp.parallel('eslint','build','browser-sync',function(){
    gulp.watch('./src/**/*.js',gulp.task('build'));
    gulp.watch("./*.html",gulp.task('bs-reload'));
    gulp.watch("./dist/**/*.+(js|css)",gulp.task('bs-reload'));
    gulp.watch("./src/**/*.js",gulp.task('eslint'));
}));