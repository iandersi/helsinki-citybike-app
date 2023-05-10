-- hcba.journeys definition

CREATE TABLE `journeys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departure_date_time` datetime DEFAULT NULL,
  `return_date_time` datetime DEFAULT NULL,
  `departure_station_id` int DEFAULT NULL,
  `departure_station_name` varchar(100) DEFAULT NULL,
  `return_station_id` int DEFAULT NULL,
  `return_station_name` varchar(100) DEFAULT NULL,
  `covered_distance_m` int DEFAULT NULL,
  `duration_sec` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journeys_departure_station_id_IDX` (`departure_station_id`) USING BTREE,
  KEY `journeys_return_station_id_IDX` (`return_station_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;