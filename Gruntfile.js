module.exports = function(grunt) {
    grunt.initConfig({
        atomizer: {
            dev: {
                options: {
                    configFile: './configs/atomizer.js'
                },
                files: [{
                    src: ['./src/**/*.js'],
                    dest: './dist/atomic.css'
                }]
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/MaxMin.js': 'src/MaxMin.js',
                    'dist/PlainSelect.js': 'src/PlainSelect.js',
                    'dist/entry.js': './entry.js',
                    '__tests__/MaxMin.js': 'tests/MaxMin.js'
                }
            }
        },
        webpack: {
            build: {
                entry: "./dist/entry.js",
                output: {
                    path: __dirname,
                    filename: "bundle.js"
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: "style-loader!css-loader" },
                        { test: /\.svg$/, loader: "url-loader?limit=1000" }
                    ]
                }
            },
            test: {
                entry: "./dist/MaxMin.js",
                output: {
                    path: __dirname,
                    filename: "bundle-test.js"
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: "style-loader!css-loader" },
                        { test: /\.svg$/, loader: "url-loader?limit=1000" }
                    ]
                }
            }
        },
        copy: { dev: { files: [
            { expand: true, cwd: 'src/', src: 'rangeslider.css', dest: 'dist/' },
            { expand: true, cwd: 'assets/', src: 'thumb.svg', dest: 'dist/' }
        ]}}
    });
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-atomizer');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['babel', 'webpack']);
};

