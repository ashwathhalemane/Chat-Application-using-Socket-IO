var expect = require('expect')

var generateMessage = require('./message')

describe('generateMessage',()=>{
	it('should generate corret message object', ()=>{
		var from='jen';
		var text='Some message';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number')
		expect(message).toInclude({from, text})
	})
})