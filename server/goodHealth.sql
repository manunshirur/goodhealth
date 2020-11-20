CREATE DATABASE  IF NOT EXISTS `goodhealth` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `goodhealth`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: goodhealth
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `pharm_id` char(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `text` varchar(4000) DEFAULT NULL,
  `supervisor` char(20) DEFAULT NULL,
  `pharm_co_name` char(30) NOT NULL,
  PRIMARY KEY (`pharm_id`,`pharm_co_name`),
  KEY `pharm_co_name` (`pharm_co_name`),
  CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`pharm_id`) REFERENCES `Pharmacy` (`pharm_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contract_ibfk_2` FOREIGN KEY (`pharm_co_name`) REFERENCES `pharm_co` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES ('1','2019-04-01','2021-04-01','Contract for the drug Adderall','David Goef','Apollo Healthcare'),('10','2019-01-01','2021-12-31','Contract for the drug Tramadol','Harsha Bhogle','Sorrento Inc'),('2','2018-01-01','2020-12-31','Contract for the drug Amlodipine','Mark Taylor','Johnson Johnson'),('3','2020-01-01','2020-12-31','Contract for the drug Humira','Ian Gould','Moderna'),('4','2016-01-01','2024-12-31','Contract for the drug Tramadol','Brendon McCullum','Sorrento Inc'),('5','2019-01-01','2020-12-31','Contract for the drug Adderall','Scott Travis','Apollo Healthcare'),('6','2020-01-01','2021-12-31','Contract for the drug Onpattro','Ricky Ponting','Cyprus HealthCare'),('7','2018-06-05','2022-09-01','Contract for the drug Tramadol','Brian Lara','IBio'),('8','2020-09-01','2030-09-30','Contract for the drug Lyrica','Chris Morris','Good Health Company'),('9','2018-01-01','2020-12-31','Contract for the drug Trazodone','Simon Doull','Aris Global');
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `ssn` char(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `specialty` varchar(30) DEFAULT NULL,
  `yearsOfExperience` int DEFAULT NULL,
  PRIMARY KEY (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES ('112-23-3441','John Smith','Neurologist',2),('123-44-3211','Jim Carey','Surgeon',4),('124-43-3452','Chris Jordan','Cardiologist',1),('124-54-3213','Richard Harris','Surgeon',6),('131-42-5324','Robert Califonia','Pediatrician',4),('132-44-2312','John Doe','Psychologist',1),('134-32-1234','Nicholas Paris','Dentist',3),('142-35-4234','Jofra Archer','Pediatrician',3),('143-22-3415','Amy Right','Cardiologist',2),('152-34-5432','Sam Curran','Dermatologist',5),('154-21-2341','Steve Smith','Dentist',2);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `make_drug`
--

DROP TABLE IF EXISTS `make_drug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `make_drug` (
  `trade_name` char(20) NOT NULL,
  `pharm_co_name` char(30) NOT NULL,
  `formula` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`trade_name`,`pharm_co_name`),
  KEY `pharm_co_name` (`pharm_co_name`),
  CONSTRAINT `make_drug_ibfk_1` FOREIGN KEY (`pharm_co_name`) REFERENCES `pharm_co` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `make_drug`
--

LOCK TABLES `make_drug` WRITE;
/*!40000 ALTER TABLE `make_drug` DISABLE KEYS */;
INSERT INTO `make_drug` VALUES ('Adderall','Apollo Healthcare','(C14H18N6O)2•H2SO4'),('Adderall','Johnson Johnson','(C14H18N6O)2•H2SO4'),('Amlodipine','Johnson Johnson','C8H11N3O3S'),('Amlodipine','Moderna','C8H11N3O3S'),('Dolo-650','Johnson Johnson','N-(1-Phenethyl-4-piperidyl)'),('Dolo-650','Sorrento Inc','N-(1-Phenethyl-4-piperidyl)'),('Humira','Apollo Healthcare','2-Benzenediol'),('Humira','Moderna','2-Benzenediol'),('Lyrica','Good Health Company','(C17H19NO3)2•H2SO4•5H2O'),('Lyrica','IBio','(C17H19NO3)2•H2SO4•5H2O'),('Melatonin','Aris Global','C15H19NO2'),('Melatonin','IBio','C15H19NO2'),('Melatonin','IMED Global','C15H19NO2'),('Melatonin','Millon Healthcare','C15H19NO2'),('Onpattro','Apollo Healthcare','C22H28FNa2O8P'),('Onpattro','Cyprus HealthCare','C22H28FNa2O8P'),('Onpattro','Good Health Company','C22H28FNa2O8P'),('Onpattro','IBio','C22H28FNa2O8P'),('Tramadol','Cyprus HealthCare','C257H383N65O77S6'),('Tramadol','IBio','C257H383N65O77S6'),('Tramadol','Johnson Johnson','C257H383N65O77S6'),('Tramadol','Sorrento Inc','C257H383N65O77S6'),('Trazodone','Aris Global','C9H13N3O3'),('Trazodone','Moderna','C9H13N3O3');
/*!40000 ALTER TABLE `make_drug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharm_co`
--

DROP TABLE IF EXISTS `pharm_co`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharm_co` (
  `name` varchar(30) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharm_co`
--

LOCK TABLES `pharm_co` WRITE;
/*!40000 ALTER TABLE `pharm_co` DISABLE KEYS */;
INSERT INTO `pharm_co` VALUES ('Apollo Healthcare','618-909-8793'),('Aris Global','567-532-1489'),('Cyprus HealthCare','367-980-2456'),('Good Health Company','156-654-1432'),('IBio','123-789-3456'),('IMED Global','786-098-1257'),('Johnson Johnson','478-098-3454'),('Millon Healthcare','453-567-1267'),('Moderna','123-543-1532'),('Sorrento Inc','424-131-6789');
/*!40000 ALTER TABLE `pharm_co` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacy`
--

DROP TABLE IF EXISTS `pharmacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacy` (
  `pharm_id` varchar(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`pharm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacy`
--

LOCK TABLES `pharmacy` WRITE;
/*!40000 ALTER TABLE `pharmacy` DISABLE KEYS */;
INSERT INTO `pharmacy` VALUES ('1','CVS Pharma','12, Lincoln Drive, IL','123-456-7886'),('10','Medic Pharma','41, Wall street, NY','762-134-7766'),('2','Walgreens Pharma','315, Walgreen Street, IL','612-345-6785'),('3','ABC Pharma','23, Church Street, CA','345-903-4210'),('4','Emed Pharma','1, Doughlas Avenue, LA','412-345-1234'),('5','IMED global Pharma','5, East College Street','231-456-6412'),('6','Apollo Pharma','6, Dollars Street, OH','542-152-9245'),('7','Fortis Pharma','18, Richard Road, CA','765-234-1234'),('8','MedPlus Pharma','21, Marion Street, IL','812-432-1562'),('9','Rotary Pharma','122, Club Street, GA','914-234-5632');
/*!40000 ALTER TABLE `pharmacy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `pre_id` int NOT NULL AUTO_INCREMENT,
  `status` char(20) DEFAULT 'PENDING',
  `drop_off_time` timestamp NULL DEFAULT NULL,
  `pick_up_time` timestamp NULL DEFAULT NULL,
  `ssn` char(11) DEFAULT NULL,
  `phy_ssn` char(11) DEFAULT NULL,
  `pre_date` date DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `trade_name` char(20) DEFAULT NULL,
  `pharm_co_name` char(30) DEFAULT NULL,
  PRIMARY KEY (`pre_id`),
  KEY `phy_ssn` (`phy_ssn`),
  KEY `trade_name` (`trade_name`,`pharm_co_name`),
  KEY `ssn` (`ssn`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`phy_ssn`) REFERENCES `doctor` (`ssn`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`ssn`) REFERENCES `pri_phy_patient` (`ssn`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `prescription_ibfk_3` FOREIGN KEY (`trade_name`, `pharm_co_name`) REFERENCES `Make_Drug` (`trade_name`, `pharm_co_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (1,'COMPLETED','2020-01-02 08:58:09','2020-01-02 09:58:09','242-54-2315','131-42-5324','2020-01-09',3,'Adderall','Apollo Healthcare'),(2,'READY TO GO','2020-01-13 09:58:09',NULL,'241-23-5124','152-34-5432','2020-01-12',2,'Adderall','Johnson Johnson'),(3,'PENDING',NULL,NULL,'243-24-3452','143-22-3415','2020-10-09',1,'Amlodipine','Moderna'),(4,'CANCELLED',NULL,NULL,'242-14-1534','152-34-5432','2020-10-11',1,'Trazodone','Moderna'),(5,'COMPLETED','2020-10-24 06:58:09','2020-10-24 07:58:09','232-43-3451','142-35-4234','2020-10-23',5,'Onpattro','Cyprus HealthCare'),(6,'READY TO GO','2020-11-02 08:58:09',NULL,'222-32-1232','154-21-2341','2020-11-01',4,'Tramadol','Cyprus HealthCare'),(7,'PENDING',NULL,NULL,'212-34-5234','124-54-3213','2020-08-01',10,'Melatonin','Millon Healthcare'),(8,'CANCELLED',NULL,NULL,'214-12-3452','112-23-3441','2020-08-10',2,'Lyrica','IBio'),(9,'CANCELLED',NULL,NULL,'213-31-2341','123-44-3211','2020-08-15',1,'Lyrica','Good Health Company'),(10,'PENDING',NULL,NULL,'253-34-1543','131-42-5324','2020-06-01',3,'Trazodone','Aris Global'),(11,'READY TO GO','2020-05-02 06:58:09',NULL,'212-34-5234','124-54-3213','2020-05-01',7,'Melatonin','Aris Global'),(12,'COMPLETED','2020-08-09 06:58:09','2020-08-09 07:58:09','252-34-5423','134-32-1234','2020-08-08',4,'Humira','Apollo Healthcare'),(13,'COMPLETED','2020-04-02 06:58:09','2020-04-02 07:58:09','254-24-5323','124-43-3452','2020-04-01',7,'Humira','Moderna'),(14,'READY TO GO','2020-02-04 08:58:09',NULL,'211-13-2451','143-22-3415','2020-02-03',6,'Dolo-650','Sorrento Inc'),(15,'PENDING',NULL,NULL,'242-54-2315','131-42-5324','2020-03-04',8,'Melatonin','IMED Global'),(16,'CANCELLED',NULL,NULL,'255-12-2315','123-44-3211','2020-08-17',9,'Onpattro','Good Health Company');
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pri_phy_patient`
--

DROP TABLE IF EXISTS `pri_phy_patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pri_phy_patient` (
  `ssn` char(11) NOT NULL,
  `name` char(20) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `address` char(40) DEFAULT NULL,
  `phy_ssn` char(11) DEFAULT NULL,
  PRIMARY KEY (`ssn`),
  KEY `phy_ssn` (`phy_ssn`),
  CONSTRAINT `pri_phy_patient_ibfk_1` FOREIGN KEY (`phy_ssn`) REFERENCES `doctor` (`ssn`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pri_phy_patient`
--

LOCK TABLES `pri_phy_patient` WRITE;
/*!40000 ALTER TABLE `pri_phy_patient` DISABLE KEYS */;
INSERT INTO `pri_phy_patient` VALUES ('211-13-2451','Angela Markel','1989-03-05','6, Church Street, NY','143-22-3415'),('212-34-5234','Dwight Light','1990-04-27','3, Beet Farms, NY','124-54-3213'),('213-31-2341','Pam Beasley','1996-02-01','1, Lincoln Street, CA','123-44-3211'),('214-12-3452','Oscar Fernandes','1986-10-11','5, New Mexican Street, NY','112-23-3441'),('222-32-1232','Jim Harper','1986-09-11','10, Office street, NY','154-21-2341'),('232-43-3451','Kevin Malone','1980-01-01','15, Sauce Valley, CA','142-35-4234'),('241-23-5124','Darryl Philips','1972-09-08','45, Old Church Street, NY','152-34-5432'),('242-14-1534','Toby Hertz','1976-04-21','21, HR Street, NY','152-34-5432'),('242-54-2315','Creed Reed','1952-08-24','12, Old Rock, IL','131-42-5324'),('243-24-3452','Meredith Palm','1965-09-18','11, Poor Richard Street, IL','143-22-3415'),('244-34-2412','Jan Lewis','1976-01-01','15, Corporate End, KA','123-44-3211'),('251-15-2535','Ryan Patrick','1983-08-18','15, Poplar street, LA','132-44-2312'),('252-34-5423','Andrew Bernard','1982-10-26','12, Cornell Street, IL','134-32-1234'),('253-34-1543','Kelly Kapoor','1985-12-21','14, Old Indian Street, NC','131-42-5324'),('254-24-5323','Michael Scott','1975-04-01','1, Scranton Street, PY','124-43-3452'),('255-12-2315','Stanley Hutson','1960-01-01','15, E College Street, IL','123-44-3211');
/*!40000 ALTER TABLE `pri_phy_patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sell`
--

DROP TABLE IF EXISTS `sell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sell` (
  `price` int DEFAULT NULL,
  `pharm_id` char(11) NOT NULL,
  `trade_name` char(20) NOT NULL,
  `pharm_co_name` char(30) NOT NULL,
  PRIMARY KEY (`pharm_id`,`trade_name`,`pharm_co_name`),
  KEY `trade_name` (`trade_name`,`pharm_co_name`),
  CONSTRAINT `sell_ibfk_1` FOREIGN KEY (`trade_name`, `pharm_co_name`) REFERENCES `Make_Drug` (`trade_name`, `pharm_co_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sell_ibfk_2` FOREIGN KEY (`pharm_id`) REFERENCES `pharmacy` (`pharm_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sell`
--

LOCK TABLES `sell` WRITE;
/*!40000 ALTER TABLE `sell` DISABLE KEYS */;
INSERT INTO `sell` VALUES (1,'1','Adderall','Apollo Healthcare'),(2,'1','Amlodipine','Moderna'),(9,'1','Dolo-650','Johnson Johnson'),(4,'1','Lyrica','Good Health Company'),(3,'10','Melatonin','Millon Healthcare'),(4,'10','Tramadol','Sorrento Inc'),(4,'2','Adderall','Johnson Johnson'),(6,'2','Amlodipine','Johnson Johnson'),(4,'2','Dolo-650','Sorrento Inc'),(7,'2','Lyrica','IBio'),(6,'2','Trazodone','Moderna'),(5,'3','Humira','Moderna'),(2,'3','Melatonin','IMED Global'),(9,'3','Onpattro','Good Health Company'),(1,'3','Tramadol','Cyprus HealthCare'),(2,'4','Tramadol','IBio'),(2,'5','Amlodipine','Johnson Johnson'),(14,'5','Lyrica','IBio'),(6,'6','Amlodipine','Moderna'),(15,'6','Onpattro','Cyprus HealthCare'),(6,'7','Tramadol','Sorrento Inc'),(10,'8','Lyrica','Good Health Company'),(8,'9','Onpattro','Apollo Healthcare'),(12,'9','Trazodone','Aris Global');
/*!40000 ALTER TABLE `sell` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-19 19:01:58
