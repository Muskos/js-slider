import browserSync from 'browser-sync';
import gulp from 'gulp';
import gutil from 'gulp-util';

gulp.task('livereload', () => {
  browserSync.init({
    files: [{
      match: ['.'],
      fn: (event, file) => {
        /** Custom event handler **/
      },
      options: {
        ignored: '*.css.map'
      }
    }],
    open: 'local',
    reloadOnRestart: true,
    port: gutil.env.port || 3000,
    server: {
      baseDir: '.',
      index: "index.html",
      directory: false
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
    tunnel: !!gutil.env.tunnel
  })
});