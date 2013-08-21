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
var $welcomeSection = $('div.container section.welcome-note');
var $weatherSection = $('div.container section.local-weather');
var $travelSection = $('div.container section.travel');
var $wifiSection = $('div.container section.wifi');
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
	var sectionHeight = $welcomeSection.height() + $weatherSection.height() + $travelSection.height() + $wifiSection.height();
	console.log("containerHeight " + containerHeight);
	console.log("sectionHeight " + sectionHeight);

	var mSpace = (containerHeight - sectionHeight);
	console.log("mSpace " + mSpace);
	
	var sectMargins = mSpace / ($('div.container > section').size() * 2);
	console.log("sectMargins " +sectMargins);
	
	$('div.container > section').css(
		{
			'margin-top': sectMargins,
			'margin-bottom': sectMargins
		}
	);

	$('.wrapper').css('height', pageHeight);
}

function weather(){
	$.getJSON(
		'http://api.wunderground.com/api/596362d58571f6b2/geolookup/conditions/q/autoip.json?callback=?',
		function(parsed_json) {
			var location = parsed_json.location.city;
			var temp_c = parsed_json.current_observation.temp_c;
			var icon = parsed_json.current_observation.icon;
			switch(icon){
				case 'clear':
					icon = 'B';
				break;
				case 'mostlysunny':
					icon = 'B';
				break;
				case 'sunny':
					icon = 'B';
				break;
				case 'fog':
					icon = 'E';
				break;
				case 'partlycloudy':
					icon = 'H';
				break;
				case 'partlysunny':
					icon = 'H';
				break;
				case 'hazy':
					icon = 'J';
				break;
				case 'cloudy':
					icon = 'N';
				break;
				case 'mostlycloudy':
					icon = 'N';
				break;
				case 'chancestorms':
					icon = 'P';
				break;
				case 'tstorms':
					icon = 'P';
				break;
				case 'chancerain':
					icon = 'Q';
				break;
				case 'rain':
					icon = 'R';
				break;
				case 'chanceflurries':
					icon = 'U';
				break;
				case 'flurries':
					icon = 'U';
				break;
				case 'chancesnow':
					icon = 'W';
				break;
				case 'snow':
					icon = 'W';
				break;	
				case 'chancesleet':
					icon = 'X';
				break;
				case 'sleet':
					icon = 'X';
				break;
			}
			$('div.weather.icon > div').html(icon);
			$('div.location').html("<i class='icon-map-marker'></i>" + location);
			$('div.temp > div').html(temp_c +"&deg;c");
			$('div.weather.icon').bigtext();
			$('div.temp').bigtext();
		}
	);
	/*
	var location = "London";
	var temp_c = "30";
	$('div.location').html("<i class='icon-map-marker'></i>" + location);
	$('div.temp p').html(temp_c +"&deg;c");
	//$('body').append("<p>" + location + " - " + temp_c + "&deg;C</p>");
	*/
}
$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results===null){
		return null;
	}else{
		return results[1] || 0;
	}
};
function welcome(){
	if($.urlParam('client')){
		var c = decodeURIComponent($.urlParam('client'));
		var welcomeString = '<div class="preface">Welcome</div><p>' + c + '</p>';
	} else {
		var welcomeString = '<p>Welcome</p>';
	}
	
	$('div.welcome').html(welcomeString);
}
function travel(){
	$.ajax({ url: 'travel.php',
		//data: {action: 'test'},
		//type: 'post',
		success: function(output) {
			$('div.tube').html(output);
			$('div.tube .line').each(
				function(i){
					$(this).delay((i++)*200).fadeTo(500, 1);
				}
			);
		}
	});
}
function initInfoboard(){
	console.log("Initboard");
	//$('div.tube').css('opacity', '0');
	weather();
	welcome();
	travel();
	//resizingStuff();
	setTimeout(initInfoboard, 400000);
	//setTimeout(initInfoboard, 10000);
}
$(function() {
	identInit();
	initInfoboard();
});
$(window).bind("load", function() {
   resizingStuff();
});

/* TODO: Display results */
/* TODO: Condition as font icon */
/* TODO: Condition description */

/*
) Unknown	unknown	
B Clear	clear	
B Mostly Sunny	mostlysunny	
B Sunny	sunny	

E Fog	fog	

H Partly Cloudy	partlycloudy	
H Partly Sunny	partlysunny	
H Scattered Clouds	partlycloudy

J Haze	hazy	

N Cloudy	cloudy	
N Mostly Cloudy	mostlycloudy	
N Overcast	cloudy	

P Chance of a Thunderstorm	chancetstorms	
P Chance of Thunderstorms	chancetstorms	
P Thunderstorm	tstorms	
P Thunderstorms	tstorms	

Q Chance of Rain	chancerain	

R Rain	rain	

U Chance of Flurries	chanceflurries	
U Flurries	flurries	

W Chance of Snow	chancesnow	
W Snow	snow	

X Chance of Freezing Rain	chancesleet	
X Chance of Sleet	chancesleet	
X Freezing Rain	sleet	
X Sleet	sleet	
*/