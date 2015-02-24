<?php
/**
* Handy script to recompile the main 'js/core.js' files list of zooks without having to manually update it
*/

$content = file_get_contents('js/core.js');

if (!preg_match('!// Load individual zook files {{{(.*?)// }}}!s', $content, $matches, PREG_OFFSET_CAPTURE))
	die("Zook placement marker not found in main JS file");

$list = "\n";
foreach (glob('zooks/*.html') as $zook)
	$list .= "\t\t\t\"$zook\",\n";
$list = substr($list, 0, -2) . "\n"; // Clip last comma to keep older browsers happy
$list .= "\t\t\t";

$content = substr($content, 0, $matches[1][1]) . $list . substr($content, $matches[1][1] + strlen($matches[1][0]));

file_put_contents('js/core.js', $content);
