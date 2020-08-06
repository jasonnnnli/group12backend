DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews (Username VARCHAR(255),
                       Devicename VARCHAR(255),
                       Reviewcontent VARCHAR(255) NOT NULL ,
                       Rating VARCHAR(255) NOT NULL,
                       CONSTRAINT ReviewFK FOREIGN KEY (Username) REFERENCES members (Username),
                      	CONSTRAINT ReviedwFK FOREIGN KEY (Devicename) REFERENCES Devices (Devicename)

  );