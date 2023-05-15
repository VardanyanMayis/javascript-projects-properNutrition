'use strict';
let path = require('path');
module.exports = {
	mode: 'development',
	entry: './js/main.js',
	output: {
		filename: 'dist/bundle.js',
		path: __dirname + '/js'
	},
	watch: true,
	devtool: 'source-map',
	module: {},
};
