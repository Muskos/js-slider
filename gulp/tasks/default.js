import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => {
  runSequence(
    [
      'png-sprite',
      'svg-sprite',
      'scss',
      'scripts:compile',
      'images',
      'favicon'
    ],
    'livereload',
    'watch'
  );
});