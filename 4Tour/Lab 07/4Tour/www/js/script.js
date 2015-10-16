var app = {
	init: function(){
		this.deviceReady();
	},
	deviceReady: function(){
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function(){
		app.receivedEvent('page_inicial', '#ready');
        document.addEventListener("pause",  app.onPause,  false);
        document.addEventListener("resume", app.onResume, false);
        app.deviceInfo('page_dispositivo', '#device');
        window.addEventListener("batterystatus", app.onBatteryStatus, false);
		app.checkConnection('page_rede', '#network');
        window.addEventListener("online", app.changeOnline, false);
        window.addEventListener("offline", app.changeOffline, false);
        app.vibrate();
        app.closeSplashScreen();
        app.statusBarBg();
        app.dialogo();
        app.linkInBroser();
	},
	receivedEvent: function(id, elemento) {
        var pronto = document.getElementById(id).querySelector(elemento);

        pronto.setAttribute('style', 'text-align:center;');
        pronto.innerHTML = 'Dispositivo pronto!';
    },
	onPause: function(){
		alert("Enviado para background");
	},
	onResume: function(){
		alert("Trazido do background");
	},
    deviceInfo: function(id, elemento){
        var dispositivo = document.getElementById(id).querySelector(elemento);

        dispositivo.innerHTML = "Cordova: "+device.cordova+"<br/>\
        						Plataforma: "+device.platform+"<br/>\
        						UUID: "+device.uuid+"<br/>\
        						Versão: "+device.version+"<br/>\
        						Modelo: "+device.model;
    },
    onBatteryStatus: function(info){
        var parentElement = document.getElementById('page_bateria');
        var status_bateria = parentElement.querySelector('#battery');
        var plugado = (info.isPlugged) ? '<br/>Carregando...' : '<br/>[Sem carregamento]';
        status_bateria.innerHTML = "Porcentagem da bateria: " + info.level + "%"+plugado;
    },
	checkConnection: function(id, elemento) {
		var networkState = navigator.connection.type;
		var states = {};
		states[Connection.UNKNOWN]  = 'Desconhecida';
		states[Connection.ETHERNET] = 'Ethernet';
		states[Connection.WIFI]     = 'WiFi';
		states[Connection.CELL_2G]  = 'Cel 2G';
		states[Connection.CELL_3G]  = 'Cel 3G';
		states[Connection.CELL_4G]  = 'Cel 4G';
		states[Connection.CELL]     = 'Cel genérico';
		states[Connection.NONE]     = 'Sem conexão';
		document.getElementById(id).querySelector(elemento).innerHTML = "Tipo de conexão: "+states[networkState];
	},
	changeOnline: function(){
		alert('Online');
	},
	changeOffline: function(){
		alert('Offline');
	},
	vibrate: function(){
		document.getElementById('button_vibra').addEventListener("click", function(){
			navigator.vibrate([350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400, 350,10,350, 400]);
		}, false);

		document.getElementById('button_nao_vibra').addEventListener("click", function(){
			navigator.vibrate(0);
		}, false);
		
	},
	closeSplashScreen: function(){
		setTimeout(function() {
			navigator.splashscreen.hide();
		}, 2000);
	},
	statusBarBg: function(){
		StatusBar.backgroundColorByHexString("#D200FF");
		setTimeout(function() {
			StatusBar.hide();
		}, 10000);
	},
	dialogo: function(){
		document.getElementById('button_alert').addEventListener("click", function(){
			navigator.notification.alert(
				"Área restrita",					// mensagem
				function(){ alert('callback'); },	// callback
				"Cuidado",							// titulo
				"OK"								// nome do botão
			);
		}, false);

		document.getElementById('button_confirm').addEventListener("click", function(){
			navigator.notification.confirm(
				"Deseja realmente sair do aplicativo?",	// mensagem
				function(buttonIndex){		// callback
					if(buttonIndex === 1){
						navigator.app.exitApp();
					}
				},
				"Sair do aplicativo",		// titulo
				["Sim", "Não"]				// botões
			);
		}, false);

		document.getElementById('button_prompt').addEventListener("click", function(){
			navigator.notification.prompt(
				"Qual a sua idade?",		// mensagem
				function(args){				// callback
					if(args.buttonIndex === 1){
						window.age = args.input1;
						alert("Sua idade é: "+args.input1);
					}
				},
				"Idade",					// titulo
				["Enviar!"],				// botões
				"18"						// Texto Padrão
			);
		}, false);

		document.getElementById('button_beep').addEventListener("click", function(){
			navigator.notification.beep(5);	// quantidade
		}, false);		
	},
	linkInBroser: function(){
		document.getElementById('button_linkbrowser1').addEventListener("click", function(){
			window.open = cordova.InAppBrowser.open('http://www.4linux.com.br', '_blank', 'location=no');
		}, false);
		
		document.getElementById('button_linkbrowser2').addEventListener("click", function(){
			window.open = cordova.InAppBrowser.open('http://www.4linux.com.br', '_blank', 'location=yes');
		}, false);
	}
}

if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
{
    app.init();
}
else{
    app.onDeviceReady();
}