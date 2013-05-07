$(function() {
	$.getJSON(
		'http://api.wunderground.com/api/596362d58571f6b2/geolookup/conditions/q/autoip.json?callback=?',
		function(parsed_json) {
			var location = parsed_json.location.city;
			var temp_c = parsed_json.current_observation.temp_c;
			//alert("Current temperature in " + temp_c);
			$('body').append("<p>" + location + " - " + temp_c + "&deg;C</p>");
		}
	);
});

/*
Chance of Flurries	chanceflurries	
Chance of Rain	chancerain	
Chance of Freezing Rain	chancesleet	
Chance of Sleet	chancesleet	
Chance of Snow	chancesnow	
Chance of Thunderstorms	chancetstorms	
Chance of a Thunderstorm	chancetstorms	
Clear	clear	
Cloudy	cloudy	
Flurries	flurries	
Fog	fog	
Haze	hazy	
Mostly Cloudy	mostlycloudy	
Mostly Sunny	mostlysunny	
Partly Cloudy	partlycloudy	
Partly Sunny	partlysunny	
Freezing Rain	sleet	
Rain	rain	
Sleet	sleet	
Snow	snow	
Sunny	sunny	
Thunderstorms	tstorms	
Thunderstorm	tstorms	
Unknown	unknown	
Overcast	cloudy	
Scattered Clouds	partlycloudy	
*/