var app = {
	init: function(){
		this.deviceReady();
	},
	deviceReady: function(){
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},
	onDeviceReady: function(){
		app.geo();
		app.globalization();
	},
	geo: function()
	{
		var info = document.getElementById("geoInfo");
		var info2 = document.getElementById("geoInfo2");
		var geo = navigator.geolocation;

		geo.getCurrentPosition(
			function(pos){
				info.innerHTML = "Posicao Inicial <br/> Latitude: " + pos.coords.latitude;
				info.innerHTML += "<br/>Longitude: " + pos.coords.longitude;
				info.innerHTML += "<br/>Precisão: " + pos.coords.accuracy;
				info.innerHTML += "<br/>Data: " + converteData(pos.timestamp);
			},
			function(error){
				info.innerHTML = "Erro ao obter a geolocalização.<br/>Código: " + error.code;
				info.innerHTML += "<br/>Mensagem: " + error.message;
			}
		);

		geo.watchPosition(
			function(pos){
				info2.innerHTML = "Posicao Atual <br/> Latitude: " + pos.coords.latitude;
				info2.innerHTML += "<br/>Longitude: " + pos.coords.longitude;
				info2.innerHTML += "<br/>Precisão: " + pos.coords.accuracy;
				info2.innerHTML += "<br/>Data: " + converteData(pos.timestamp);
				info2.innerHTML += "<br/>Velocidade:" + pos.coords.speed + "m/s";
			},
			function(error){
				info2.innerHTML = "Erro ao obter a geolocalização.<br/>Código: " + error.code;
				info2.innerHTML += "<br/>Mensagem: " + error.message;
			}
		);

	},
	globalization: function(){
		var info = document.getElementById("globalizationInfo");
		var glob = navigator.globalization;

		glob.getPreferredLanguage(
			function(lang){
				info.innerHTML = "Lingua: " + lang.value + "<br/>";
			},
			function(){
				info.innerHTML = "Erro ao obter idioma";
			}
		);

		glob.getLocaleName(
			function(local){
				info.innerHTML += "Local: " + local.value + "<br/>";
			},
			function(){
				info.innerHTML += "Erro ao obter o local";
			}
		);

		glob.dateToString(
			new Date(),
			function(data){
				info.innerHTML += "Data: " + data.value + "<br/>";
			},
			function(){
				info.innerHTML += "Erro ao obter a data em string";
			},
			{
				formatLength: "short",
				selector: "date and time"
			}
		);

		glob.getFirstDayOfWeek(
			function(day){
				var weekDay = day.value;
				var dayWeek;

				switch(weekDay)
				{
					case 1:
						dayWeek = "Domingo";
					break;
					case 2:
						dayWeek = "Segunda";
					break;
					case 3:
						dayWeek = "Terça";
					break;
					case 4:
						dayWeek = "Quarta";
					break;
					case 5:
						dayWeek = "Quinta";
					break;
					case 6:
						dayWeek = "Sexta";
					break;
					case 7:
						dayWeek = "Sábado";
					break;					
				}
				info.innerHTML += "Primeiro dia da semana: " + dayWeek + "<br/>";
			},
			function(){
				info.innerHTML += "Erro ao obter o primeiro dia da semana";
			}
		);

		glob.isDayLightSavingsTime(
			new Date(),
			function(data){
				var horarioVerao = (data.dst) ? "Sim" : "Não";
				info.innerHTML += "Estamos em horário de verão: " + horarioVerao + "<br/>";
			},
			function(){
				info.innerHTML += "Erro ao obter informação sobre o horário de verão";
			}
		);

	}
};

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

app.init();