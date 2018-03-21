<?php
// unfortunately, the stocks.exchange website doesn't have CORS configured properly
// for all of its API, so this is solution to work around that
$url = $_REQUEST['data'];
$xml = file_get_contents($url);
echo($xml);