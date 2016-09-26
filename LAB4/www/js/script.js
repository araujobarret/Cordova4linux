var app = {
	init: function(){
		this.deviceReady();
	},
	deviceReady: function(){
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},
	onDeviceReady: function(){
		app.receivedEvent();
	},
	receivedEvent: function(){
		var pronto = document.getElementById("secundaria").querySelector("#ready");

		pronto.innerHTML = "Carregado!";
	}
}

app.init();