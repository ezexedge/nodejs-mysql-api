-- -------------------------------------------------------------
-- TablePlus 3.1.0(290)
--
-- https://tableplus.com/
--
-- Database: hsbc
-- Generation Time: 2021-03-05 13:34:13.0760
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `capitulos`;
CREATE TABLE `capitulos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `cursoId` int(11) DEFAULT NULL,
  `casoDeExito` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `capitulos_cursoId_foreign_idx` (`cursoId`),
  CONSTRAINT `capitulos_cursoId_foreign_idx` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `speaker` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `mentoria`;
CREATE TABLE `mentoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `disponibilidad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `mentoria_tiene_cursos`;
CREATE TABLE `mentoria_tiene_cursos` (
  `mentoriumId` int(11) NOT NULL,
  `cursoId` int(11) NOT NULL,
  PRIMARY KEY (`mentoriumId`,`cursoId`),
  KEY `cursoId` (`cursoId`),
  CONSTRAINT `mentoria_tiene_cursos_ibfk_1` FOREIGN KEY (`mentoriumId`) REFERENCES `mentoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentoria_tiene_cursos_ibfk_2` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `preguntas`;
CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `preguntasEnTests`;
CREATE TABLE `preguntasEnTests` (
  `preguntaId` int(11) NOT NULL,
  `testId` int(11) NOT NULL,
  PRIMARY KEY (`preguntaId`,`testId`),
  KEY `testId` (`testId`),
  CONSTRAINT `preguntasentests_ibfk_1` FOREIGN KEY (`preguntaId`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `preguntasentests_ibfk_2` FOREIGN KEY (`testId`) REFERENCES `tests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `respuestas`;
CREATE TABLE `respuestas` (
  `id` int(11) NOT NULL,
  `respuestas` varchar(255) DEFAULT NULL,
  `correcta` tinyint(1) DEFAULT NULL,
  `preguntasId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `respuestas_preguntasId_foreign_idx` (`preguntasId`),
  CONSTRAINT `respuestas_preguntasId_foreign_idx` FOREIGN KEY (`preguntasId`) REFERENCES `preguntas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `tests`;
CREATE TABLE `tests` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cursoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tests_cursoId_foreign_idx` (`cursoId`),
  CONSTRAINT `tests_cursoId_foreign_idx` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `usuarioCapitulos`;
CREATE TABLE `usuarioCapitulos` (
  `usuarioId` int(11) NOT NULL,
  `capituloId` int(11) NOT NULL,
  `cursoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`usuarioId`,`capituloId`),
  KEY `capituloId` (`capituloId`),
  CONSTRAINT `usuariocapitulos_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuariocapitulos_ibfk_2` FOREIGN KEY (`capituloId`) REFERENCES `capitulos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `usuarioInscriptos`;
CREATE TABLE `usuarioInscriptos` (
  `mentoriumId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mentoriumId`,`usuarioId`),
  UNIQUE KEY `usuarioInscriptos_usuarioId_mentoriumId_unique` (`mentoriumId`,`usuarioId`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `usuarioinscriptos_ibfk_1` FOREIGN KEY (`mentoriumId`) REFERENCES `mentoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuarioinscriptos_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `ultimoVisto` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `cuil` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

INSERT INTO `capitulos` (`id`, `nombre`, `link`, `cursoId`, `casoDeExito`) VALUES ('1', 'capitulo 1', 'www.google.com', '1', '0');
INSERT INTO `capitulos` (`id`, `nombre`, `link`, `cursoId`, `casoDeExito`) VALUES ('2', 'capitulo 2', 'www.google.com.ar', '1', '0');
INSERT INTO `capitulos` (`id`, `nombre`, `link`, `cursoId`, `casoDeExito`) VALUES ('3', 'capitulo 3', 'www.google.com.ar', '1', '1');
INSERT INTO `capitulos` (`id`, `nombre`, `link`, `cursoId`, `casoDeExito`) VALUES ('4', 'capitulo 4', 'www.google.com', NULL, NULL);
INSERT INTO `capitulos` (`id`, `nombre`, `link`, `cursoId`, `casoDeExito`) VALUES ('5', 'capitulo 5', 'www.google.com', NULL, NULL);
INSERT INTO `capitulos` (`id`, `nombre`, `link`, `cursoId`, `casoDeExito`) VALUES ('6', 'capitulo 6', 'www.google.com', NULL, NULL);

INSERT INTO `cursos` (`id`, `nombre`, `speaker`) VALUES ('1', 'idea y oportunidad de negocio', NULL);
INSERT INTO `cursos` (`id`, `nombre`, `speaker`) VALUES ('2', 'propuesta de valor', NULL);
INSERT INTO `cursos` (`id`, `nombre`, `speaker`) VALUES ('3', 'Modelo de negocio', NULL);

INSERT INTO `mentoria` (`id`, `nombre`, `descripcion`, `disponibilidad`, `fecha`, `hora`, `created_at`) VALUES ('1', 'mentoria de contabilidad', 'mentoria de contabilidad', '212', '2021-03-14', '14:00:00', '2021-02-14 23:04:05');

INSERT INTO `preguntas` (`id`, `pregunta`) VALUES ('1', 'ww?');
INSERT INTO `preguntas` (`id`, `pregunta`) VALUES ('2', 'www?');
INSERT INTO `preguntas` (`id`, `pregunta`) VALUES ('3', 'sss?');

INSERT INTO `preguntasEnTests` (`preguntaId`, `testId`) VALUES ('1', '1');
INSERT INTO `preguntasEnTests` (`preguntaId`, `testId`) VALUES ('2', '1');

INSERT INTO `respuestas` (`id`, `respuestas`, `correcta`, `preguntasId`) VALUES ('1', 'holaa', '1', '1');
INSERT INTO `respuestas` (`id`, `respuestas`, `correcta`, `preguntasId`) VALUES ('2', 'chau', '0', '1');

INSERT INTO `tests` (`id`, `nombre`, `cursoId`) VALUES ('1', 'primer test', '1');
INSERT INTO `tests` (`id`, `nombre`, `cursoId`) VALUES ('2', 'segundo test', '2');

INSERT INTO `usuarioInscriptos` (`mentoriumId`, `usuarioId`, `email`, `telefono`) VALUES ('1', '8', '1eeeee', '12233');
INSERT INTO `usuarioInscriptos` (`mentoriumId`, `usuarioId`, `email`, `telefono`) VALUES ('1', '10', 'eze@gmail.com', '222');

INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('1', 'tony', 'http://localhost:8080/capitulos/1', NULL, '');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('2', 'tony', NULL, NULL, '');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('3', 'coco', NULL, NULL, '');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('4', 'tony', 'http://localhost:8080/capitulos/1', NULL, '');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('5', NULL, NULL, NULL, '');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('6', 'pepasss', 'http://localhost:8080/capitulos/1', 'aguirre', '1111');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('7', 'juan', 'http://localhost:8080/capitulos/3', 'gallardo', '1234');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('8', 'tony ', 'http://localhost:8080/capitulos/1', 'ruben', '12345');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('9', 'ezequiel', 'http://localhost:8080/capitulos/1', 'gallardo', '1256');
INSERT INTO `usuarios` (`id`, `name`, `ultimoVisto`, `lastName`, `cuil`) VALUES ('10', 'rodrigo', 'http://localhost:8080/capitulos/1', 'dididi', '2222');




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;