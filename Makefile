default: js/core.js

js/core.js: zooks/*
	php -f compile.php

upload:
	af update gadzooks
