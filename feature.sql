DROP TABLE IF EXISTS Feature;
CREATE TABLE Feature (
                       Devicename VARCHAR(255),
                       featurecontent VARCHAR(255) NOT NULL ,
                      	CONSTRAINT featureFK FOREIGN KEY (Devicename) REFERENCES Devices (Devicename)

  );