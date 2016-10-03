var app = {
	init: function(){
		this.deviceReady();
	},
	deviceReady: function(){
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},
	onDeviceReady: function(){
		app.vibracao();
	},
	vibracao: function(){
		var vibrar = document.getElementById("vibrar");
		var vibrarParar = document.getElementById("vibrar_parar");

		vibrar.addEventListener("click", function(){
			navigator.vibrate(2000);
		}, false);

		vibrarParar.addEventListener("click", function(){
			navigator.vibrate(0);
		}, false);

	}
};

app.init();