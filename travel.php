<?php
$tubeData = simplexml_load_file('http://cloud.tfl.gov.uk/TrackerNet/LineStatus');
foreach ($tubeData as $lineData) {
	$name = $lineData->Line['Name'];
	$status = $lineData->Status['Description'];
	$css = $lineData->Status['CssClass'];

	if($name == 'Northern' || $name == 'Central' || $name == 'Overground' || $name == 'District' || $name == 'Circle' || $name == 'Hammersmith and City'){
		echo '<div class="line group"><div class="line-name ' . $name . '">' . $name . '</div><div class="status ' . $css . '">' . $status . '</div></div>';
	}
}
?>