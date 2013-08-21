function randRange (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var colors = [
'#4b727f',
'#7da3ac',
'#444444',
'#594e70',
'#6c6b6b',
'#9c89ba',
'#00a2a0',
'#a5478e'
];
var colorPicks = [];
function resetColors(){
	for ( var i = 0; i < 6; i++ ) {
		colorPicks[i] = 'none';
	}
}

resetColors();

function makeBlock() {
	var n = randRange(0,colorPicks.length-1);
	var c = colorPicks[n];
	var block = '<div class="block" style="background: ' + c + '"></div>';
	colorPicks.splice(n,1);
	return block;
}

function buildRow(nb) {
	var row = '<div class="pixel-row group">';
	for(var i = 0; i < nb; i++){
		row += makeBlock();
	}
	row += '</div>';
	$('div.pixels').append(row);
}

function makeRow(nb) {
	resetColors();
	for(var ii = 0; ii < nb; ii++){
		var n = randRange(0, colors.length-1);
		colorPicks[ii] = colors[n];
	}
	buildRow(6);
}
function identInit(){
	if ( $('section.ident') ) {
		for ( var i = 0; i < 5; i++ ) {
			if ( i === 0 ) {
				makeRow(5);
			}
			if ( i === 1 ) {
				makeRow(5);
			}
			if ( i === 2 ) {
				makeRow(4);
			}
			if ( i === 3 ) {
				makeRow(2);
			}
			if ( i === 4 ) {
				makeRow(1);
			}
		}
	}
}

var $container = $('div.container');

// Element Centering
(function($){
	$.fn.extend({
		center: function () {
			return this.each(function() {
				var top = ($(window).height() - $(this).outerHeight()) / 2.5 ;
				var left = ($(window).width() - $(this).outerWidth()) / 2;
				$(this).css({position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'});
			});
		}
	});
})(jQuery);

(function ($) {
$.fn.vAlign = function() {
	return this.each(function(){
		$(this).children().wrapAll('<div class="nitinh-vAlign" style="position:relative;"></div>');
		var div = $(this).children('div.nitinh-vAlign');
		var ph = $(this).innerHeight();
		var dh = div.height();
		var mh = (ph - dh) / 2;
		div.css('top', mh);
	});
};
})(jQuery);

function resizingStuff() {
	var pageHeight = $(window).height();
	console.log("pageHeight " +pageHeight);

	var containerHeight = pageHeight - $('.global-header').height();
	//var sectionHeight = $welcomeSection.height() + $weatherSection.height() + $travelSection.height() + $wifiSection.height();
	//console.log("containerHeight " + containerHeight);
	//console.log("sectionHeight " + sectionHeight);

	//var mSpace = (containerHeight - sectionHeight);
	//console.log("mSpace " + mSpace);
	
	//var sectMargins = mSpace / ($('div.container > section').size() * 2);
	//console.log("sectMargins " +sectMargins);
	/*
	$('div.container > section').css(
		{
			'margin-top': sectMargins,
			'margin-bottom': sectMargins
		}
	);
	*/
	$('.wrapper').css('height', pageHeight);
}

$(window).bind("load", function() {
   resizingStuff();
});