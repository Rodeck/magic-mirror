#!/bin/bash
echo "lsusb"
lsusb
echo "gphoto2"
gphoto2 --auto-detect
gphoto2 --summary
gphoto2 --abilities
echo "Hello world"

