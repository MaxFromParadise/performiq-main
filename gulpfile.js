import { dest, parallel, src, watch } from 'gulp';
// const del = require('delete');
import browserSync from 'browser-sync';
const bs = browserSync.create();

import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-dart-sass';
import gcmq from 'gulp-group-css-media-queries';

import fileinclude from 'gulp-file-include';

function buildStyles() {
	return src('src/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(
			autoprefixer({
				// cascade: false,

				overrideBrowserslist: ['last 8 versions'],
				browsers: [
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24',
					'Explorer >= 11',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6',
				],
			})
		)
		.pipe(gcmq())
		.pipe(dest('dist/styles'))
		.pipe(bs.stream());
}
function pipeHTML() {
	return src(['src/**/*.html', '!src/components/**/*.html'])
		.pipe(fileinclude())
		.pipe(dest('dist/'))
		.pipe(bs.stream());
}
function pipeJS() {
	return src('src/**/*.js').pipe(dest('dist/')).pipe(bs.stream());
}
function pipeIMG() {
	return src('src/img/**/*', { encoding: false })
		.pipe(dest('dist/img/'))
		.pipe(bs.stream());
}
function pipeFonts() {
	return src('src/fonts/*').pipe(dest('dist/fonts/')).pipe(bs.stream());
}
function startServer() {
	bs.init({
		server: {
			baseDir: 'dist/',
		},
		port: 3001,
	});
}
export default parallel(
	pipeFonts,
	pipeJS,
	buildStyles,
	pipeHTML,
	pipeIMG,
	startServer
);

watch('src/scss/**/*.scss', buildStyles);
watch('src/**/*.html', pipeHTML);
watch('src/**/*.js', pipeJS);
watch('src/img/**/*', pipeIMG);
watch('src/fonts/*', pipeFonts);
