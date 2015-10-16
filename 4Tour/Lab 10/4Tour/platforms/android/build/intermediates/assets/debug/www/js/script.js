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
		app.linkInBrowser();
		app.geolocalizacao();
		app.globalizacao();
		app.motion();
		app.orientacao();
		app.bussola();
		app.camera();
		app.audio();
		app.mediaCapture();
		app.contatos();
		app.sistema_arquivos();
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
	linkInBrowser: function(){
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
				document.getElementById('posicao_bussola').innerHTML = 'Erro ao carregar a bússola';
			},
			{ frequency: 100 }
		);
	},
	camera: function(){
		document.getElementById('tirar_foto').addEventListener("click", function(){
			navigator.camera.getPicture(
				function(imageData) {
					var i = document.getElementById('foto');
					i.src = imageData;
				},
				function(message) {
					console.log(message);
				},
				{
					correctOrientation: true,
					saveToPhotoAlbum: true
				}
			);
		}, false);
	},
	audio: function(){
		var mediaTimer = null;
		var src = "http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3";

		var media = new Media(
			src,
			function() {
				mediaTimer = null;
				var dur = media.getDuration();

				if(dur > 0){
					d = dur;
					dur = Math.round(dur);
					if(dur < 60){
						duracao = (dur < 10) ? "0"+dur : dur;
						duracao = "00:"+duracao;
					}
					info_execucao.innerHTML = "Tempo total do áudio: "+duracao+"s";
				}
			},
			function(err) {
				info_execucao.innerHTML = "Erro código: "+ err.code+" ("+ err.message+"). Áudio não foi executado.";
			}
		);

		document.getElementById('exec_audio').addEventListener("click", function(){
			var info_execucao = document.getElementById('info_execucao');

			media.play();

			if (mediaTimer == null) {
				mediaTimer = setInterval(function() {
					media.getCurrentPosition(
						function(pos) {
							if (pos > 0) {
								p = pos;
								pos = Math.round(pos);
								if(pos < 60){
									position = (pos < 10) ? "0"+pos : pos;
									position = "00:"+position;
								}
								document.getElementById('audio_position').innerHTML = "Tempo do áudio: "+position+"s";
							}
						},
						function(e) {
							document.getElementById('audio_position').innerHTML = "Erro ao mostrar tempo do áudio: " + e;
						}
					);
				}, 1);
			}
		}, false);

		document.getElementById('pause_audio').addEventListener("click", function(){
			if (media) {
				media.pause();
			}
		});

		document.getElementById('stop_audio').addEventListener("click", function(){
			if (media) {
				media.stop();
			}
			clearInterval(mediaTimer);
			mediaTimer = null;
		});

		document.getElementById('mute_audio').addEventListener("click", function(){
			if (media) {
				media.setVolume('0.0');
			}
		})

		document.getElementById('unmute_audio').addEventListener("click", function(){
			if (media) {
				media.setVolume('1.0');
			}
		})

		var mediaRec = new Media(
			"audio.mp3",
			function() {
				info_gravacao.innerHTML = "Gravação finalizada";
			},
			function(err) {
				info_gravacao.innerHTML = "Erro código: "+ err.code+". Áudio não foi gravado.";
			}
		);

		document.getElementById('gravar_audio').addEventListener("click", function(){
			var info_gravacao = document.getElementById('info_gravacao');

			mediaRec.startRecord();
			info_gravacao.innerHTML = "Gravando...<br/>Tempo máximo de 30 segundos";

			setTimeout(function(){
				mediaRec.stopRecord();
			}, 30000);
		}, false);

		document.getElementById('stop_gravar').addEventListener('click', function(){
			mediaRec.stopRecord();
		}, false);
	},
	mediaCapture: function(){
		var mediaFile = null;
		
		document.getElementById("capture_audio").addEventListener("click", function(){
			navigator.device.capture.captureAudio(
				function (mediaFiles) {
					if (mediaFiles.length > 0){
						var put_audio = document.getElementById("put_audio");
						for(var iv = 0; iv < mediaFiles.length; iv++){
							put_audio.innerHTML += '<audio controls>' +
													'<source type="'+mediaFiles[iv].type+'" src="'+mediaFiles[iv].fullPath+'">' +
													'</audio><br/>';
						}
					}
				},
				function (e) {
					info_capture_audio.innerHTML = "Error getting audio." + JSON.stringify(e);
				},
				{ limit: 2 }
			);
		}, false);

		document.getElementById("capture_picture").addEventListener("click", function(){
			navigator.device.capture.captureImage(
				function (mediaFiles) {
					if (mediaFiles.length > 0){
						var put_foto = document.getElementById("put_foto");
						for(var iv = 0; iv < mediaFiles.length; iv++){
							put_foto.innerHTML += '<img style="width:300px;" src="'+mediaFiles[iv].fullPath+'" />';
						}
					}
				},
				function (e) {
					info_capture_picture.innerHTML = "Error getting picture." + JSON.stringify(e);
				},
				{ limit: 2 }
			);
		}, false);

		document.getElementById("capture_video").addEventListener("click", function(){
			navigator.device.capture.captureVideo(
				function (mediaFiles) {
					if (mediaFiles.length > 0){
						var put_video = document.getElementById("put_video");
						for(var iv = 0; iv < mediaFiles.length; iv++){
							put_video.innerHTML += '<video width="300" height="300" controls>' +
													'<source type="'+mediaFiles[iv].type+'" src="'+mediaFiles[iv].fullPath+'">' +
													'</video><br/>';
						}
					}
				},
				function (e) {
					info_capture_video.innerHTML = "Error getting video." + JSON.stringify(e);
				},
				{ limit: 2, duration: 15 }
			);
		}, false);
	},
	contatos: function(){
		document.getElementById('save_contato').addEventListener("click", function(){
			var info_save_contato = document.getElementById("info_save_contato");
			info_save_contato.innerHTML = "Informações sendo salvas...";

			var save_nome_exibicao_contato 	= document.getElementById("save_nome_exibicao_contato").value;
			var save_nome_contato 			= document.getElementById("save_nome_contato").value;
			var save_nome_meio_contato 		= document.getElementById("save_nome_meio_contato").value;
			var save_sobrenome_contato 		= document.getElementById("save_sobrenome_contato").value;
			var save_prefixo_contato 		= document.getElementById("save_prefixo_contato").value;
			var save_sufixo_contato 		= document.getElementById("save_sufixo_contato").value;
			var save_apelido_contato 		= document.getElementById("save_apelido_contato").value;

			var nome_completo = new ContactName();
			if(save_nome_contato.length > 0) {
				nome_completo.givenName = save_nome_contato;
			}

			if(save_sobrenome_contato.length > 0) {
				nome_completo.familyName = save_sobrenome_contato;
			}
			
			if(save_nome_exibicao_contato.length == 0  && save_nome_contato.length > 0){
				save_nome_exibicao_contato = save_nome_contato;
			}
			if(save_nome_exibicao_contato.length > 0) {
				nome_completo.formatted = save_nome_exibicao_contato;
			}

			if(save_nome_meio_contato.length > 0) {
				nome_completo.middleName = save_nome_meio_contato;
			}
			if(save_prefixo_contato.length > 0) {
				nome_completo.honorificPrefix = save_prefixo_contato;
			}
			if(save_sufixo_contato.length > 0) {
				nome_completo.honorificSuffix = save_sufixo_contato;
			}

			var save_tel_contato 	= document.getElementById("save_tel_contato").value;
			var save_cel_contato 	= document.getElementById("save_cel_contato").value;
			var save_trab_contato 	= document.getElementById("save_trab_contato").value;
			var phoneNumbers = [];
			if(save_cel_contato.length > 0){
				phoneNumbers[0] = new ContactField('mobile', save_cel_contato, true);
				if(save_tel_contato.length > 0) {
					phoneNumbers[1] = new ContactField('home', save_tel_contato, false);
					if(save_trab_contato.length > 0) {
						phoneNumbers[0] = new ContactField('work', save_trab_contato, false);
					}
				}
				else{
					if(save_trab_contato.length > 0) {
						phoneNumbers[1] = new ContactField('work', save_trab_contato, false);
					}
				}
			}
			else{
				if(save_tel_contato.length > 0) {
					phoneNumbers[0] = new ContactField('home', save_tel_contato, false);
				}
				else{
					if(save_trab_contato.length > 0) {
						phoneNumbers[0] = new ContactField('work', save_trab_contato, false);
					}
				}
			}

			var save_email_contato 		= document.getElementById("save_email_contato").value;
			var save_emailtrab_contato 	= document.getElementById("save_emailtrab_contato").value;
			var emails = [];
			if(save_email_contato.length > 0) {
				emails[0] = new ContactField('home', save_email_contato, true);
				if(save_emailtrab_contato.length > 0) {
					emails[1] = new ContactField('work', save_emailtrab_contato, false);
				}
			}
			else{
				if(save_emailtrab_contato.length > 0) {
					emails[0] = new ContactField('work', save_emailtrab_contato, false);
				}
			}

			var save_endres_contato 		= document.getElementById("save_endres_contato").value;
			var save_endres_num_contato 	= document.getElementById("save_endres_num_contato").value;
			var save_endres_cidade_contato 	= document.getElementById("save_endres_cidade_contato").value;
			var save_endres_estado_contato 	= document.getElementById("save_endres_estado_contato").value;
			var save_endres_cep_contato 	= document.getElementById("save_endres_cep_contato").value;
			var save_endres_pais_contato 	= document.getElementById("save_endres_pais_contato").value;
			var save_endres_total 			= (save_endres_contato != "" && save_endres_num_contato != "") ? save_endres_contato+", "+save_endres_num_contato : "";

			var save_endtrab_contato 		= document.getElementById("save_endtrab_contato").value;
			var save_endtrab_num_contato 	= document.getElementById("save_endtrab_num_contato").value;
			var save_endtrab_cidade_contato = document.getElementById("save_endtrab_cidade_contato").value;
			var save_endtrab_estado_contato = document.getElementById("save_endtrab_estado_contato").value;
			var save_endtrab_cep_contato 	= document.getElementById("save_endtrab_cep_contato").value;
			var save_endtrab_pais_contato 	= document.getElementById("save_endtrab_pais_contato").value;
			var save_endtrab_total 			= (save_endtrab_contato != "" && save_endtrab_num_contato != "") ? save_endtrab_contato+", "+save_endtrab_num_contato : "";

			var enderecos = [];
			if(save_endres_contato.length > 0){
				enderecos[0] = new ContactAddress(
					true,
					'home',
					save_endres_contato,
					save_endres_total,
					save_endres_cidade_contato,
					save_endres_estado_contato,
					save_endres_cep_contato,
					save_endres_pais_contato
				);

				if(save_endtrab_contato.length > 0){
					enderecos[1] = new ContactAddress(
						false,
						'work',
						save_endtrab_contato,
						save_endtrab_total,
						save_endtrab_cidade_contato,
						save_endtrab_estado_contato,
						save_endtrab_cep_contato,
						save_endtrab_pais_contato
					);
				}
			}
			else{
				if(save_endtrab_contato.length > 0){
					enderecos[0] = new ContactAddress(
						false,
						'work',
						save_endtrab_contato,
						save_endtrab_total,
						save_endtrab_cidade_contato,
						save_endtrab_estado_contato,
						save_endtrab_cep_contato,
						save_endtrab_pais_contato
					);
				}
			}

			var save_work_empresa 		= document.getElementById("save_work_empresa").value;
			var save_work_departamento 	= document.getElementById("save_work_departamento").value;
			var save_work_cargo 		= document.getElementById("save_work_cargo").value;

			var organizations = [];
			if(save_work_empresa.length > 0 && save_work_departamento.length > 0 && save_work_cargo.length > 0){
				organizations[0] = new ContactOrganization(false, 'work', save_work_empresa, save_work_departamento, save_work_cargo);
			}

			var save_url1_contato = document.getElementById("save_url1_contato").value;
			var save_url2_contato = document.getElementById("save_url2_contato").value;
			var urls = [];
			if(save_url1_contato.length > 0){
				urls[0] = new ContactField('',save_url1_contato);

				if(save_url2_contato.length > 0){
					urls[1] = new ContactField('',save_url2_contato);
				}	
			}
			else{
				if(save_url2_contato.length > 0){
					urls[0] = new ContactField('',save_url2_contato);
				}
			}

			var save_im1_contato = document.getElementById("save_im1_contato").value;
			var save_im2_contato = document.getElementById("save_im2_contato").value;
			var ims = [];
			if(save_im1_contato.length > 0){
				ims[0] = new ContactField('',save_im1_contato);

				if(save_im2_contato.length > 0){
					ims[0] = new ContactField('',save_im2_contato);
				}	
			}
			else{
				if(save_im2_contato.length > 0){
					ims[1] = new ContactField('',save_im2_contato);
				}
			}

			var save_foto_contato = document.getElementById("save_foto_contato").value;

			var photos = [];
			if(save_foto_contato.length > 0){
				photos[0] = new ContactField('url', save_foto_contato, true);
			}

			var save_info_details = document.getElementById("save_info_details").value;

			if(save_nome_contato.length == 0 || (save_cel_contato.length == 0 && save_tel_contato.length == 0 && save_trab_contato.length == 0)){
				alert("É necessário o preenchimento de ao menos:\n- Nome do Contato\n- Um Telefone (fixo ou celular)");
				info_save_contato.innerHTML = "";
				return false;
			}

			var contato 			= navigator.contacts.create();
			contato.displayName = save_nome_exibicao_contato;
			
			if(nome_completo && nome_completo != undefined && nome_completo != null  && nome_completo.length > 0){
        		contato.name = nome_completo;
			}
			
			if(save_apelido_contato.length > 0) {
				contato.nickname = save_apelido_contato;
			}

			if(phoneNumbers && phoneNumbers != undefined && phoneNumbers != null  && phoneNumbers.length > 0){
				contato.phoneNumbers = phoneNumbers;
			}
			
			if(enderecos && enderecos != undefined && enderecos != null  && enderecos.length > 0){
				contato.addresses = enderecos;
			}

			if(emails && emails != undefined && emails != null  && emails.length > 0){
				contato.emails = emails;
			}

			if(organizations && organizations != undefined && organizations != null  && organizations.length > 0){
				contato.organizations 	= organizations;
			}

			if(urls && urls != undefined && urls != null  && urls.length > 0){
				contato.urls = urls;
			}

			if(ims && ims != undefined && ims != null  && ims.length > 0){
				contato.ims = ims;
			}

			if(photos && photos != undefined && photos != null  && photos.length > 0){
				contato.photos = photos;
			}

			if(save_info_details && save_info_details != undefined && save_info_details != null  && save_info_details.length > 0){
				contato.note = save_info_details;
			}

			contato.save(
				function(contact){
					info_save_contato.innerHTML = "Contato salvo com sucesso";
				},
				function(){
					info_save_contato.innerHTML = "Erro ao salvar o "+contact;
				}
			);
		});

		document.getElementById("find_contato").addEventListener("click", function(){
			var find_nome_contato = document.getElementById("find_nome_contato").value;
			var info_find_contato = document.getElementById("info_find_contato");

			var options      		= new ContactFindOptions();
			options.filter   		= find_nome_contato;
			options.multiple 		= true;
			var fields       		= [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];

			navigator.contacts.find(
				fields,
				function(contatos){
					info_find_contato.innerHTML = 'Encontrado ' + contatos.length + ' contatos.<br/>';

					for (var i = 0; i < contatos.length; i++) {
						info_find_contato.innerHTML += "<br/><hr/>";

						info_find_contato.innerHTML += '<h2>' + getName(contatos[i]) + '</h2>';

						if(contatos[i].photos){
							info_find_contato.innerHTML += "<img style='width:200px;' src='"+contatos[i].photos[0].value+"' /><br/>";
						}
						else{
							info_find_contato.innerHTML += "<img style='width:200px;' src='https://browshot.com/static/images/not-found.png' /><br/>";
						}

						if(contatos[i].emails && contatos[i].emails.length) {
							info_find_contato.innerHTML += "Email: "+contatos[i].emails[0].value+"<br/>";
						}

						if(contatos[i].phoneNumbers && contatos[i].phoneNumbers.length) {
							info_find_contato.innerHTML += "Telefone: "+contatos[i].phoneNumbers[0].value+"<br/>";
						}
					}
				},
				function(contactError) {
					info_find_contato.innerHTML = 'Erro ao procurar os contatos.';
				},
				options
			);
		});

		document.getElementById("pickContact").addEventListener("click", function(){
			navigator.contacts.pickContact(
				function(contact){
					var selectedContact = document.getElementById("selectedContact");
					selectedContact.innerHTML = "<h2>"+getName(contact)+"</h2>";

					if(contact.photos && contact.photos.length) {
						selectedContact.innerHTML += "<img style='width: 200px;' src='"+contact.photos[0].value+"'><br/>";
					}

					if(contact.emails && contact.emails.length) {
						selectedContact.innerHTML += "Email: "+contact.emails[0].value+"<br/>";
					}

					if(contact.phoneNumbers && contact.phoneNumbers.length) {
						selectedContact.innerHTML += "Telefone: "+contact.phoneNumbers[0].value+"<br/>";
					}
				},
				function(err){
					var selectedContact = document.getElementById("selectedContact");
					selectedContact.innerHTML ='Error: ' + err;
				}
			);
		}, false);
	},
	sistema_arquivos: function(){
		document.getElementById("requestFileSystem_persistent").addEventListener("click", function(){
			var info_requestFileSystem_persistent = document.getElementById("info_requestFileSystem_persistent");
			var info_directoryEntry_persistent = document.getElementById("info_directoryEntry_persistent");
			var info_writeFile_persistent = document.getElementById("info_writeFile_persistent");
			window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

			window.requestFileSystem(
				LocalFileSystem.PERSISTENT,
				10 * 1024 * 1024,
				function(fileSystem) {
					info_requestFileSystem_persistent.innerHTML = "Abrindo o diretório<br/>";
					info_requestFileSystem_persistent.innerHTML += "Name fileSystem: "+fileSystem.name+"<br/>";
					info_requestFileSystem_persistent.innerHTML += "Root isFile: "+fileSystem.root.isFile+"<br/>";
					info_requestFileSystem_persistent.innerHTML += "Root isDirectory: "+fileSystem.root.isDirectory+"<br/>";
					info_requestFileSystem_persistent.innerHTML += "Root name: "+fileSystem.root.name+"<br/>";
					info_requestFileSystem_persistent.innerHTML += "Root fullPath: "+fileSystem.root.fullPath+"<br/>";
					info_requestFileSystem_persistent.innerHTML += "Root nativeURL: "+fileSystem.root.nativeURL+"<br/>";

					fileSystem.root.getDirectory(
						"pers",
						{create: true, exclusive: false},
						function (parent) {
							info_directoryEntry_persistent.innerHTML = "Criando uma pasta<br/>";
							info_directoryEntry_persistent.innerHTML += "Parent isFile: "+parent.isFile+"<br/>";
							info_directoryEntry_persistent.innerHTML += "Parent isDirectory: "+parent.isDirectory+"<br/>";
							info_directoryEntry_persistent.innerHTML += "Parent name: "+parent.name+"<br/>";
							info_directoryEntry_persistent.innerHTML += "Parent fullPath: "+parent.fullPath+"<br/>";
							info_directoryEntry_persistent.innerHTML += "Parent filesystem: "+JSON.stringify(parent.filesystem)+"<br/>";
							info_directoryEntry_persistent.innerHTML += "Parent nativeURL: "+parent.nativeURL+"<br/><br/>";

							parent.getFile(
								"myfile.txt",
								{create: true, exclusive: false},
								function(file){
									info_directoryEntry_persistent.innerHTML += "Criando um arquivo<br/>";
									info_directoryEntry_persistent.innerHTML += "File isFile: "+file.isFile+"<br/>";
									info_directoryEntry_persistent.innerHTML += "File isDirectory: "+file.isDirectory+"<br/>";
									info_directoryEntry_persistent.innerHTML += "File name: "+file.name+"<br/>";
									info_directoryEntry_persistent.innerHTML += "File fullPath: "+file.fullPath+"<br/>";
									info_directoryEntry_persistent.innerHTML += "File filesystem: "+JSON.stringify(file.filesystem)+"<br/>";
									info_directoryEntry_persistent.innerHTML += "File nativeURL: "+file.nativeURL+"<br/><br/>";

									var log = "Escrevendo no arquivo [" + (new Date()) + "]\n";
									file.createWriter(
										function(fileWriter) {
											fileWriter.seek(fileWriter.length);

											var blob = new Blob([log], {type:'text/plain'});
											fileWriter.write(blob);
											info_writeFile_persistent.innerHTML = "Escreveu no arquivo: "+log+"";
										},
										function(){
											info_writeFile_persistent.innerHTML = "Erro ao escrever no arquivo";
										}
									);
								},
								function (error){
									info_directoryEntry_persistent.innerHTML += "Não pôde criar um novo arquivo: " + error.code;
								}
							);
						},
						function (error) {
							info_directoryEntry_persistent.innerHTML = "Não pôde criar um novo diretorio: " + error.code;
						}
					);
				},
				function(err) {
					info_requestFileSystem_persistent.innerHTML = 'Código do Erro '+err.code;
				}
			);
		}, false);

		document.getElementById("listar_requestFileSystem_persistent").addEventListener("click", function(){
			var info_listar_requestFileSystem_persistent = document.getElementById("info_listar_requestFileSystem_persistent");
			window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

			window.requestFileSystem(
				LocalFileSystem.PERSISTENT,
				10 * 1024 * 1024,
				function(fileSystem) {
					fileSystem.root.getDirectory(
						"pers",
						{ create: false },
						function (parent) {
							var directoryReader = parent.createReader();
							directoryReader.readEntries(
								function (entries) {
									info_listar_requestFileSystem_persistent.innerHTML = "";
									var i;
									for (i=0; i<entries.length; i++) {
										info_listar_requestFileSystem_persistent.innerHTML += "File name: "+entries[i].name+"<br/>";
										info_listar_requestFileSystem_persistent.innerHTML += "File isFile: "+entries[i].isFile+"<br/>";
										info_listar_requestFileSystem_persistent.innerHTML += "File isDirectory: "+entries[i].isDirectory+"<br/>";
										info_listar_requestFileSystem_persistent.innerHTML += "File fullPath: "+entries[i].fullPath+"<br/>";
										info_listar_requestFileSystem_persistent.innerHTML += "File filesystem: "+JSON.stringify(entries[i].filesystem)+"<br/>";
										info_listar_requestFileSystem_persistent.innerHTML += "File nativeURL: "+entries[i].nativeURL+"<br/><hr/><br/>";
									}
								},
								function (error) {
									info_listar_requestFileSystem_persistent.innerHTML = "Failed to list directory contents: " + error.code;
								}
							);
						},
						function (error) {
							info_listar_requestFileSystem_persistent.innerHTML = "Não pôde ler o diretorio: " + error.code;
						}
					);
				},
				function(err) {
					info_listar_requestFileSystem_persistent.innerHTML = 'Código do Erro '+err.code;
				}
			);
		}, false);

		document.getElementById("delete_requestFileSystem_persistent").addEventListener("click", function(){
			var info_delete_requestFileSystem_persistent = document.getElementById("info_delete_requestFileSystem_persistent");
			window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

			window.requestFileSystem(
				LocalFileSystem.PERSISTENT,
				10 * 1024 * 1024,
				function(fileSystem) {
					fileSystem.root.getDirectory(
						"pers",
						{ create: false },
						function (parent) {
							parent.removeRecursively(
								function(){
									info_delete_requestFileSystem_persistent.innerHTML = "Pasta e arquivos excluídos com sucesso";
									document.getElementById("info_requestFileSystem_persistent").innerHTML = "";
									document.getElementById("info_directoryEntry_persistent").innerHTML = "";
									document.getElementById("info_writeFile_persistent").innerHTML = "";
									document.getElementById("info_listar_requestFileSystem_persistent").innerHTML = "";
								},
								function(error){
									info_delete_requestFileSystem_persistent.innerHTML = "Não pôde apagar o diretorio "+JSON.stringify(parent)+": " + error.code;
								}
							);
						},
						function (error) {
							info_delete_requestFileSystem_persistent.innerHTML = "Não pôde ler o diretorio "+JSON.stringify(parent)+": " + error.code;
						}
					);
				},
				function(err) {
					info_delete_requestFileSystem_persistent.innerHTML = 'Código do Erro '+err.code;
				}
			);
		}, false);
		
		document.getElementById("requestFileSystem_temporary").addEventListener("click", function(){
			var info_requestFileSystem_temporary = document.getElementById("info_requestFileSystem_temporary");
			var info_directoryEntry_temporary = document.getElementById("info_directoryEntry_temporary");
			var info_writeFile_temporary = document.getElementById("info_writeFile_temporary");
			window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

			window.requestFileSystem(
				LocalFileSystem.TEMPORARY,
				10 * 1024 * 1024,
				function(fileSystem) {
					info_requestFileSystem_temporary.innerHTML = "Abrindo o diretório<br/>";
					info_requestFileSystem_temporary.innerHTML = "Name: "+fileSystem.name+"<br/>";
					info_requestFileSystem_temporary.innerHTML += "Root isFile: "+fileSystem.root.isFile+"<br/>";
					info_requestFileSystem_temporary.innerHTML += "Root isDirectory: "+fileSystem.root.isDirectory+"<br/>";
					info_requestFileSystem_temporary.innerHTML += "Root name: "+fileSystem.root.name+"<br/>";
					info_requestFileSystem_temporary.innerHTML += "Root fullPath: "+fileSystem.root.fullPath+"<br/>";
					info_requestFileSystem_temporary.innerHTML += "Root filesystem: "+JSON.stringify(fileSystem.root.filesystem)+"<br/>";
					info_requestFileSystem_temporary.innerHTML += "Root nativeURL: "+fileSystem.root.nativeURL+"<br/>";

					fileSystem.root.getDirectory(
						"temp",
						{create: true, exclusive: false},
						function (parent) {
							info_directoryEntry_temporary.innerHTML = "Criando uma pasta<br/>";
							info_directoryEntry_temporary.innerHTML += "Parent isFile: "+parent.isFile+"<br/>";
							info_directoryEntry_temporary.innerHTML += "Parent isDirectory: "+parent.isDirectory+"<br/>";
							info_directoryEntry_temporary.innerHTML += "Parent name: "+parent.name+"<br/>";
							info_directoryEntry_temporary.innerHTML += "Parent fullPath: "+parent.fullPath+"<br/>";
							info_directoryEntry_temporary.innerHTML += "Parent filesystem: "+JSON.stringify(parent.filesystem)+"<br/>";
							info_directoryEntry_temporary.innerHTML += "Parent nativeURL: "+parent.nativeURL+"<br/><br/>";

							parent.getFile(
								"myfile.txt",
								{create: true, exclusive: false},
								function(file){
									info_directoryEntry_temporary.innerHTML += "Criando um arquivo<br/>";
									info_directoryEntry_temporary.innerHTML += "File isFile: "+file.isFile+"<br/>";
									info_directoryEntry_temporary.innerHTML += "File isDirectory: "+file.isDirectory+"<br/>";
									info_directoryEntry_temporary.innerHTML += "File name: "+file.name+"<br/>";
									info_directoryEntry_temporary.innerHTML += "File fullPath: "+file.fullPath+"<br/>";
									info_directoryEntry_temporary.innerHTML += "File filesystem: "+JSON.stringify(file.filesystem)+"<br/>";
									info_directoryEntry_temporary.innerHTML += "File nativeURL: "+file.nativeURL+"<br/><br/>";

									var log = "Escrevendo no arquivo [" + (new Date()) + "]\n";
									file.createWriter(
										function(fileWriter) {
											fileWriter.seek(fileWriter.length);

											var blob = new Blob([log], {type:'text/plain'});
											fileWriter.write(blob);
											info_writeFile_temporary.innerHTML = "Escreveu no arquivo: "+log+"";
										},
										function(){
											info_writeFile_temporary.innerHTML = "Erro ao escrever no arquivo";
										}
									);
								},
								function (error){
									info_directoryEntry_temporary.innerHTML += "Não pôde criar um novo arquivo: " + error.code;
								}
							);
						},
						function (error) {
							info_directoryEntry_temporary.innerHTML = "Não pôde criar um novo diretorio: " + error.code;
						}
					);
				},
				function(err) {
					info_requestFileSystem_temporary.innerHTML = 'Código do Erro '+err.code;
				}
			);
		}, false);

		document.getElementById("listar_requestFileSystem_temporary").addEventListener("click", function(){
			var info_listar_requestFileSystem_temporary = document.getElementById("info_listar_requestFileSystem_temporary");
			window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

			window.requestFileSystem(
				LocalFileSystem.TEMPORARY,
				10 * 1024 * 1024,
				function(fileSystem) {
					fileSystem.root.getDirectory(
						"temp",
						{ create: false },
						function (parent) {
							var directoryReader = parent.createReader();
							directoryReader.readEntries(
								function (entries) {
									info_listar_requestFileSystem_temporary.innerHTML = "";
									var i;
									for (i=0; i<entries.length; i++) {
										info_listar_requestFileSystem_temporary.innerHTML += "File name: "+entries[i].name+"<br/>";
										info_listar_requestFileSystem_temporary.innerHTML += "File isFile: "+entries[i].isFile+"<br/>";
										info_listar_requestFileSystem_temporary.innerHTML += "File isDirectory: "+entries[i].isDirectory+"<br/>";
										info_listar_requestFileSystem_temporary.innerHTML += "File fullPath: "+entries[i].fullPath+"<br/>";
										info_listar_requestFileSystem_temporary.innerHTML += "File filesystem: "+JSON.stringify(entries[i].filesystem)+"<br/>";
										info_listar_requestFileSystem_temporary.innerHTML += "File nativeURL: "+entries[i].nativeURL+"<br/><hr/><br/>";
									}
								},
								function (error) {
									info_listar_requestFileSystem_temporary.innerHTML = "Failed to list directory contents: " + error.code;
								}
							);
						},
						function (error) {
							info_listar_requestFileSystem_temporary.innerHTML = "Não pôde ler o diretorio: " + error.code;
						}
					);
				},
				function(err) {
					info_listar_requestFileSystem_temporary.innerHTML = 'Código do Erro '+err.code;
				}
			);
		}, false);

		document.getElementById("delete_requestFileSystem_temporary").addEventListener("click", function(){
			var info_delete_requestFileSystem_temporary = document.getElementById("info_delete_requestFileSystem_temporary");
			window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

			window.requestFileSystem(
				LocalFileSystem.TEMPORARY,
				10 * 1024 * 1024,
				function(fileSystem) {
					fileSystem.root.getDirectory(
						"temp",
						{ create: false },
						function (parent) {
							parent.removeRecursively(
								function(){
									info_delete_requestFileSystem_temporary.innerHTML = "Pasta e arquivos excluídos com sucesso";
									document.getElementById("info_requestFileSystem_temporary").innerHTML = "";
									document.getElementById("info_directoryEntry_temporary").innerHTML = "";
									document.getElementById("info_writeFile_temporary").innerHTML = "";
									document.getElementById("info_listar_requestFileSystem_temporary").innerHTML = "";
								},
								function(error){
									info_delete_requestFileSystem_temporary.innerHTML = "Não pôde apagar o diretorio "+JSON.stringify(parent)+": " + error.code;
								}
							);
						},
						function (error) {
							info_delete_requestFileSystem_temporary.innerHTML = "Não pôde ler o diretorio "+JSON.stringify(parent)+": " + error.code;
						}
					);
				},
				function(err) {
					info_delete_requestFileSystem_temporary.innerHTML = 'Código do Erro '+err.code;
				}
			);
		}, false);
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

function getName(c) {
	var name = c.displayName;
	var novo_nome;
	if(name)
	{
		novo_nome = name;
	}
	else{
		if(c.name.formatted)
		{
			novo_nome = c.name.formatted;
		}
		else{
			if(c.name.givenName)
			{
				novo_nome = c.name.givenName;

				if(c.name.middleName)
				{
					novo_nome += " "+c.name.middleName;
				}
				if(c.name.familyName)
				{
					novo_nome += " "+c.name.familyName;
				}
			}
			else
			{
				novo_nome = "Sem nome";
			}
		}
	}
	
	return novo_nome;
}

if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
{
	app.init();
}
else{
	app.onDeviceReady();
}