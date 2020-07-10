const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  let config = {
    // default config
    build: {
      src: 'src',
      gruntdist: 'gruntdist',
      temp: 'temp',
      public: 'public',
      paths: {
        styles: '/assets/styles/*.scss',
        scripts: '/assets/scripts/*.js',
        pages: '/*.html',
        images: '/assets/images/**',
        fonts: '/assets/fonts/**'
      }
    }
  }
  
  try {
    const loadConfig = require(`${cwd}/pages.config.js`)
    config = Object.assign({}, config, loadConfig)
  } catch (error) {}
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'gruntdist/assets/styles/main.scss': 'src/assets/styles/main.scss'
        }
      }
    },
    babel: {
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: true,
      },
      main: {
        files: {
          'gruntdist/assets/scripts/main.js': 'src/assets/scripts/main.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass']
      }
    }
  })

  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt)// 自动加载所有的 grunt 插件中的任务

  grunt.registerTask('build', ['sass', 'babel', 'watch'])
}