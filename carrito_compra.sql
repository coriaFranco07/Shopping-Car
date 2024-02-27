-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 26, 2023 at 06:18 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carrito_compra`
--

-- --------------------------------------------------------

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
CREATE TABLE IF NOT EXISTS `carrito` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal` int NOT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carrito_prev`
--

DROP TABLE IF EXISTS `carrito_prev`;
CREATE TABLE IF NOT EXISTS `carrito_prev` (
  `id_carritoPrevio` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal` int NOT NULL,
  PRIMARY KEY (`id_carritoPrevio`),
  UNIQUE KEY `id_user_2` (`id_user`,`id_producto`),
  KEY `id_user` (`id_user`,`id_producto`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `carrito_prev`
--

INSERT INTO `carrito_prev` (`id_carritoPrevio`, `id_user`, `id_producto`, `cantidad`, `subtotal`) VALUES
(2, 14, 9, 2, 1000),
(4, 16, 9, 3, 1500),
(6, 4, 9, 4, 2000),
(9, 4, 8, 1, 500),
(10, 4, 6, 3, 1500);

-- --------------------------------------------------------

--
-- Table structure for table `detalle`
--

DROP TABLE IF EXISTS `detalle`;
CREATE TABLE IF NOT EXISTS `detalle` (
  `id_operacion` int NOT NULL,
  `linea` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `id_producto` int NOT NULL,
  `precio_unitario` int NOT NULL,
  `subtotal` int NOT NULL,
  PRIMARY KEY (`linea`),
  KEY `id_operacion` (`id_operacion`,`id_producto`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE IF NOT EXISTS `factura` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_producto` int NOT NULL,
  `fecha_factura` datetime NOT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `id_user` (`id_user`,`id_producto`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historial_carrito`
--

DROP TABLE IF EXISTS `historial_carrito`;
CREATE TABLE IF NOT EXISTS `historial_carrito` (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal` int NOT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `id_user` (`id_user`,`id_producto`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `historial_carrito`
--

INSERT INTO `historial_carrito` (`id_historial`, `id_user`, `id_producto`, `cantidad`, `subtotal`) VALUES
(1, 4, 9, 6, 3000),
(2, 4, 9, 4, 2000),
(3, 4, 8, 1, 500),
(4, 4, 8, 1, 500),
(5, 4, 8, 1, 500),
(6, 4, 6, 3, 1500);

-- --------------------------------------------------------

--
-- Table structure for table `operaciones`
--

DROP TABLE IF EXISTS `operaciones`;
CREATE TABLE IF NOT EXISTS `operaciones` (
  `id_operacion` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_operacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id_pagos` int NOT NULL AUTO_INCREMENT,
  `id_factura` int NOT NULL,
  `id_tipoPago` int NOT NULL,
  `valor` int NOT NULL,
  PRIMARY KEY (`id_pagos`),
  KEY `id_factura` (`id_factura`,`id_tipoPago`),
  KEY `id_tipoPago` (`id_tipoPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `tipoProducto` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `codigo` int NOT NULL,
  `stock` int NOT NULL,
  `precioVenta` int NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`id_producto`, `tipoProducto`, `nombre`, `codigo`, `stock`, `precioVenta`) VALUES
(6, 'Chocolate', 'Block', 98156, 50, 500),
(8, 'Pan de navidad', 'La Española', 126677, 20, 500),
(9, ' Chocolate ', ' Kitkat', 9090, 10, 500);

-- --------------------------------------------------------

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE IF NOT EXISTS `proveedor` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'Admin'),
(2, 'Basico');

-- --------------------------------------------------------

--
-- Table structure for table `sexo`
--

DROP TABLE IF EXISTS `sexo`;
CREATE TABLE IF NOT EXISTS `sexo` (
  `id_sexo` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_sexo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sexo`
--

INSERT INTO `sexo` (`id_sexo`, `tipo`) VALUES
(1, 'Masculino'),
(2, 'Femenino');

-- --------------------------------------------------------

--
-- Table structure for table `tipodocumento`
--

DROP TABLE IF EXISTS `tipodocumento`;
CREATE TABLE IF NOT EXISTS `tipodocumento` (
  `id_tipoDoc` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipoDoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tipopago`
--

DROP TABLE IF EXISTS `tipopago`;
CREATE TABLE IF NOT EXISTS `tipopago` (
  `id_tipoPago` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipoPago`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tipopago`
--

INSERT INTO `tipopago` (`id_tipoPago`, `tipo`) VALUES
(1, 'Efectivo'),
(2, 'Debito_Credito');

-- --------------------------------------------------------

--
-- Table structure for table `userfact`
--

DROP TABLE IF EXISTS `userfact`;
CREATE TABLE IF NOT EXISTS `userfact` (
  `id_userFact` int NOT NULL AUTO_INCREMENT,
  `tipo` int NOT NULL,
  PRIMARY KEY (`id_userFact`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `edad` int NOT NULL,
  `correo` varchar(50) NOT NULL,
  `DNI` char(8) NOT NULL,
  `sexo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefono` int NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user`, `name`, `pass`, `edad`, `correo`, `DNI`, `sexo`, `telefono`, `fecha_nacimiento`) VALUES
(4, 'admin', '  Franco Coria  ', '$2a$08$lx3Zx2NFXCn4ZE4udi5Q8eo2L5TEgfo0hzwSkl4EKB6dVxSWxteqO', 19, 'coria9404@gmail.com', '   45449', '', 2147483647, '2023-04-19'),
(14, 'laura01', 'Laura Zaragoza', '$2a$08$ZvRlBnF4iBYPmySXyVghPOhUMz2a5zdDWhAlYIYHusWyUlFnokFEm', 12, 'laura12@gmail.com', '18459090', 'Femenino', 2147483647, '2023-04-28'),
(15, 'dani90', 'Daniel Coria', '$2a$08$c./NP0hT4cj0FJIwJxHvQOVC8MgSiqE5DENtWvYOfqGuVaiDZ9u8C', 13, 'dani@coria.com', '18459090', 'Masculino', 261900000, '2023-04-27'),
(16, 'lolo1010', 'Rube', '$2a$08$SHUDQAmaeNADrVISNubyiOvMO7KWPlRq4j/yoyBbzeKyLgyi7XVhy', 6, 'ruben@gmial.com', '12121214', 'Masculino', 2147483647, '2023-04-19');

-- --------------------------------------------------------

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE IF NOT EXISTS `users_roles` (
  `id_user` int NOT NULL,
  `id_rol` int NOT NULL,
  `id_UserRol` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_UserRol`),
  UNIQUE KEY `id_user_2` (`id_user`,`id_rol`),
  KEY `user` (`id_user`,`id_rol`),
  KEY `id_rol` (`id_rol`),
  KEY `id` (`id_user`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_roles`
--

INSERT INTO `users_roles` (`id_user`, `id_rol`, `id_UserRol`) VALUES
(4, 1, 8);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `carrito_prev`
--
ALTER TABLE `carrito_prev`
  ADD CONSTRAINT `carrito_prev_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_prev_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`id_operacion`) REFERENCES `operaciones` (`id_operacion`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `historial_carrito`
--
ALTER TABLE `historial_carrito`
  ADD CONSTRAINT `historial_carrito_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_carrito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`id_tipoPago`) REFERENCES `tipopago` (`id_tipoPago`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `users_roles`
--
ALTER TABLE `users_roles`
  ADD CONSTRAINT `users_roles_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `users_roles_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
