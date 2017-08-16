import gulp from 'gulp';
import scss from 'gulp-sass';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import flexfixes from 'postcss-flexbugs-fixes';
import autoprefixer from 'gulp-autoprefixer';
import stripCssComments from 'gulp-strip-css-comments';
import errorHandler from '../utils/errorHandler';
import paths from '../paths';
import { browsers } from '../../browsers.json';
import glob from 'gulp-sass-glob';
import cleanCSS from 'gulp-clean-css';

gulp.task('scss', () => {
  return gulp.src(`${paths.src.styles}/index.scss`)
    .pipe(plumber({
      errorHandler
    }))
    .pipe(glob())
    .pipe(scss()
      .on('error', scss.logError))
    .pipe(stripCssComments())
    .pipe(autoprefixer({
      browsers: [
        `Android >= ${browsers.android}`,
        `Chrome >= ${browsers.chrome}`,
        `Firefox >= ${browsers.firefox}`,
        `Explorer >= ${browsers.ie}`,
        `iOS >= ${browsers.ios}`,
        `Opera >= ${browsers.opera}`,
        `Safari >= ${browsers.safari}`
      ],
      cascade: false
    }))
    .pipe(postcss([
      flexfixes()
    ]))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist.styles))
});