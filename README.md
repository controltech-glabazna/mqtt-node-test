#mqtt-node-test

this app serves to show the mqtt communication between a general resource as a publisher and FTOptix application as a subscriber. 
The node.js script uses npm mqtt library and establishes a mqtt connection with test.mosquitto.org.
It publishes 3 random number values each 2 seconds. After 10 messages published the script ends.

This app works well with "subscriber" application whish can be found in other repository. 
FT Optix app recieves the data published by node.js script, assigns the values to FT Optix variables and displays them on the screen.

