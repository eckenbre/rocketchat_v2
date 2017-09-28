RocketChat.API.v1.addRoute('livechat/transferir', { authRequired: true }, {
	post() {
		if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-manager')) {
			return RocketChat.API.v1.unauthorized();
		}
		try {

      console.log("TRANSFERIR");

      //const departamento = this.bodyParams.depto;
    //  const salaId = this.bodyParams.roomId;
    const transferirData = this.bodyParams;
      check(transferirData, {
  			roomId: String,
  			userId: Match.Optional(String),
  			departmentId: Match.Optional(String)
  		});


      Meteor.call('livechat:transfer', transferirData, (error, result) => {
			if (error) {
        console.log("Hubo error");
				console.log(error.error);
			} else if (result) {

				console.log("Transferido!")
			} else {
				console.log("No_available_agents_to_transfer");
			}
		});


const retorno = "ALE";
			return RocketChat.API.v1.success({ retorno });
		} catch (e) {
			return RocketChat.API.v1.failure(e.error);
		}
	}
});
