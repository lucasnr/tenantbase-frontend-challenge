const { src, dest, series } = require('gulp'),
	clean = require('gulp-clean'),
	inlineSource = require('gulp-inline-source'),
	htmlReplace = require('gulp-html-replace'),
	concatCss = require('gulp-concat-css'),
	cleanCss = require('gulp-clean-css'),
	htmlmin = require('gulp-htmlmin');

function cleanDist() {
	return src('dist/', { read: false, allowEmpty: true }).pipe(clean());
}

function copyDist() {
	return src('src/**/*').pipe(dest('dist/'));
}

function inlineJs() {
	return src('src/**/*.html').pipe(inlineSource()).pipe(dest('dist/'));
}

function minifyCss() {
	return src('src/assets/css/**/*.css')
		.pipe(concatCss('styles.min.css'))
		.pipe(cleanCss())
		.pipe(dest('dist/assets/css'));
}

function buildHtml() {
	return src('dist/**/*.html')
		.pipe(
			htmlReplace({
				css: 'assets/css/styles.min.css',
			})
		)
		.pipe(dest('dist/'));
}

function minifyHtml() {
	return src('dist/**/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('dist/'));
}

exports.default = series(
	cleanDist,
	copyDist,
	inlineJs,
	minifyCss,
	buildHtml,
	minifyHtml
);
