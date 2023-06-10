## About this project

This is an application that shows city bike journeys and city bike stations in Espoo and Helsinki.

In this  app you can browse through journeys, filter journeys based on departure and return station, view stations on the map, click on map markers to view station statistics, browse stations, search for stations and click on stations to see more data about them. 

You can see images here [journey view image](./images/journeyView.png) and here [station view image](./images/stationView.png).


## Instructions

### Prerequisites
Docker 
* https://docs.docker.com/get-docker/

Node.js 
* https://nodejs.org/en (I used 18.12.1)

### Install dependencies

First you need to clone this repository. After cloning the repository you have to set up the backend and frontend separately.

Run following commands:
```shell
cd backend/
npm install
```
Run following commands:
```shell
cd frontend/
npm install
```

### Download data

Download journey data from:
* https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv (save as `2021-05.csv`)
* https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv (save as `2021-06.csv`)
* https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv (save as `2021-07.csv`)

Download station data from:
* https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv (save as `stations.csv`)

Put the files into the `backend/db` folder!

> If you are Linux/MacOS user, run `permissions.sh` script in the `backend` folder before continuing.


### Run application

To run database, use the following commands:
``` shell
cd backend/
docker-compose up
```
It will take around 1 minute to import data to the MariaDB instance depending on your hardware.

When the data import is done, run backend:
``` shell
cd backend/
npm start
```

To run frontend, use following commands:
``` shell
cd frontend/
npm start
```

Once frontend is running go to http://localhost:3000

Once you are done, stop services. Database can be destroyed using:
```shell
docker-compose down
```

## To do

* Possibility to add stations
* Possibility to add journeys
* Make the query functions cleaner
* More statistics when viewing single station
* Pagination pages