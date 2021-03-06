module.exports = function(config) {
    config.set({

        frameworks: ["jasmine", "karma-typescript"],

        files: [
            { pattern: "src/**/*.ts" }
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        reporters: ["dots", "karma-typescript", "coverage"],

        browsers: ["PhantomJS"],

        coverageReporter: {
            type: "lcov",
            dir: "coverage/"
        },

    });
};
