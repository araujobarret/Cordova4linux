var app = {
	init: function(){
		this.deviceReady();
	},
	deviceReady: function(){
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},
	onDeviceReady: function(){
		app.vibracao();
		app.splashScreen();
		app.statusBar();
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
	},
	splashScreen: function(){
		setTimeout(function(){
			navigator.splashscreen.hide();
		}, 2000);
	},
	statusBar: function(){
		if(device.platform == "Android" && device.version >= 4)
		{
			StatusBar.backgroundColorByHexString("#f00");
		}
		setTimeout(function(){
			StatusBar.hide();
		}, 10000);
	}
};

app.init();