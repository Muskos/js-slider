import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => {
  runSequence(
    [
      'scss',
      'scripts:compile'
    ],
    'livereload',
    'watch'
  );
});