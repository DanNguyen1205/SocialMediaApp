-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ioniagram
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `idcomments` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(90) NOT NULL,
  `commenterid` int NOT NULL,
  `postid` int NOT NULL,
  PRIMARY KEY (`idcomments`),
  KEY `commenterind_idx` (`commenterid`),
  KEY `postid_idx` (`postid`),
  CONSTRAINT `commenterind` FOREIGN KEY (`commenterid`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postid` FOREIGN KEY (`postid`) REFERENCES `posts` (`idposts`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'asdasd',1,1),(2,'asdasdasdasd',1,1),(3,'asdasdasdasdasdasd',1,1),(4,'asdasd',1,3),(5,'asdasd',1,3),(6,'asdasd',1,5),(7,'asdasdasdasd',1,5),(8,'asdasdasdasdasdasd',1,5),(9,'asdasdasdasdasdasdasdasd',1,5),(10,'asdasdasdasdasdasdasdasdasdasd',1,5),(11,'asdasd',1,5),(12,'asdasd',1,4),(13,'asdasd',1,2),(14,'asdasd',1,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `idlikes` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `postid` int NOT NULL,
  PRIMARY KEY (`idlikes`),
  KEY `userid_idx` (`userid`),
  KEY `postid_idx` (`postid`),
  CONSTRAINT `likePostid` FOREIGN KEY (`postid`) REFERENCES `posts` (`idposts`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likeUserid` FOREIGN KEY (`userid`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (43,1,3),(50,1,2),(51,1,5),(52,1,4),(58,5,3),(61,5,2);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `idposts` int NOT NULL AUTO_INCREMENT,
  `caption` varchar(45) DEFAULT NULL,
  `imageName` varchar(90) DEFAULT NULL,
  `userid` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idposts`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'First post here','1e92b362c88ee92c56e77fb1ed9a10888ddd6a63b25b059bba5fb676970f927f',2,'2024-01-05 05:33:33'),(2,'Wow first post again!','506fb0b1cba95f7bdf9f53bb1254147279ac198f64cdf375ad1961728e4f6a80',1,'2024-01-05 05:33:33'),(3,'Second post ! ','09a75b6e21d6876a288ccdb4b5143276f5f6a79fb5a77e2b54b64945d4cfc12a',2,'2024-01-05 05:33:33'),(4,'blablabla','aa1970702d3f3b6978b3f0db79751bb7b4a65bc45a7269aa852e140cfad66377',1,'2024-01-05 05:33:33'),(5,'Wadup big post if u know wadup','59dc4243d794a10020a7528bd41c184509ee5cb1a82c82383d752f3955a2757a',1,'2024-01-05 05:33:33');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationships`
--

DROP TABLE IF EXISTS `relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationships` (
  `idrelationships` int NOT NULL AUTO_INCREMENT,
  `followerUserid` int NOT NULL,
  `followedUserid` int NOT NULL,
  PRIMARY KEY (`idrelationships`),
  KEY `followerUser_idx` (`followerUserid`),
  KEY `protagUser_idx` (`followedUserid`),
  CONSTRAINT `followerUser` FOREIGN KEY (`followerUserid`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `protagUser` FOREIGN KEY (`followedUserid`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationships`
--

LOCK TABLES `relationships` WRITE;
/*!40000 ALTER TABLE `relationships` DISABLE KEYS */;
INSERT INTO `relationships` VALUES (1,1,2),(3,5,1);
/*!40000 ALTER TABLE `relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(45) NOT NULL,
  `age` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Irelia',23,'irelia@gmail.com','$2b$13$cs1cqPzNrpAeS5WPHYWR1OvUGdljF1qPF4SteQMGFlGrPcALq1RMK'),(2,'Akali',23,'akali@gmail.com','123123'),(3,'Zed',30,'zed@gmail.com','123123'),(5,'Shen',50,'shen@gmail.com','$2b$13$cs1cqPzNrpAeS5WPHYWR1OvUGdljF1qPF4SteQMGFlGrPcALq1RMK'),(6,'Jhin',40,'jhin@gmail.com','$2b$13$fDPpFurEBW0IidGYxbHISeiIVWC4RZl6aC2oowmzx99.FuJ7byz1K');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-08 20:30:00
