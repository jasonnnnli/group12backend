DROP TABLE IF EXISTS Review;
CREATE TABLE Review (Username VARCHAR(255) NOT NULL UNIQUE,
                       Devicename VARCHAR(255) NOT NULL UNIQUE,
                       Reviewcontent VARCHAR(255) NOT NULL ,
                       Rating VARCHAR(255) NOT NULL,
                       CONSTRAINT ReviewFK FOREIGN KEY (Username) REFERENCES members (Username),
                      	CONSTRAINT ReviedwFK FOREIGN KEY (Devicename) REFERENCES Device (Devicename)

  );