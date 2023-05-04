tail -n +2 /docker-entrypoint-initdb.d/2021-05.csv | tac > /docker-entrypoint-initdb.d/2021-05-prepared.csv
tail -n +2 /docker-entrypoint-initdb.d/2021-06.csv | tac > /docker-entrypoint-initdb.d/2021-06-prepared.csv
tail -n +2 /docker-entrypoint-initdb.d/2021-07.csv | tac > /docker-entrypoint-initdb.d/2021-07-prepared.csv

