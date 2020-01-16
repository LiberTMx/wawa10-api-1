-- phpMyAdmin SQL Dump
-- version OVH
-- https://www.phpmyadmin.net/
--
-- Hôte : liwanuopwawa.mysql.db
-- Généré le :  lun. 13 jan. 2020 à 01:55
-- Version du serveur :  5.6.43-log
-- Version de PHP :  7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `liwanuopwawa`
--

-- --------------------------------------------------------

--
-- Structure de la table `membre_parents`
--

CREATE TABLE `membre_parents` (
  `id` int(11) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `id_enfant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `membre_parents`
--

INSERT INTO `membre_parents` (`id`, `id_parent`, `id_enfant`) VALUES
(1, 21, 1),
(9, 36, 37),
(11, 89, 117),
(30, 299, 102),
(37, 57, 312),
(43, 22, 198),
(63, 357, 350),
(64, 357, 356),
(73, 384, 385),
(80, 408, 399),
(82, 409, 399),
(84, 417, 274),
(92, 462, 457),
(93, 462, 458),
(94, 463, 457),
(95, 463, 458),
(97, 475, 201),
(101, 89, 142),
(102, 482, 406),
(103, 75, 530),
(104, 536, 535),
(105, 536, 525),
(106, 536, 492);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `membre_parents`
--
ALTER TABLE `membre_parents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `membre_parents`
--
ALTER TABLE `membre_parents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
