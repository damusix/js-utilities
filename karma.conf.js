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
            'karma-firefox-launcher',
            'karma-chai'
        ],

        files: [

            'node_modules/reqwest/reqwest.js',
            'node_modules/js-cookie/src/js.cookie.js',
            'dist/js-utilities.umd.js',
            'test/**/*.js'
        ],

        riotPreprocessor: {

            options: {

                type: 'es6'
            }
        },

        browsers: ['Firefox'],
        reporters: ['mocha'],
        failOnEmptyTestSuite: false,
        autoWatch: true
    });

};
