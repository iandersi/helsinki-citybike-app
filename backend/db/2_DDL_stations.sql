-- hcba.stations definition

CREATE TABLE `stations` (
  `fid` int NOT NULL,
  `station_id` int DEFAULT NULL,
  `name_fin` varchar(100) DEFAULT NULL,
  `name_swe` varchar(100) DEFAULT NULL,
  `name_eng` varchar(100) DEFAULT NULL,
  `address_fin` varchar(100) DEFAULT NULL,
  `address_swe` varchar(100) DEFAULT NULL,
  `city_fin` varchar(100) DEFAULT NULL,
  `city_swe` varchar(100) DEFAULT NULL,
  `operator` varchar(100) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `coordinate_x` int DEFAULT NULL,
  `coordinate_y` int DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


