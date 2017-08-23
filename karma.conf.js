'use strict';

// Real "fake" backend
const Mockserver = require('./mockserver');

// Close it on exit ;)
process.on('exit', Mockserver.stop);

module.exports = function(config) {

    config.set({
        basePath: '',
        frameworks: [
            'mocha',
            'chai'
        ],
        plugins: [
            'karma-mocha',
            'karma-mocha-reporter',
            // 'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-chai'
        ],
        files: [
            // 'node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
            // 'node_modules/babel-polyfill/dist/polyfill.js',
            'dist/cjs.js',
            'test/**/*.js'
        ],
        riotPreprocessor: {
            options: {
                type: 'es6'
            }
        },
        // browsers: ['PhantomJS'],
        browsers: ['Firefox'],
        reporters: ['mocha'],
        failOnEmptyTestSuite: false,
        autoWatch: true
    });

};
