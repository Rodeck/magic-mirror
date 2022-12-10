.DEFAULT_GOAL := run_app

run_server:
        node ./server/index.js "usbTTY0"

run_frontend:
	npm start

run_app:
	run_server
	run_frontend