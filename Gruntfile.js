module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// this minifies /style.css in your root folder
		// "sass" always has to be run before "cssmin"
		cssmin: {
			dynamic: {
				files: [
		        {
					expand: true,     // Enable dynamic expansion.
					cwd: 'src/',      // Src matches are relative to this path.
					src: ['**/*.css'], // Actual pattern(s) to match.
					dest: 'production/',   // Destination path prefix.
					ext: '.min.css',   // Dest filepaths will have this extension.
		        },
		      ]
			}
		},
		// minifies the main.js file located in /assets/js
		uglify: {
			dynamic: {
				files: [
		        {
					expand: true,     // Enable dynamic expansion.
					cwd: 'src/',      // Src matches are relative to this path.
					src: ['**/*.js'], // Actual pattern(s) to match.
					dest: 'production/',   // Destination path prefix.
					ext: '.min.js',   // Dest filepaths will have this extension.
		        },
		      ]
			}
		},
		// this optimizes your images for when you are ready to release your website
	    imagemin: {                          
			dynamic: {
				options: {
					optimizationLevel: 7
				},                    
				files: [{
					expand: true,                  
					cwd: 'src/',                   
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'production/'
				}]
			}
		},
		// "general" removes the production folder when you go to do a new release
		// "node_mods" removes the node_modules folder after a new release is created
		clean: {
			general: ['production/']		},
		// Copy creates a copy within the production folder after all commands are run
		copy: {
			banners: {
				expand: true,
				cwd: 'src/',
				src: ['**/*.html'],
				dest: 'production/'
			}
		},
		replace: {
			updateCssPaths: {
				src: ['production/**/*.html'],
				overwrite: true,                 // overwrite matched source files
				replacements: [{
					from: /styles.css/g,
					to: 'styles.min.css'
				}]
			},
			updateJsPaths: {
				src: ['production/**/*.html'],
				overwrite: true,                 // overwrite matched source files
				replacements: [{
					from: /main.js/g,
					to: 'main.min.js'
				}]
			},
			updateIscrollTag: {
				src: ['production/**/*.html'],
				overwrite: true,                 // overwrite matched source files
				replacements: [{
					from: /iscroll.js/g,
					to: 'iscroll.min.js'
				}]
			}
		},
		// this minifies the html once paths and file extensions are updated 
		minifyHtml: {
	        dist: {
	            files: [{
					expand: true,   
					cwd: 'production/',
					src: ['**/*.html'],
					dest: 'production/'	
				}]
	        }
	    }
	});
	
	// loadNpmTasks bring in required grunt modules for use within this file
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-rename');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-minify-html');
	
	// "default" is for use when developing the theme
	grunt.registerTask('default', ['clean:general', 'copy:banners', 'uglify', 'cssmin', 'imagemin', 'replace', 'minifyHtml']);
	
}