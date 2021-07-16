module.exports = function (grunt) {
    var path = {
        src: 'test',
        js: 'js',
        dest: 'dist',
    }

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: path,
        clean: {//清空生产文件夹
            beforebuild: {
                files: [
                    {
                        src: ['<%= path.dest %>/']
                    }
                ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js_source/script.js'],
                dest: 'js/libs.js'
            },
            test: {
                src: ['js_source/test*.js'],
                dest: 'js/test.js'
            },
            /*css:{
              src:['css/style.css'],
            dest:'css/style.min.js'
            }*/
        },
        uglify: {
            options: {},
            build: {
                src: 'js/libs.js',
                dest: 'js/libs.min.js'
            }
        },
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'less',
                    src: ['style.less'],
                    dest: 'css',
                    ext: '.css'
                }],
            }
        },
        cssmin: {
            css: {
                src: 'css/style.css',
                dest: 'css/style.min.css'
            }
        },
        watch: {
            scripts: {
                files: ['less/style.less', 'js_source/*.js'],
                tasks: ['task'],
                options: {
                    spawn: false,
                },
            },
        },
        // 自动雪碧图
        sprite: {
            options: {
                // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                imagepath: 'sprite/',
                // 映射CSS中背景路径，支持函数和数组，默认为 null
                imagepath_map: null,
                // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                spritedest: 'images/',
                // 替换后的背景路径，默认 ../images/
                spritepath: '../images/',
                // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                padding: 2,
                // 是否使用 image-set 作为2x图片实现，默认不使用
                useimageset: false,
                // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                newsprite: false,
                // 给雪碧图追加时间戳，默认不追加
                spritestamp: true,
                // 在CSS文件末尾追加时间戳，默认不追加
                cssstamp: true,
                // 默认使用二叉树最优排列算法
                algorithm: 'binary-tree',
                // 默认使用`pixelsmith`图像处理引擎
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: 'less/',
                    // 匹配规则
                    src: 'icon.css',
                    // 导出css和sprite的路径地址
                    dest: 'less/',
                    // 导出的css名
                    ext: '.sprite.css'
                }]
            }
        },
        filerev: {//对css和js文件重命名
            build: {
                files: [
                    {
                        src: [
                            '<%= path.js %>/**',
                            // '<%= path.dest %>/**',
                            // '!<%= path.dest %>/page/*.html',//html文件不加版本号
                            // '!<%= path.dest %>/**/*.{png,jpg,jpeg}'//图片   不需要加版本号
                        ]
                    }
                ]
            }
        },

    });
    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css-sprite');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');
    // 默认任务
    grunt.registerTask('task', ['concat', 'uglify', 'less', 'cssmin']);
    grunt.registerTask('task2', ['concat:test', 'filerev']);
    grunt.registerTask('default', ['sprite', 'task', 'watch']);

}
