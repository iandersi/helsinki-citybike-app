LOAD DATA INFILE '/docker-entrypoint-initdb.d/test-data.txt'
INTO TABLE journeys
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;