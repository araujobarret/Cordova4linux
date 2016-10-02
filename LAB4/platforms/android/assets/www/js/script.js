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
		app.onDeviceInfo();
		app.onBatteryInfo();
		app.onNetworkInfo();
	},
	receivedEvent: function(){
		var pronto = document.getElementById("secundaria").querySelector("#ready");
		
		pronto.innerHTML = "Carregado!";

		console.log(device);
	},
	onDevicePause: function(){
		alert("App enviada para background.");
	},
	onDeviceResume: function(){
		alert("App trazida do background.");
	},
	onDeviceInfo: function(){
		var dispositivo = document.getElementById("dispositivo").querySelector("#info");
		dispositivo.innerHTML = "Cordova: " + device.cordova;
		dispositivo.innerHTML += "<br/>Platform: " + device.platform;
		dispositivo.innerHTML += "<br/>UUID: " + device.uuid;
		dispositivo.innerHTML += "<br/>Versao: " + device.version;
		dispositivo.innerHTML += "<br/>Modelo: " + device.model;
	},
	onBatteryInfo: function(){
		window.addEventListener(
			"batterystatus",
			function(info){
				var bateria = document.getElementById("bateria").querySelector("#infoBateria");
				var conectado = (info.isPlugged) ? "Carregando..." : "Não conectado";
				bateria.innerHTML = conectado + "<br/>Porcentagem da bateria: " + info.level + "%";
			},
			false
		);
	},
	onNetworkInfo: function(){
		var networkType = navigator.connection.type;
		var types = {};
		types[Connection.UNKNOWN] = "Conexão desconhecida";
		types[Connection.ETHERNET] = "Conexão via cabo";	
		types[Connection.WIFI] = "Conexão sem fio";
		types[Connection.CELL_2G] = "Conexão de 2G";
		types[Connection.CELL_3G] = "Conexão de 3G";
		types[Connection.CELL_4G] = "Conexão de 4G";
		types[Connection.CELL] = "Conexão genérica";
		types[Connection.NONE] = "Sem conexão";
		alert(navigator.network.connection.type);
		document.getElementById("rede").querySelector("#infoRede").innerHTML = types[networkType];
	}
};

app.init();