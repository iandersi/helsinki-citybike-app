-- hcba.journeys definition

CREATE TABLE `journeys` (
  `departure` datetime DEFAULT NULL,
  `return` datetime DEFAULT NULL,
  `departure_station_id` bigint(20) DEFAULT NULL,
  `departure_station_name` varchar(100) DEFAULT NULL,
  `return_station_id` bigint(20) DEFAULT NULL,
  `return_station_name` varchar(100) DEFAULT NULL,
  `covered_distance_m` bigint(20) DEFAULT NULL,
  `duration_sec` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;