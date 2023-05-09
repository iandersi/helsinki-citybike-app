LOAD DATA INFILE '/docker-entrypoint-initdb.d/Helsingin_ja_Espoon_kaupunkipyB6rA4asemat_avoin.csv'
INTO TABLE stations
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(fid, station_id, name_fin, name_swe, name_eng, address_fin, address_swe, city_fin, city_swe, operator, capacity, coordinate_x, coordinate_y);
