# Server

## Install:
`Rename .env.template to .env and fill in the values.`

`npm install`

## Start SimpleServer:
`npm run server`

## Start Server dockerized:
`colima start` (or another dockerized solution)

`docker compose up --build`


## Endpoints with SimpleServer
http://localhost:3000/api/station/autocomplete?query=Dresden&limit=30

http://localhost:3000/api/station/8010085/departures?datum=2025-09-14&zeit=07:00:00

http://localhost:3000/api/station/8010085/arrivals?datum=2025-09-14&zeit=07:00:00

## Start VendoServer  (experimental)
`npm run vendoServer`

## Endpoints with VendoServer (experimental)
http://localhost:3003/api/station/autocomplete

http://localhost:3003/api/station/895177/departures?datum=2025-09-14&zeit=22%3A28%3A25

http://localhost:3003/api/station/895177/arrivals?datum=2025-09-14&zeit=22%3A28%3A25

## Swagger
[swagger.yaml](Docu/swagger.yaml)

## Postman Collections
[SimpleServer.postman_collection.json](Docu/SimpleServer.postman_collection.json)

[TargetServerBahn.postman_collection.json](Docu/TargetServerBahn.postman_collection.json)

[VendoServer.postman_collection.json](Docu/VendoServer.postman_collection.json)

# Full Project Infos
[README.md](../README.md)

`@2025 Lars F. Menzel`

