var app = {
	init: function(){
		this.deviceReady();
	},
	deviceReady: function(){
		document.addEventListener("deviceready", this.onDeviceReady, false);
		document.addEventListener("pause", this.onDevicePause ,false);
		document.addEventListener("resume", this.onDeviceResume ,false);
	},
	onDeviceReady: function(){
		app.receivedEvent();
	},
	receivedEvent: function(){
		var pronto = document.getElementById("secundaria").querySelector("#ready");
		pronto.innerHTML = "Carregado!";
	},
	onDevicePause: function(){
		alert("App enviada para background.");
	},
	onDeviceResume: function(){
		alert("App trazida do background.");
	}
}

app.init();