this.visitorId = new ReactiveVar(null);

Meteor.startup(() => {
	//ALEJANDRO ACA se elimina el historico
	console.log("--- EJECUTO Startup ---");
	Meteor._localStorage.removeItem('Meteor.loginToken');
	Meteor._localStorage.removeItem('Meteor.loginTokenExpires');
	Meteor._localStorage.removeItem('Meteor.userId');
	//localStorage.removeItem("rocketChatLivechat");
	//localStorage.removeItem("visitorToken");

	if (!localStorage.getItem('rocketChatLivechat')) {
		localStorage.setItem('rocketChatLivechat', Random.id());
	} else {
		Tracker.autorun(c => {
			if (!Meteor.userId() && visitor.getToken()) {
				Meteor.call('livechat:loginByToken', visitor.getToken(), (err, result) => {
					if (result && result.token) {
						Meteor.loginWithToken(result.token, () => {
							c.stop();
						});
					}
				});
			}
		});
	}

	this.visitorId.set(localStorage.getItem('rocketChatLivechat'));
});
