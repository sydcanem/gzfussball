var utils = require('../server/utils');
var testContent = __dirname + '/content.html';
var malformed = __dirname + '/malformed.html';

describe('utils.js', function() {
	describe('attach', function() {
		it('should throw error of passed elem in not a class or id', function() {
			try {
				utils.attach(testContent, 'elem');
			} catch(error) {
				error.should.be.an.instanceof(Error);
			}
		});
		
		it('should be verified', function(done) {			
			try {
				utils.attach(testContent, '.test');
			} catch(error) {
				return done(error);
			}
			done();
		});

		it('should attach string into tag\'s inner', function() {			
			var template = utils.attach(testContent, '.test', 'Hello');
			template.should.equal('<div id="test"><p class="test">Hello</p></div>\n');
		});

		it('should throw error if html tag is malformed', function() {
			var err = {};

			try {
				utils.attach(malformed, '.test');
			} catch(error) {
				err = error;
			}
			
			err.should.be.an.instanceof(Error);
		});
	});
});
