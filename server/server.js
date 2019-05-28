var express = require('express')
var app = express()
const http = require('http')
const socketIo = require('socket.io')

const {generateMessage} = require('./utils/message')
const port = process.env.PORT || 3000

const path = require('path')
const publicPath = path.join(__dirname, "../public")
var server = http.createServer(app)
var io = socketIo(server)

app.use(express.static(publicPath))

io.on('connection', function(socket){
	console.log("New user added!")

	// socket.emit('newMessage', {
	// 	from:'server',
	// 	to:'client',
	// 	createdAt: Date.now()
	// })

	socket.emit('welcomeUser', generateMessage("Admin", "Welcome to Chat-App!"))
		// {
		// 	from:"Admin",
		// 	to: "User",
		// 	text:"Welcome to Chat-App!"
		// }
	

	//when first user is added, he will only get 'welcomeUser' 
	//as broadcast.emit will not emit to itself, it is not seen to him
	//when second user is added, he will see 'welcomeUser', and 
	//first user will see 'newUser'

	socket.broadcast.emit('newUser', generateMessage("Admin", "New User Added!"))
	// 	{
	// 		from:"Admin",
	// 		text:"New User Added!",
	// 		createdAt: new Date().getTime()
	// }
	

	socket.on('createMessage', function(message, callback){
		console.log("New message created!")
		console.log(message)

		//to all users - when user creates a message and emits it,
		//it will reach the server on 'createMessage' -> that is 
		//taken from io.emit and sent to all users connected.
		// io.emit('newMessage',{
		// 	from: message.from,
		// 	to: message.to,
		// 	createdAt: new Date().getTime()
		// })
		socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
		callback('This is acknowledgement from Server')
		// socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
		// {
		// 	from: message.from,
		//  	to: message.to,
		//  	createdAt: new Date().getTime()
		// }
		

	socket.on('disconnect', ()=>{
		console.log("Client disconnected!:(")
	})

})
})

server.listen(port, function(){
	console.log(port)
})
