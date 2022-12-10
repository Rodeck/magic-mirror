.DEFAULT_GOAL := run_app

run_app: run_server run_frontend
	run_server
	run_frontend

run_server:
	cd ./server
	npm install
	setsid node ./server/index.js "usbTTY0" >/dev/null 2>&1 < /dev/null &

run_frontend:
	npm install
	setsid npm start "usbTTY0" >/dev/null 2>&1 < /dev/null &