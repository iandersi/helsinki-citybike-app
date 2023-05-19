LOAD DATA INFILE '/docker-entrypoint-initdb.d/2021-05-prepared.csv'
INTO TABLE journeys
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 407338 ROWS
(departure_date_time, return_date_time, departure_station_id, departure_station_name, return_station_id, return_station_name, @covered_distance_m, duration_sec)
SET covered_distance_m = NULLIF(@covered_distance_m, '');

LOAD DATA INFILE '/docker-entrypoint-initdb.d/2021-06-prepared.csv'
INTO TABLE journeys
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 611741 ROWS
(departure_date_time, return_date_time, departure_station_id, departure_station_name, return_station_id, return_station_name, @covered_distance_m, duration_sec)
SET covered_distance_m = NULLIF(@covered_distance_m, '');

LOAD DATA INFILE '/docker-entrypoint-initdb.d/2021-07-prepared.csv'
INTO TABLE journeys
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 604422 ROWS
(departure_date_time, return_date_time, departure_station_id, departure_station_name, return_station_id, return_station_name, @covered_distance_m, duration_sec)
SET covered_distance_m = NULLIF(@covered_distance_m, '');