(function(w, jQuery){

	var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));

 	var site = {

		 personaje1:null,
		 personaje2:null,
		 personaje3:null,
		 datoClicado: null,
		 w: null,
		 listado: null,
		 dataURL: null,
		 tipo: null,
		 sec_video: null,
		 video: null,
		 xVideo: null,

 		// active: true,
 		// secciones:[],
 		// queu:[],

 		// cierra:null,
 		// abrir:null,
 		// onsec:false,

		init: function () {

			this.w = $(window);
			this.personaje1 = $('#personaje1');
			this.personaje2 = $('#personaje2');
			this.personaje3 = $('#personaje3');
			this.sec_video = $('#sec_video');
			this.xVideo = $('#cerrarVideo');
			this.listado = $('li');
			this.video = $('#video');
			
			this.botoneraPersonajes();
			this.botoneraDatos();
			this.resizeSite();

			window.addEventListener("resize", function () {
				site.resizeSite();
			}); 	
		},

		resizeSite : function () {
			if(site.w.width() >= 767)
			{
				$('#'+site.datoClicado).css("opacity", "1");
			}else{
				$('.datos_mob').css("opacity", "0");
				$('.datos_mob').css("display", "none");

				$('#'+site.datoClicado+'_mob').css("display", 'block');
				$('#'+site.datoClicado+'_mob').css("opacity", "1");
			}
		},

		botoneraPersonajes : function () {
			site.personaje1.on("click", function (e) {
				site.mostrarDatos('datos1');
			});

			site.personaje2.on("click", function (e) {
				site.mostrarDatos('datos2');
			});

			site.personaje3.on("click", function (e) {
				site.mostrarDatos('datos3');
			});
		},

		mostrarDatos: function (mostrarDato) {
			$('.datos').css("opacity", "0");
			$('.datos_mob').css("opacity", "0");
			$('.datos_mob').css("display", "none");

			if(site.w.width() >= 767)
			{
				$('#'+mostrarDato).css("opacity", "1");
			}else{
				$('.datos_mob').css("opacity", "0");
				$('.datos_mob').css("display", "none");

				$('#'+mostrarDato+'_mob').css("display", 'block');
				$('#'+mostrarDato+'_mob').css("opacity", "1");
			}
			site.datoClicado = mostrarDato;
		},

		botoneraDatos : function () {
			this.listado.on( "click", function(e) {
				e.preventDefault();
				site.dataURL = $(this).attr('data-url'); 
				site.tipo = $(this).attr('class');

				if(site.tipo == 'video'){
					site.mostrarVideo(site.dataURL);
				}
				else{
					site.mostrarGrafica(site.dataURL , site.tipo);

				}



			});
		},

		mostrarGrafica : function(cual){

			TweenMax.set('#cont_grafica',{display:'block'});

			document.getElementById("img_grafica").src = cual;

			TweenMax.to(site.sec_video , 0.3, {autoAlpha: 1, display:'block', onComplete: function () {

			}});
			
			site.cerrarGrafica();
		},

		mostrarVideo : function(cual){
			// document.getElementById("video").play();

			TweenMax.set('#cont_video',{display:'block'});


			document.getElementById("video").src = cual;

			TweenMax.to(site.sec_video , 0.3, {autoAlpha: 1, display:'block', onComplete: function () {
				document.getElementById("video").play();
			}});
			site.cerrarVideo();
		},

		cerrarVideo : function () {
			this.xVideo.on( "click", function(e) {
				document.getElementById("video").pause();

				TweenMax.to(site.sec_video , 0.3, {autoAlpha: 0, display:'none', onComplete: function () {
					document.getElementById("video").src = " ";
					TweenMax.set('#cont_video',{display:'none'});
					TweenMax.set('#cont_grafica',{display:'none'});
				}});		
			});
		},

		cerrarGrafica : function () {
			this.xVideo.on( "click", function(e) {
				TweenMax.to(site.sec_video , 0.3, {autoAlpha: 0, display:'none', onComplete: function () {
					TweenMax.set('#cont_grafica',{display:'none'});
				}});		
			});
		}


	}

    w.site_ = site; 
	
})(window, jQuery);
