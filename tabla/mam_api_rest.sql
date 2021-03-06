-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 01-03-2021 a las 04:45:58
-- Versión del servidor: 5.6.49-cll-lve
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mam_api_rest`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capitulos`
--

CREATE TABLE `capitulos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `capitulos`
--

INSERT INTO `capitulos` (`id`, `nombre`, `link`, `created_at`) VALUES
(1, 'capitulo 1', 'www.google.com', '2021-02-15 05:59:20'),
(2, 'capitulo 2', 'www.google.com.ar', '2021-02-15 17:30:32'),
(3, 'capitulo 3', 'www.google.com.ar', '2021-02-15 17:30:44'),
(4, 'capitulo 4', 'www.google.com', '2021-02-15 17:31:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capitulos_por_curso`
--

CREATE TABLE `capitulos_por_curso` (
  `cursoId` int(11) NOT NULL,
  `capituloId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `capitulos_por_curso`
--

INSERT INTO `capitulos_por_curso` (`cursoId`, `capituloId`) VALUES
(1, 1),
(1, 2),
(2, 2),
(1, 3),
(2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `nombre`, `created_at`) VALUES
(1, 'idea y oportunidad de negocio', '2021-02-15 05:58:11'),
(2, 'propuesta de valor', '2021-02-15 17:29:51'),
(3, 'Modelo de negocio', '2021-02-24 23:03:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos_de_usuario`
--

CREATE TABLE `cursos_de_usuario` (
  `usuarioId` int(11) NOT NULL,
  `cursoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cursos_de_usuario`
--

INSERT INTO `cursos_de_usuario` (`usuarioId`, `cursoId`) VALUES
(9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mentoria`
--

CREATE TABLE `mentoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `disponibilidad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mentoria`
--

INSERT INTO `mentoria` (`id`, `nombre`, `descripcion`, `disponibilidad`, `fecha`, `hora`, `created_at`) VALUES
(1, 'mentoria 1', 'mentoria de ...', 47, '2021-02-14', '23:04:05', '2021-02-15 06:04:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mentoria_tiene_cursos`
--

CREATE TABLE `mentoria_tiene_cursos` (
  `mentoriumId` int(11) NOT NULL,
  `cursoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`id`, `pregunta`, `created_at`) VALUES
(0, 'Pregunta 0', '2021-03-01 11:02:54'),
(1, 'Pregunta 1', '2021-03-01 11:04:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_en_test`
--

CREATE TABLE `preguntas_en_test` (
  `testId` int(11) NOT NULL,
  `preguntaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `preguntas_en_test`
--

INSERT INTO `preguntas_en_test` (`testId`, `preguntaId`) VALUES
(0, 0),
(0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tests`
--

CREATE TABLE `tests` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `respuestaId` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cursoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tests`
--

INSERT INTO `tests` (`id`, `nombre`, `respuestaId`, `created_at`, `cursoId`) VALUES
(0, 'Test 1', '1', '2021-03-01 11:01:25', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioCapitulos`
--

CREATE TABLE `usuarioCapitulos` (
  `capituloId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarioCapitulos`
--

INSERT INTO `usuarioCapitulos` (`capituloId`, `usuarioId`) VALUES
(1, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioInscriptos`
--

CREATE TABLE `usuarioInscriptos` (
  `mentoriumId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarioInscriptos`
--

INSERT INTO `usuarioInscriptos` (`mentoriumId`, `usuarioId`) VALUES
(1, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dni` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `ultimoVisto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `name`, `dni`, `salt`, `password`, `ultimoVisto`) VALUES
(2, 'Gonzalo', '36596288', NULL, '$2a$10$ki0Wyiao8TR7hE8ZGTfcaOfL.xeTyyI7KQRHoHOSEMV67cAV.CY02', NULL),
(3, 'Clara', '36596222', NULL, '$2a$10$B.UwbwA1PEiqzBykOObVoOQDg.sg/p1dkwLSfPQX3ZcWl1FX1E1bq', NULL),
(7, 'Juan Gallardo', '1234', NULL, '1234', 'http://localhost:8080/capitulos/1'),
(9, 'Mariano', '33389683', NULL, '33389683', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capitulos`
--
ALTER TABLE `capitulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `capitulos_por_curso`
--
ALTER TABLE `capitulos_por_curso`
  ADD PRIMARY KEY (`cursoId`,`capituloId`),
  ADD KEY `capituloId` (`capituloId`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cursos_de_usuario`
--
ALTER TABLE `cursos_de_usuario`
  ADD PRIMARY KEY (`usuarioId`,`cursoId`),
  ADD KEY `cursoId` (`cursoId`);

--
-- Indices de la tabla `mentoria`
--
ALTER TABLE `mentoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mentoria_tiene_cursos`
--
ALTER TABLE `mentoria_tiene_cursos`
  ADD PRIMARY KEY (`mentoriumId`,`cursoId`),
  ADD KEY `cursoId` (`cursoId`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `preguntas_en_test`
--
ALTER TABLE `preguntas_en_test`
  ADD PRIMARY KEY (`testId`,`preguntaId`),
  ADD KEY `preguntaId` (`preguntaId`);

--
-- Indices de la tabla `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tests_cursoId_foreign_idx` (`cursoId`);

--
-- Indices de la tabla `usuarioCapitulos`
--
ALTER TABLE `usuarioCapitulos`
  ADD PRIMARY KEY (`capituloId`,`usuarioId`),
  ADD UNIQUE KEY `usuarioCapitulos_usuarioId_capituloId_unique` (`capituloId`,`usuarioId`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `usuarioInscriptos`
--
ALTER TABLE `usuarioInscriptos`
  ADD PRIMARY KEY (`mentoriumId`,`usuarioId`),
  ADD UNIQUE KEY `usuarioInscriptos_usuarioId_mentoriumId_unique` (`mentoriumId`,`usuarioId`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `capitulos_por_curso`
--
ALTER TABLE `capitulos_por_curso`
  ADD CONSTRAINT `capitulos_por_curso_ibfk_1` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `capitulos_por_curso_ibfk_2` FOREIGN KEY (`capituloId`) REFERENCES `capitulos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cursos_de_usuario`
--
ALTER TABLE `cursos_de_usuario`
  ADD CONSTRAINT `cursos_de_usuario_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cursos_de_usuario_ibfk_2` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mentoria_tiene_cursos`
--
ALTER TABLE `mentoria_tiene_cursos`
  ADD CONSTRAINT `mentoria_tiene_cursos_ibfk_1` FOREIGN KEY (`mentoriumId`) REFERENCES `mentoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mentoria_tiene_cursos_ibfk_2` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `preguntas_en_test`
--
ALTER TABLE `preguntas_en_test`
  ADD CONSTRAINT `preguntas_en_test_ibfk_1` FOREIGN KEY (`testId`) REFERENCES `tests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `preguntas_en_test_ibfk_2` FOREIGN KEY (`preguntaId`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `tests_cursoId_foreign_idx` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioCapitulos`
--
ALTER TABLE `usuarioCapitulos`
  ADD CONSTRAINT `usuariocapitulos_ibfk_1` FOREIGN KEY (`capituloId`) REFERENCES `capitulos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuariocapitulos_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioInscriptos`
--
ALTER TABLE `usuarioInscriptos`
  ADD CONSTRAINT `usuarioinscriptos_ibfk_1` FOREIGN KEY (`mentoriumId`) REFERENCES `mentoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioinscriptos_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
