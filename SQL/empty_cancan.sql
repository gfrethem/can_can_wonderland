-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 17, 2016 at 10:10 AM
-- Server version: 5.5.42-37.1
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gfrethem_cancan`
--

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phonenumber` varchar(14) COLLATE utf8_unicode_ci DEFAULT NULL,
  `adultnumber` int(2) DEFAULT NULL,
  `childnumber` int(2) DEFAULT NULL,
  `numslots` int(1) NOT NULL,
  `checkedin` tinyint(1) NOT NULL DEFAULT '0',
  `reservation` tinyint(1) NOT NULL DEFAULT '0',
  `datetime` datetime NOT NULL,
  `notes` text COLLATE utf8_unicode_ci
) ENGINE=MyISAM AUTO_INCREMENT=303 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL,
  `adultprice` int(10) NOT NULL,
  `childprice` int(10) NOT NULL,
  `walkuptimeslots` int(2) NOT NULL,
  `onlinerestimeslots` int(2) NOT NULL,
  `minperslot` int(2) NOT NULL,
  `maxperslot` int(2) NOT NULL,
  `mopen` time NOT NULL,
  `mclose` time NOT NULL,
  `tuopen` time NOT NULL,
  `tuclose` time NOT NULL,
  `wopen` time NOT NULL,
  `wclose` time NOT NULL,
  `thopen` time NOT NULL,
  `thclose` time NOT NULL,
  `fopen` time NOT NULL,
  `fclose` time NOT NULL,
  `saopen` time NOT NULL,
  `saclose` time NOT NULL,
  `suopen` time NOT NULL,
  `suclose` time NOT NULL,
  `specialmessage` text COLLATE utf8_unicode_ci
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `adultprice`, `childprice`, `walkuptimeslots`, `onlinerestimeslots`, `minperslot`, `maxperslot`, `mopen`, `mclose`, `tuopen`, `tuclose`, `wopen`, `wclose`, `thopen`, `thclose`, `fopen`, `fclose`, `saopen`, `saclose`, `suopen`, `suclose`, `specialmessage`) VALUES
(1, 12, 8, 2, 3, 2, 4, '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '10:00:00', '22:00:00', '10:00:00', '22:00:00', '10:00:00', '22:00:00', '10:00:00', '22:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phonenumber` varchar(14) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facetoken` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faceid` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `phonenumber`, `facetoken`, `faceid`) VALUES
(1, 'admin', '$2a$10$JPSmkEjeNFLUZtGT6eliMuDEFZeOB4s7Ja400/PlmabCubrL6.Yja', 'admin', NULL, NULL, NULL),
(2, 'frontdesk', '$2a$10$u.uhqYGCUYzP8kxuss28jO0Xl327CN7PQZ2.lB7kxn3Rw0P8y0huC', 'frontdesk', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=303;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=72;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
