<?php
	if($_REQUEST["clientname"] != ""){
		$clientName = $_REQUEST["clientname"];
		$welcomeString = '<div class="preface">Welcome</div><p>' . $clientName . '</p>';
	} else {
		$welcomeString = '<p>Welcome</p>';
	};
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8" />
	<title>Infoboard</title>
	<meta name="description" content="" />
	<meta name="keywords" value="" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300|Advent+Pro:400,100' rel='stylesheet' type='text/css'>
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet">
	<script type="text/javascript" src="//use.typekit.net/mfd6yik.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
	<script src="//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
	<link rel="stylesheet" href="css/style.css" type="text/css" />
	<script src="js/lib/modernizr-2.6.2.js"> </script>
</head>
<body>
	<div class="wrapper">
		<header class="global-header group">
			<div class="inner-wide">
				<div class="ident">
				<div class="pixels"></div>
				</div>
				<div class="inner-wrapper">
				  <figure class="logo"><img src="img/webstars_logo.svg" alt=""></figure>
				</div>
			</div>
		</header>
		<div class="container">
			<section class="welcome-note">
				<div class="welcome"><?php echo $welcomeString; ?></div>
			</section>
			<section class="local-weather group">
				<h1>Weather</h1>
				<div class="summary group">
					<div class="weather icon"><div></div></div>
					<div class="weather group">
						<div class="location"></div>
						<div class="temp"><div></div></div>
					</div>
				</div>
			</section>
			<section class="travel group">
				<h1>Travel</h1>
				<div class="tube"></div>
			</section>
			<section class="wifi group last">
				<h1>Wi-fi</h1>
				<!-- <div class="wifi-icon icon"><img src="img/wifi.svg" alt=""></div> -->
				<div class="wifi-details">
					<p><i class='icon-user'></i>Network: <b>Webstars Guest</b></p>
					<p><i class='icon-unlock-alt'></i>Password: <b>exceptionaldigital</b></p>
				</div>
			</section>
		</div>
	</div>
	<!-- Grab Google CDN's jQuery. fall back to local if necessary -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>!window.jQuery && document.write('<script src="js/lib/jquery-1.9.1.min.js"><\/script>')</script>
	<script src="js/lib/bigtext.js"></script>
	<script src="js/main.js"></script>
</body>
</html>