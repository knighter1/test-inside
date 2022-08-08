CREATE DATABASE `test_database`;

USE `test_database`;

CREATE TABLE `users` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `name` VARCHAR(60) NOT NULL,
  `password` VARCHAR(60) NOT NULL
) ENGINE=MyISAM;

CREATE TABLE `messages` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `user_id` INTEGER UNSIGNED NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM;


INSERT INTO `users` (`id`, `name`, `password`) VALUES (1, 'test', '$2b$10$sa07aUt1pjj.1u7QkTz5TuxbwkTyPh2GMAI1Bk1yjO6keYN.DTKWm'),
(2, 'John', '$2b$10$Ey6OgTn5K26wXc0W0UiWpu2j3d/MGaLeyng5gXdSBw64zoEoNBoQa');

INSERT INTO `messages` (`id`, `user_id`, `message`) VALUES (1, 1, 'message 1'),
(2, 2, 'message 2'),
(3, 1, 'message 3'),
(4, 2, 'message 4'),
(5, 1, 'message 5'),
(6, 2, 'message 6'),
(7, 1, 'message 7'),
(8, 2, 'message 8');
