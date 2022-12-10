.DEFAULT_GOAL := run_server

run_server:
	cd ./server
	npm install
	node ./server/index.js "usbTTY0"

run_frontend:
	npm install
	npm start