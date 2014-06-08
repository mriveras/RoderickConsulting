$(document).ready(function() {
	var windowHeight = $(window).innerHeight();
		$('.max-height').css('min-height',windowHeight);
		console.log('hola1');
});

function autoresize() {
	var windowHeight = $(window).innerHeight();
		$('.max-height').css('min-height',windowHeight);
		console.log('hola2');
}

