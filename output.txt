Problem Statement
=================

We have to make a web app in reactjs and nodejs which will have three microservices for handling a kanban board, crud table and user permission for add delete edit. 

Backend :-
==========

1. Nodejs and expressjs with testing in jest and proper log management of the flow.
2. kanban board real time update -> microservice with port - 8001 will be socket
3. crud table with real time update -> microservice with port 8002 will be socket
4. user's change permission -> ( admin, master, normal) admin will be only one, master can to all kind of operation except delete and normal can only view. microservie with port 8003 will be api

User proper full stack design for this project with api gateway and docker and database in postgres with master slave 



