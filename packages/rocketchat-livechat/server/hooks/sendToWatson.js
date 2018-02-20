RocketChat.callbacks.add('afterSaveMessage', function(message, room) {
	// skips this callback if the message was edited
	////ALEJANDRO
  //console.log(RocketChat.models.Rooms.findIfTransfered(room))

//  SystemLogger.error('---- HSBC ChatBot User name ->', message.u.username);
  //SystemLogger.error('---- HSBC ChatBot room Served by ->', room.servedBy.username);
	if(message.u.username != "chatbot"){

	Meteor.defer(() => {
		try {
			const response = HTTP.post('http://hbar-red-apolo-11.mybluemix.net/rocket/data', {
				data: {
					mensaje: message.msg,
					roomId: message.rid,
					agente: room.servedBy.username
				},
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			});

//	if (response.data && response.data.status.code === 200 ) {
			if (response.data && response.statusCode === 200) {
		     //console.log("Respondio 200")
			}
		} catch (e) {
			SystemLogger.error('Error en la llamada a aservicio rocket/data ->', e);

		}

	});
	}




	return message;
}, RocketChat.callbacks.priority.LOW, 'sendToWatson');
