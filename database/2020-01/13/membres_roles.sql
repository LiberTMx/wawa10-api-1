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
-- Structure de la table `membres_roles`
--

CREATE TABLE `membres_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `abrev` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `comite` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `membres_roles`
--

INSERT INTO `membres_roles` (`id`, `role`, `abrev`, `description`, `created_at`, `updated_at`, `comite`) VALUES
(1, 'Président', 'P', NULL, '2012-09-29 23:53:53', '2012-09-29 23:53:56', 100),
(2, 'Secrétaire', 'S', NULL, '2012-09-29 23:54:23', '2012-09-29 23:54:25', 200),
(3, 'Trésorier', 'T', NULL, '2012-09-29 23:54:47', '2012-09-29 23:54:50', 300),
(4, 'Membre', 'M', NULL, '2012-09-29 23:55:20', '2012-09-29 23:55:23', 0),
(5, 'Membre Comité', 'MC', NULL, '2012-09-29 23:55:42', '2012-09-29 23:55:45', 900),
(6, '- Externe -', 'EX', NULL, '2012-10-30 18:17:51', '2012-10-30 18:17:53', 0),
(7, 'Membre-Vérificateur Comptes', 'MVC', NULL, '2012-11-06 22:20:51', '2012-11-06 22:20:54', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `membres_roles`
--
ALTER TABLE `membres_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `membrerole_role_ix1` (`role`),
  ADD UNIQUE KEY `membrerole_abrev_ix1` (`abrev`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `membres_roles`
--
ALTER TABLE `membres_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
