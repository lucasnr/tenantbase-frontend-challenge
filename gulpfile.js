const { src, dest, series, parallel } = require('gulp'),
	clean = require('gulp-clean'),
	htmlmin = require('gulp-htmlmin');

function cleanDist() {
	return src('dist/', { read: false, allowEmpty: true }).pipe(clean());
}

function copyDist() {
	return src('src/**/*').pipe(dest('dist/'));
}

function minifyHtml() {
	return src('dist/**/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('dist/'));
}

exports.default = series(cleanDist, copyDist, parallel(minifyHtml));
