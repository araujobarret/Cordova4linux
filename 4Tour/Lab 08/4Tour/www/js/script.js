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
		app.geolocalizacao();
		app.globalizacao();
		app.motion();
		app.orientacao();
		app.bussola();
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
	},
	geolocalizacao: function(){
		var page_geo = document.getElementById('page_geolocalizacao');
		var geo = navigator.geolocation;
		
		geo.getCurrentPosition(
			function(position){
				var data = converteData(position.timestamp);
				page_geo.querySelector('#inicial').innerHTML = "<p>Posição Inicial<br/>" +
																"Latitude: "+position.coords.latitude+"<br/>" +
																"Longitude: "+position.coords.longitude+"<br/>" +
																"Precisão: "+position.coords.accuracy+"<br/>" +
																"Data: "+data+"</p>";
			},
			function(error){
				page_geo.querySelector('#inicial').innerHTML = "<p>Não foi possível carregar sua posição inicial<br/>" +
																"Código do erro: "+error.code+"<br/>" +
																"Mensagem: "+error.message+"</p>";
			}
		);

		geo.watchPosition(
			function(position){
				var data = converteData(position.timestamp);
				page_geo.querySelector('#atual').innerHTML = "<br/><p>Posição Atual<br/>" +
																"Latitude: "+position.coords.latitude+"<br/>" +
																"Longitude: "+position.coords.longitude+"<br/>" +
																"Precisão: "+position.coords.accuracy+"<br/>" +
																"Data: "+data+"</p>";
			},
			function(error){
				page_geo.querySelector('#atual').innerHTML = "<br/><p>Não foi possível carregar sua posição atual<br/>" +
																"Código do erro: "+error.code+"<br/>" +
																"Mensagem: "+error.message+"</p>";
			}, { timeout: 1000 }
		);
	},
	globalizacao: function(){
		var globalizacao = document.getElementById('globalizacao');
		navigator.globalization.getPreferredLanguage(
			function (language) {
				globalizacao.innerHTML = "Língua: " + language.value + "<br/>";
			},
			function () {
				alert('Error getting language\n');
			}
		);

		navigator.globalization.getLocaleName(
			function (locale) {
				globalizacao.innerHTML += "Local: " + locale.value + "<br/>";
			},
			function () {
				alert('Error getting locale\n');
			}
		);

		navigator.globalization.getDatePattern(
			function (date) {
				globalizacao.innerHTML += "Padrão de Data: " + date.pattern + "<br/>";
			},
			function () {
				alert('Error getting pattern\n');
			},
			{
				formatLength: 'short',
				selector: 'date and time'
			}
		);

		navigator.globalization.dateToString(
			new Date(),
			function (date) {
				globalizacao.innerHTML += "Data em string: " + date.value + "<br/>";
			},
			function () {
				alert('Error getting dateString\n');
			},
			{
				formatLength: 'short',
				selector: 'date and time'
			}
		);
		
		navigator.globalization.getDateNames(
			function (names) {
				for (var i = 0; i < names.value.length; i++) {
					globalizacao.innerHTML += "Mês: " + names.value[i] + "<br/>";
				}
			},
			function () { alert('Error getting names\n'); },
			{ type: 'wide', item: 'months' }
		);

		navigator.globalization.getFirstDayOfWeek(
			function (day) {
				var weekDay = day.value;
				var dayWeek;

				switch(weekDay){
					case 1:
						dayWeek = 'Domingo';
					break;
					case 2:
						dayWeek = 'Segunda';
					break;
					case 3:
						dayWeek = 'Terça';
					break;
					case 4:
						dayWeek = 'Quarta';
					break;
					case 5:
						dayWeek = 'Quinta';
					break;
					case 6:
						dayWeek = 'Sexta';
					break;
					case 7:
						dayWeek = 'Sábado';
					break;
				}
				globalizacao.innerHTML += "Primeiro dia da semana: " + dayWeek + "<br/>";
			},
			function () {alert('Error getting day\n');}
		);

		navigator.globalization.isDayLightSavingsTime(
			new Date(),
			function (date) {
				var horarioVerao = (date.dst) ? 'Sim' : 'Não';
				globalizacao.innerHTML += "Está em horário de verão? " + horarioVerao + "<br/>";
			},
			function () {
				alert('Error getting names\n');
			}
		);
	},
	motion: function(){
		var page_acelerometro = document.getElementById('page_acelerometro');
		var acelerometro = navigator.accelerometer;

		acelerometro.getCurrentAcceleration(
			function(acceleration) {
				var data = converteData(acceleration.timestamp);
				page_acelerometro.querySelector('#inicial').innerHTML = '<p>Acelerômetro Inicial<br/>' +
																		'Ponto X: ' + acceleration.x + '<br/>' +
																		'Ponto Y: ' + acceleration.y + '<br/>' +
																		'Ponto Z: ' + acceleration.z + '<br/>' +
																		'Data: ' + data + '</p>';
			}, function() {
				page_acelerometro.querySelector('#inicial').innerHTML = "Acelerômetro não pôde ser carregado";
			}
		);

		acelerometro.watchAcceleration(
			function(acceleration) {
				var data = converteData(acceleration.timestamp);
				page_acelerometro.querySelector('#atual').innerHTML = '<br/><p>Atualização do Acelerômetro<br/>' +
																		'Ponto X: ' + acceleration.x + '<br/>' +
																		'Ponto Y: ' + acceleration.y + '<br/>' +
																		'Ponto Z: ' + acceleration.z + '<br/>' +
																		'Data: ' + data + '</p>';
			}, function() {
				page_acelerometro.querySelector('#atual').innerHTML = "<br/>Acelerômetro não pôde ser atualizado";
			}, { frequency: 1000 }
		);
	},
	orientacao: function(){
		var page_orientacao = document.getElementById('page_orientacao');
		var orientacao = navigator.compass;

		orientacao.getCurrentHeading(
			function(heading) {
				var data = converteData(heading.timestamp);
				page_orientacao.querySelector('#inicial').innerHTML = '<p>Orientação Inicial<br/>' +
																	'Grau de Orientação: ' + heading.magneticHeading + '<br/>' +
																	'Data: ' + data + '</p>';
			}, function() {
				page_orientacao.querySelector('#inicial').innerHTML = "Orientação não pôde ser carregado";
			}
		);

		orientacao.watchHeading(
			function(heading) {
				var data = converteData(heading.timestamp);
				page_orientacao.querySelector('#atual').innerHTML = '<br/><p>Atualização da Orientação<br/>' +
																	'Grau de Orientação: ' + heading.magneticHeading + '<br/>' +
																	'Data: ' + data + '</p>';
			}, function() {
				page_orientacao.querySelector('#atual').innerHTML = "<br/>Orientação não pôde ser atualizado";
			}, { frequency: 1000 }
		);
	},
	bussola: function(){
		navigator.compass.watchHeading(
			function(heading){
				var grau = Math.round(heading.magneticHeading);
				document.getElementById('posicao_bussola').innerHTML = grau+"°";
				document.getElementById("bussola").style.transform = "rotate(-"+heading.magneticHeading+"deg)";
			},
			function(compassError){
				alert('Erro ao carregar a bússola');
			},
			{ frequency: 100 }
		);
	}
}

function converteData(date){
	var d = new Date(date);
	var day = d.getDate();
	var dia = (day < 10) ? "0"+day : day;
	var mon = d.getMonth()+1;
	var mes = (mon < 10) ? "0"+mon : mon;
	var ano = d.getFullYear();

	var hour = d.getHours();
	var hora = (hour < 10) ? "0"+hour : hour;
	var min = d.getMinutes();
	var minuto = (min < 10) ? "0"+min : min;
	var sec = d.getSeconds();
	var segundo = (sec < 10) ? "0"+sec : sec;

	var data = dia + '/' + mes + '/' + ano + " às " + hora + ":" + minuto + ":" + segundo;
	return data;
}

if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
{
	app.init();
}
else{
	app.onDeviceReady();
}