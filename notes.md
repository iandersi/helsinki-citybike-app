## Notes

* Helsinki fields in the original data are empty.
* Data is duplicated in each file, so I deleted half of the rows in each of the data files during journeys data import.
* Date in data is "the wrong way around" (newest to oldest, next month newest to oldest again etc) so I had to create a script that turns them around. The purpose of this was to get the ids in descending order.


* After trying to run this app on a different computer using a different OS (Linux PopOS), I noticed the db folder does not have required permissions so my script could not run. I had to create a separate script in the backend folder that creates the prepared files into the db folder before using docker-compose up.


* You have to keep the default names so that the scripts will work. The stations name has to be modified otherwise the umlauts in the name cannot be read on Linux or MacOS properly.


* I realize the scripts are not the most ideal way to do things in this case, and initially I was not planning on making them but in the end I had to because there were so many issues with the data. I wanted the backend setup process to be automated. There is probably a more efficient way to deal with it.
