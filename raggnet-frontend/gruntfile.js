module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            minify: {
                options: {
                    reserveDOMProperties: true,
                },
                files: [
                {
                    expand: true,
                    cwd: 'app/js',
                    src: '**/*.js',
                    dest: 'public/js',
                    ext: '.min.js'
                },
                
                {
                   expand: true,
                   cwd: 'app/stylesheets',
                   src: '**/*.css',
                   dest: 'public/stylesheets',
                   ext: '.min.css' 
                }]
            }
        },

        watch: {
            css: {
                files: ['gruntfile.js', 'app/stylesheets/*'],
                options: { livereload: 10000 }
            },
            js: {
                files: ['gruntfile.js', 'app/js/*'],
                tasks: ['uglify'],
                options: { livereload: 10000 }
            },
            html: {
                files: ['app/views/*'],
                tasks: [],
                options: { livereload: 10000 }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify', 'watch']);
    grunt.registerTask('publish', ['uglify']);
};
