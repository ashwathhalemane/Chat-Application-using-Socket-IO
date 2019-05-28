var socket = io()

socket.on('connect', function(){
	console.log("Connected to server!:)")
	socket.on('welcomeUser', function(welcomeMessage){
		console.log(welcomeMessage.text)

		$('ol').append('<li>' + welcomeMessage.from +" "+welcomeMessage.text + '</li>');

	})

	socket.on('newUser', function(newUserMessage){
		console.log(newUserMessage.text)
		$('ol').append('<li>' + newUserMessage.from +" "+newUserMessage.text + '</li>');
			
	})

	//this will be created by user from Developer tools just the 
	//way user types a new message and sends it over
	// socket.emit('createMessage', {
	// 	from:"client",
	// 	to:"server"
	// })
})

socket.on('disconnect', function(){
	console.log("Disconnecting from server!:(")
})

socket.on('newMessage', function(newMessage){
	console.log(newMessage)
	// var li = $('<li></li>')
	// // li.text(`${newMessage.from}: ${newMessage.text}`)
	// li.text("Heckckckckckckckck")
	// $(#messages).append(li)
	$('ol').append('<li>' + newMessage.from +" "+newMessage.text + '</li>');
})

// socket.emit('createMessage',{
// 		from:"Ashwath",
// 		text:"Hello!"
// 	}, function(data){
// 		console.log("Got it!", data)
// })

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: "User",
		text: jQuery('[name=message]').val()
	}, function(){

	})
})