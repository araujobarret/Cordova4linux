var app = {
	init: function(){
		this.deviceReady();
	},
	deviceReady: function(){
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},
	onDeviceReady: function(){
		app.dialogs();
		app.linkInBrowser();
	},
	dialogs: function()	{
		var btn_alerta = document.getElementById("alerta");
		var btn_confirma = document.getElementById("confirma");
		var btn_prompt = document.getElementById("prompt");
		var btn_beep = document.getElementById("beep");

		btn_alerta.addEventListener("click", function(){
			navigator.notification.alert(
				"Alerta!",
				function(){},
				"Mensagem",
				"Ok"
			);
		}, false);

		btn_confirma.addEventListener("click", function(){
			navigator.notification.confirm(
				"Deseja sair da aplicação?",
				function(buttonIndex){
					if(buttonIndex === 1){
						navigator.app.exitApp();
					}
				},
				"Sair do aplicativo",
				["Sim", "Não"]
			);
		}, false);

		btn_prompt.addEventListener("click", function(){
			navigator.notification.prompt(
				"Qual é a sua idade?",
				function(args){
					alert("Resultado: " + args.input1);
				}, 
				"Idade",
				["Ok", "Exit"],
				"18"
			);
		}, false);

		btn_beep.addEventListener("click", function(){
			navigator.notification.beep(3);	
		}, false);
	},
	linkInBrowser: function(){
		var yes = document.getElementById("inappbrowser_yes");
		var no = document.getElementById("inappbrowser_no");

		yes.addEventListener("click", function(){
			window.open = cordova.InAppBrowser.open("http://www.google.com", "_self", "location=yes");
		},false);
		no.addEventListener("click", function(){
			window.open = cordova.InAppBrowser.open("http://www.google.com", "_self", "location=no");
		},false);
	}
};

app.init();