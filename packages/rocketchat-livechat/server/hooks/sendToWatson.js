RocketChat.callbacks.add('afterSaveMessage', function(message, room) {
	// skips this callback if the message was edited
	////ALEJANDRO
	if(message.u.username === "watson"){

	}
	else {


	Meteor.defer(() => {
		try {
			const response = HTTP.post('http://redcloud.mybluemix.net/rocket/data', {
				data: {
					mensaje: message.msg,
					roomId: message.rid,
					agente: room
				},
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			});

//	if (response.data && response.data.status.code === 200 ) {
			if (response.data && response.statusCode === 200) {
		     console.log("Respondio 200")
			}
		} catch (e) {
			SystemLogger.error('Error en la llamada ->', e);
		}

	});
	}




	return message;
}, RocketChat.callbacks.priority.LOW, 'sendToWatson');
