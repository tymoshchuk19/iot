# Campainha

Subsilia_2.0 -> last version.

Funny way to open my home doorbell remotely and give access to some friends. Through the deployment of a node js application with some bootstrap and a python script.

The application has an authentication system with user registration. Allowing the identification of the user that opens the door and some other information. 

The python script (config/open.py) deals with the connection that the raspberry device does with the doorbell. 

To use some iot technologies regarding some scalability we decide to communicate between the app API and a python script through an mqtt server. 
