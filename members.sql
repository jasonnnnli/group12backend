DROP TABLE IF EXISTS Members;
CREATE TABLE Members (MemberID VARCHAR(255),
                        FirstName VARCHAR(255) NOT NULL,
  		              LastName VARCHAR(255) NOT NULL,
                        Username VARCHAR(255) PRIMARY KEY,
                        Email VARCHAR(255) NOT NULL UNIQUE,
                        Password VARCHAR(255) NOT NULL,
                        SALT VARCHAR(255),
                        Verification INT DEFAULT 0
  );