-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 12 juin 2024 à 15:55
-- Version du serveur : 8.0.36-0ubuntu0.22.04.1
-- Version de PHP : 8.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jobodyssey`
--

-- --------------------------------------------------------

--
-- Structure de la table `Chats`
--

CREATE TABLE `Chats` (
  `id` int NOT NULL,
  `offreId` int DEFAULT NULL,
  `companyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `message` text,
  `file1` varchar(255) DEFAULT NULL,
  `file2` varchar(255) DEFAULT NULL,
  `file3` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `Chats`
--

INSERT INTO `Chats` (`id`, `offreId`, `companyId`, `userId`, `sender`, `message`, `file1`, `file2`, `file3`, `createdAt`, `updatedAt`) VALUES
(1, 11, 1, 3, 'Role_User', 'test', NULL, NULL, NULL, '2024-05-27 15:26:18', '2024-05-27 15:26:18'),
(2, 11, 1, 3, 'Role_User', 'test', '1fe549f610efab43d94df51290d66d39.jpg', NULL, NULL, '2024-05-27 15:27:12', '2024-05-27 15:27:12'),
(3, 11, 1, 3, 'Role_Company', 'dsqd', NULL, NULL, NULL, '2024-05-27 15:36:56', '2024-05-27 15:36:56'),
(4, 11, 1, 3, 'Role_User', 'qdsdsdqd', NULL, NULL, NULL, '2024-05-27 15:37:05', '2024-05-27 15:37:05'),
(5, 11, 1, 3, 'Role_User', 'fdf', NULL, NULL, NULL, '2024-05-27 15:48:28', '2024-05-27 15:48:28'),
(6, 11, 1, 3, 'Role_User', 'tape', NULL, NULL, NULL, '2024-05-28 12:05:49', '2024-05-28 12:05:49');

-- --------------------------------------------------------

--
-- Structure de la table `Companies`
--

CREATE TABLE `Companies` (
  `id` int NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `presentation` text NOT NULL,
  `logo` varchar(255) NOT NULL,
  `banner` varchar(255) NOT NULL,
  `Linkedin` varchar(255) DEFAULT NULL,
  `partenaire` tinyint(1) NOT NULL DEFAULT '0',
  `Instagram` varchar(255) DEFAULT NULL,
  `X` varchar(255) DEFAULT NULL,
  `Facebook` varchar(255) DEFAULT NULL,
  `Github` varchar(255) DEFAULT NULL,
  `Site` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `Companies`
--

INSERT INTO `Companies` (`id`, `role`, `email`, `password`, `name`, `activity`, `presentation`, `logo`, `banner`, `Linkedin`, `partenaire`, `Instagram`, `X`, `Facebook`, `Github`, `Site`, `createdAt`, `updatedAt`) VALUES
(1, 'Role_Company', 'contact@techvision.com', '$2b$10$0DerNLLbU2vvNTNo0mdd0.TFI/LYX1EywvBCuPkYGyNVwdO0vvhUe', ' TechVision', 'Technologie de l\'information', 'TechVision est une entreprise innovante spécialisée dans le développement de solutions technologiques avancées. Nous nous efforçons de transformer les défis technologiques en opportunités, en fournissant des services de développement logiciel, d\'analyse de données et de cybersécurité. Notre mission est d\'aider nos clients à naviguer dans l\'ère numérique avec des solutions personnalisées et efficaces. Chez TechVision, nous croyons en l\'innovation continue et en l\'amélioration des compétences de notre équipe pour rester à la pointe de la technologie.', '023a09b51e26f504b3aedbc889058103.jpg', '5de848e1ba6f3903bd9d91a7caa9731a.png', 'a définir', 0, 'a définir', 'https://x.com', 'a définir', 'a définir', 'https://quentinbrandy.fr', '2024-05-27 13:09:41', '2024-05-30 09:45:04'),
(2, 'Role_Company', 'info@greenworld.com', '$2b$10$4rw6SoqHMDI82bgxgMnqvuM8nAAEFPIWAKqM9BWa9jBPop7bv4da2', 'GreenWorld', 'Autres services (nettoyage, sécurité, etc.)', 'GreenWorld est une entreprise dédiée à la promotion des énergies renouvelables et à la protection de l\'environnement. Nous proposons des solutions durables et écologiques pour les particuliers et les entreprises, allant de l\'installation de panneaux solaires à la gestion des déchets et à la conservation de la biodiversité. Notre objectif est de contribuer à un avenir plus vert en réduisant l\'empreinte carbone et en sensibilisant nos clients aux pratiques durables. Chez GreenWorld, nous sommes passionnés par la planète et déterminés à faire une différence positive.', '4526b2aedf9c1a87232de3036950d39e.jpg', 'f754d53a14294545f62b64154efedda9.png', 'a définir', 0, 'https://instagram.fr', 'a définir', 'a définir', 'a définir', 'https://quentinbrandy.fr', '2024-05-27 13:11:09', '2024-05-30 09:46:21');

-- --------------------------------------------------------

--
-- Structure de la table `Experiences`
--

CREATE TABLE `Experiences` (
  `id` int NOT NULL,
  `nomJob` varchar(255) DEFAULT NULL,
  `nomEntreprise` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `description` text,
  `dateDebut` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  `contrat` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Structure de la table `Offres`
--

CREATE TABLE `Offres` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `lieu` varchar(255) NOT NULL,
  `contrat` varchar(255) NOT NULL,
  `télétravail` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `compétences` text NOT NULL,
  `domaine` varchar(255) NOT NULL,
  `salaire` int NOT NULL DEFAULT '0',
  `adresse` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `companyId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `Offres`
--

INSERT INTO `Offres` (`id`, `name`, `lieu`, `contrat`, `télétravail`, `description`, `compétences`, `domaine`, `salaire`, `adresse`, `active`, `companyId`, `createdAt`, `updatedAt`) VALUES
(1, 'Ingénieur en Énergies Renouvelables', 'Paris, France', 'CDI', 'Partielle', 'GreenWorld recherche un Ingénieur en Énergies Renouvelables pour rejoindre notre équipe dynamique à Paris. Le candidat idéal participera au développement et à l\'optimisation de solutions d\'énergies renouvelables, incluant l\'énergie solaire, éolienne et hydraulique. Il travaillera en étroite collaboration avec notre équipe de recherche pour développer des projets durables et innovants.', 'Diplôme en ingénierie (énergie renouvelable, génie électrique, etc.)\nExpérience en gestion de projets d\'énergies renouvelables\nConnaissance des logiciels de simulation énergétique (PVsyst, WindPRO)\nCompétences en analyse de données et en optimisation énergétique\nExcellentes compétences en communication et travail en équipe', 'Agriculture, sylviculture et pêche', 50000, '12 Rue de la Paix, 75002 Paris, France', 1, 2, '2024-05-27 14:51:51', '2024-05-27 14:51:51'),
(2, 'Ingénieur en Énergies Renouvelables', 'Paris, France', 'CDI', 'Partielle', 'GreenWorld recherche un Ingénieur en Énergies Renouvelables pour rejoindre notre équipe dynamique à Paris. Le candidat idéal participera au développement et à l\'optimisation de solutions d\'énergies renouvelables, incluant l\'énergie solaire, éolienne et hydraulique. Il travaillera en étroite collaboration avec notre équipe de recherche pour développer des projets durables et innovants.', 'Diplôme en ingénierie (énergie renouvelable, génie électrique, etc.)\nExpérience en gestion de projets d\'énergies renouvelables\nConnaissance des logiciels de simulation énergétique (PVsyst, WindPRO)\nCompétences en analyse de données et en optimisation énergétique\nExcellentes compétences en communication et travail en équipe', 'Agriculture, sylviculture et pêche', 50000, '12 Rue de la Paix, 75002 Paris, France', 1, 2, '2024-05-27 14:52:27', '2024-05-27 14:52:27'),
(4, 'Ingénieur en Énergies Renouvelables', 'Paris, France', 'CDI', 'Partielle', 'GreenWorld recherche un Ingénieur en Énergies Renouvelables pour rejoindre notre équipe dynamique à Paris. Le candidat idéal participera au développement et à l\'optimisation de solutions d\'énergies renouvelables, incluant l\'énergie solaire, éolienne et hydraulique. Il travaillera en étroite collaboration avec notre équipe de recherche pour développer des projets durables et innovants.', 't', 'Agriculture, sylviculture et pêche', 50000, '12 Rue de la Paix, 75002 Paris, France', 1, 2, '2024-05-27 14:57:14', '2024-05-27 14:57:14'),
(5, 'Chef de Projet Écologique', 'Lyon, France', 'CDI', 'Partielle', 'Nous recherchons un Chef de Projet Écologique pour superviser et coordonner divers projets de conservation et de développement durable à Lyon. Le candidat sera responsable de la planification, de l\'exécution et du suivi de projets environnementaux, en s\'assurant de leur conformité aux réglementations et standards environnementaux.', 'Diplôme en sciences environnementales, gestion de projet ou domaine connexe\nExpérience en gestion de projets écologiques\nConnaissance des réglementations environnementales locales et internationales\nCompétences en leadership et gestion d\'équipe\nCapacité à travailler avec des parties prenantes variées', 'Industrie électrique et électronique', 45000, '18 Rue des Écologistes, 69002 Lyon, France', 1, 2, '2024-05-27 14:57:14', '2024-05-27 14:57:14'),
(6, 'Ingénieur en Énergies Renouvelables', 'Paris, France', 'CDI', 'Partielle', 'GreenWorld recherche un Ingénieur en Énergies Renouvelables pour rejoindre notre équipe dynamique à Paris. Le candidat idéal participera au développement et à l\'optimisation de solutions d\'énergies renouvelables, incluant l\'énergie solaire, éolienne et hydraulique. Il travaillera en étroite collaboration avec notre équipe de recherche pour développer des projets durables et innovants.', 't', 'Agriculture, sylviculture et pêche', 50000, '12 Rue de la Paix, 75002 Paris, France', 1, 2, '2024-05-27 14:58:09', '2024-05-27 14:58:09'),
(7, 'Consultant en Développement Durable', 'Bordeaux, France', 'CDI', 'Autorisé', 'GreenWorld est à la recherche d\'un Consultant en Développement Durable pour conseiller nos clients sur les meilleures pratiques en matière de durabilité et de responsabilité sociale des entreprises. Le consultant aidera à développer des stratégies durables, à réaliser des audits et à proposer des solutions innovantes pour améliorer l\'empreinte écologique des entreprises.', 'Diplôme en développement durable, sciences environnementales ou domaine connexe\nExpérience en conseil en développement durable\nSolides compétences analytiques et de résolution de problèmes\nExcellentes compétences en communication et présentation\nCapacité à travailler de manière autonome et en équipe', 'Autres services (nettoyage, sécurité, etc.)', 40000, '22 Rue Verte, 33000 Bordeaux, France', 1, 2, '2024-05-27 14:58:09', '2024-05-27 14:58:09'),
(8, 'Ingénieur en Énergies Renouvelables', 'Paris, France', 'CDI', 'Partielle', 'GreenWorld recherche un Ingénieur en Énergies Renouvelables pour rejoindre notre équipe dynamique à Paris. Le candidat idéal participera au développement et à l\'optimisation de solutions d\'énergies renouvelables, incluant l\'énergie solaire, éolienne et hydraulique. Il travaillera en étroite collaboration avec notre équipe de recherche pour développer des projets durables et innovants.', 't', 'Agriculture, sylviculture et pêche', 50000, '12 Rue de la Paix, 75002 Paris, France', 1, 2, '2024-05-27 15:02:26', '2024-05-27 15:02:26'),
(9, 'Développeur Logiciel Full Stack', 'Paris, France', 'CDI', 'Interdit', 'TechVision recherche un Développeur Logiciel Full Stack passionné pour rejoindre notre équipe à Paris. Le candidat idéal participera au développement de solutions logicielles innovantes et évolutives. Il sera impliqué dans toutes les phases du cycle de développement logiciel, de la conception à la mise en production, en passant par les tests et la maintenance.', 'Diplôme en informatique ou domaine connexe\nExpérience en développement Full Stack (JavaScript, Node.js, React, MongoDB)\nConnaissance des pratiques DevOps et des outils CI/CD\nExcellentes compétences en résolution de problèmes et en débogage\nCapacité à travailler en équipe dans un environnement Agile', 'Services aux entreprises (conseil, ingénierie, R&D, etc.)', 55000, '10 Rue des Innovateurs, 75015 Paris, France', 1, 1, '2024-05-27 15:02:27', '2024-05-27 15:02:27'),
(10, 'Ingénieur en Énergies Renouvelables', 'Paris, France', 'CDI', 'Partielle', 'GreenWorld recherche un Ingénieur en Énergies Renouvelables pour rejoindre notre équipe dynamique à Paris. Le candidat idéal participera au développement et à l\'optimisation de solutions d\'énergies renouvelables, incluant l\'énergie solaire, éolienne et hydraulique. Il travaillera en étroite collaboration avec notre équipe de recherche pour développer des projets durables et innovants.', 't', 'Agriculture, sylviculture et pêche', 50000, '12 Rue de la Paix, 75002 Paris, France', 1, 2, '2024-05-27 15:03:10', '2024-05-27 15:03:10'),
(11, ' Data Scientist', ' Lyon, France', 'CDI', 'Partielle', 'Nous recherchons un Data Scientist talentueux pour rejoindre notre équipe à Lyon. Le candidat sera responsable de l\'analyse et de l\'interprétation de grandes quantités de données afin de développer des solutions basées sur l\'IA et le machine learning pour nos clients. Il collaborera étroitement avec nos équipes de développement et de produits pour transformer les données en informations exploitables.\n\n', 'Diplôme en statistiques, mathématiques, informatique ou domaine connexe\nExpérience en analyse de données et en machine learning\nConnaissance des langages de programmation Python et R\nCompétences en visualisation de données avec des outils comme Tableau ou PowerBI\nExcellentes compétences en communication et capacité à expliquer des concepts complexes', 'Services informatiques et de télécommunications', 60000, '25 Avenue des Données, 69003 Lyon, France', 1, 1, '2024-05-27 15:03:10', '2024-05-27 15:03:10');

-- --------------------------------------------------------

--
-- Structure de la table `OffreUsers`
--

CREATE TABLE `OffreUsers` (
  `id` int NOT NULL,
  `OffreId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  `statut` varchar(255) DEFAULT 'en attente',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `OffreUsers`
--

INSERT INTO `OffreUsers` (`id`, `OffreId`, `UserId`, `statut`, `createdAt`, `updatedAt`) VALUES
(1, 11, 3, 'accepté', '2024-05-27 15:25:06', '2024-05-27 15:26:05');

-- --------------------------------------------------------

--
-- Structure de la table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20240417134726-create-company.js'),
('20240422135221-create-offre.js'),
('20240426082845-create-user.js'),
('20240502083344-create-experience.js'),
('20240503150924-create-offre-users.js'),
('20240521150103-create-chat.js');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `role` varchar(255) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `photoprofile` varchar(255) DEFAULT NULL,
  `presentation` text,
  `cv` varchar(255) DEFAULT NULL,
  `diplomes` varchar(255) DEFAULT 'Aucun Diplomes',
  `Linkedin` varchar(255) DEFAULT NULL,
  `Instagram` varchar(255) DEFAULT NULL,
  `X` varchar(255) DEFAULT NULL,
  `Facebook` varchar(255) DEFAULT NULL,
  `Github` varchar(255) DEFAULT NULL,
  `Site` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `role`, `nom`, `prenom`, `password`, `email`, `photoprofile`, `presentation`, `cv`, `diplomes`, `Linkedin`, `Instagram`, `X`, `Facebook`, `Github`, `Site`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'Role_User', 'Durand', 'undefined', '$2b$10$aQ0NKzmhdqaxnMBwdYeBzedl1UWW2c5hqCLXusjTpjpIn5sMr75IW', 'julie.durand@example.com', 'd0f4dc62cf889d0430dd112c1883f00a.jpg', 'Passionnée par les nouvelles technologies et l\'analyse des données, je suis spécialisée en Data Science. Avec une expérience significative dans le développement de solutions innovantes, je suis toujours à la recherche de nouveaux défis pour améliorer mes compétences et contribuer au succès des projets auxquels je participe.', 'b7e1af9e7b104566f3ddee7b559b1c7c.pdf', '[\"Licence en Informatique\",\"Master en Marketing Digital\"]', 'a définir', 'https://instagram.fr', 'https://x.com', 'a définir', 'a définir', 'a définir', 0, '2024-05-27 12:35:36', '2024-05-27 12:35:36'),
(2, 'Role_User', 'Martin', 'undefined', '$2b$10$ux..myKL2sxiWomvw8mmUeOo.OxFFLIEjxjbzYBWBG/dO4knxpKKe', 'pierre.martin@example.com', '801a7a85d10b6776af6452b35d12ca89.jpg', 'Expert en gestion et management, je possède une solide expérience dans la supervision des équipes et la gestion des projets. Mon objectif est de maximiser l\'efficacité opérationnelle tout en favorisant un environnement de travail collaboratif et stimulant.', '87cbd5cbe36fb40eaaf09b1979a48971.pdf', '[\"BTS Comptabilité et Gestion\",\"Licence en Sciences Politiques\"]', 'https://linkedin.fr', 'a définir', 'a définir', 'a définir', 'a définir', 'a définir', 0, '2024-05-27 12:39:09', '2024-05-27 12:39:09'),
(3, 'Role_User', 'Dupont', 'undefined', '$2b$10$rhirYBlY8vnZncB/Rkvp4OggHCztQQHDO/6bOzsY7YJhEmn5FQLlG', 'sophie.dupont@example.com', '99e5e481df8532ed328cef4e5487dcda.jpg', 'Architecte passionnée et créative, je m\'efforce de concevoir des espaces innovants et fonctionnels. Mon parcours en génie civil me permet d\'allier esthétisme et technique pour réaliser des projets ambitieux et durables.', '647b673bbeac366893c978a396cd83f0.pdf', '[\"DUT Génie Civil\",\"Master en Architecture\"]', 'a définir', 'a définir', 'a définir', 'a définir', 'a définir', 'https://quentinbrandy.fr', 0, '2024-05-27 12:44:08', '2024-05-27 12:44:08'),
(4, 'Role_User', ' Lefebvre', 'undefined', '$2b$10$Xv/5j/kN3JCEHhzjuYpPpO1ujAffeIiSyg9LfgblLS9jBc5eyGxUG', 'paul.lefebvre@example.com', 'abdaf827a9de01fc3d5af424a31d3891.jpg', 'Spécialiste en marketing digital, je suis dédié à la création de stratégies de communication efficaces et innovantes. Avec une solide expérience en commerce international, je combine mes compétences pour développer des campagnes globales et percutantes.', '55abc354163cc46ea53e66ce8867ffad.pdf', '[\"Master en Marketing Digital\"]', 'a définir', 'a définir', 'a définir', 'https://facebook.fr', 'a définir', 'a définir', 0, '2024-05-27 12:45:47', '2024-05-27 12:45:47');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Chats`
--
ALTER TABLE `Chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `offreId` (`offreId`),
  ADD KEY `companyId` (`companyId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `Companies`
--
ALTER TABLE `Companies`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Experiences`
--
ALTER TABLE `Experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `Offres`
--
ALTER TABLE `Offres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Index pour la table `OffreUsers`
--
ALTER TABLE `OffreUsers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OffreId` (`OffreId`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Chats`
--
ALTER TABLE `Chats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Companies`
--
ALTER TABLE `Companies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Experiences`
--
ALTER TABLE `Experiences`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Offres`
--
ALTER TABLE `Offres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `OffreUsers`
--
ALTER TABLE `OffreUsers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Chats`
--
ALTER TABLE `Chats`
  ADD CONSTRAINT `Chats_ibfk_1` FOREIGN KEY (`offreId`) REFERENCES `Offres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Chats_ibfk_2` FOREIGN KEY (`companyId`) REFERENCES `Companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Chats_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `Experiences`
--
ALTER TABLE `Experiences`
  ADD CONSTRAINT `Experiences_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `Offres`
--
ALTER TABLE `Offres`
  ADD CONSTRAINT `Offres_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `Companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `OffreUsers`
--
ALTER TABLE `OffreUsers`
  ADD CONSTRAINT `OffreUsers_ibfk_1` FOREIGN KEY (`OffreId`) REFERENCES `Offres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `OffreUsers_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
