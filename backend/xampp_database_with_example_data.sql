-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 13 Maj 2022, 22:10
-- Wersja serwera: 10.4.16-MariaDB
-- Wersja PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `media-kom`
--

DELIMITER $$
--
-- Procedury
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `my_proc` ()  BEGIN
INSERT INTO `orders`(`user_id`,  `status`, `delivery_type_id`, `name`, `surname`, `town`, `postal_code`, `street`, `phone`) VALUES (1,'wda',1,'ad','adsdas','dsada','dasdas','dsasda','das');
SET @id = LAST_INSERT_ID();
SELECT @id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `my_proc1` ()  BEGIN
INSERT INTO `orders`(`user_id`,  `status`, `delivery_type_id`, `name`, `surname`, `town`, `postal_code`, `street`, `phone`) VALUES (1,'wda',1,'ad','STASIEL','dsada','dasdas','dsasda','das');
SET @id = LAST_INSERT_ID();
SELECT @id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`) VALUES
(1, 'Laptopy'),
(2, 'Telefony'),
(3, 'Telewizory'),
(4, 'Podzespoły komputerowe'),
(5, 'Akcesoria');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `delivery_types`
--

CREATE TABLE `delivery_types` (
  `deliveryId` int(11) NOT NULL,
  `name` varchar(256) COLLATE utf8mb4_polish_ci NOT NULL,
  `price` float NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `delivery_types`
--

INSERT INTO `delivery_types` (`deliveryId`, `name`, `price`, `available`) VALUES
(1, 'Kurier DPD', 25, 1),
(2, 'List Polecony', 12, 1),
(3, 'Odbiór osobisty', 0, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL,
  `deliveryId` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `surname` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `town` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `postalCode` varchar(7) COLLATE utf8mb4_polish_ci NOT NULL,
  `street` varchar(40) COLLATE utf8mb4_polish_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `date`, `status`, `deliveryId`, `name`, `surname`, `town`, `postalCode`, `street`, `phone`) VALUES
(41, 1, '2022-02-27 17:44:50', 'zakończono', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(42, 1, '2022-02-27 17:49:00', 'zakończono', 1, 'Piotr', 'Zys', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(43, 1, '2022-02-27 17:49:44', 'zakończono', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(44, 1, '2022-02-27 17:49:58', 'anulowano', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(45, 1, '2022-02-27 17:51:47', 'zakończono', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(50, 1, '2022-02-27 19:33:17', 'wysłane', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(51, 1, '2022-03-03 16:56:54', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(52, 1, '2022-03-03 20:42:14', 'wysłane', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(53, 1, '2022-03-03 20:51:44', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(54, 1, '2022-03-03 21:13:15', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(55, 1, '2022-03-03 22:08:07', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(56, 1, '2022-03-04 13:10:47', 'zakończono', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(57, 1, '2022-03-04 13:41:22', 'anulowano', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(136, 1, '2022-03-25 15:56:47', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(137, 1, '2022-03-25 15:57:27', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(138, 1, '2022-03-25 15:58:33', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(139, 1, '2022-03-25 21:16:26', 'w przygotowaniu', 3, 'Piotr Truskawkiewicz', 'dsa', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(140, 1, '2022-03-25 22:29:44', 'anulowano', 2, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(141, 1, '2022-04-03 00:45:04', 'anulowano', 1, 'Adam', 'Zaręba', 'Łódz', '12-421', 'Piotrkowska 23', '123456789'),
(142, 1, '2022-04-16 23:17:08', 'zakończono', 1, 'Patrick', 'Zdyszkowski', 'Łódź', '21-141', 'Sierakowicka 12', '1234567879'),
(143, 1, '2022-04-18 21:03:44', 'zakończono', 1, 'Patryk', 'Zdiszkowski', ' Łódź', '123-45', 'Piotrkowska 23123', '213214214'),
(144, 1, '2022-05-03 13:02:26', 'wysłane', 1, 'Jakub', 'Ostrowski', 'Łódź', '93-123', 'Piotrkowska 11', '123456789'),
(145, 1, '2022-05-12 16:38:44', 'w przygotowaniu', 1, 'Wojciech', 'Papuszka', 'Warszawa', '12-133', 'Piotrkowska 22', '12321412'),
(146, 5, '2022-05-13 17:18:49', 'wysłane', 1, 'Piotrek', 'Witkowski', 'Polna', '21-321', 'Mireckiego 22', '1321231231'),
(147, 5, '2022-05-13 17:19:59', 'wysłane', 2, 'Miras', 'Wujcicki', 'Warszawa', '94-123', 'Armi 321b', '231412413121');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders_product`
--

CREATE TABLE `orders_product` (
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productAmount` int(11) NOT NULL,
  `productPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `orders_product`
--

INSERT INTO `orders_product` (`orderId`, `productId`, `productAmount`, `productPrice`) VALUES
(41, 1, 1, 1300),
(42, 1, 1, 1300),
(43, 1, 1, 1300),
(43, 3, 1, 1400),
(44, 1, 1, 1300),
(45, 2, 1, 700),
(50, 4, 2, 3144),
(51, 4, 2, 3144),
(52, 4, 2, 3144),
(53, 2, 1, 700),
(54, 2, 1, 700),
(54, 3, 1, 1400),
(55, 5, 1, 3500),
(55, 4, 1, 3144),
(55, 3, 1, 1400),
(55, 1, 1, 1300),
(56, 5, 1, 3500),
(56, 4, 1, 3144),
(56, 3, 1, 1400),
(56, 1, 1, 1300),
(56, 6, 1, 3990),
(56, 8, 1, 3900),
(56, 7, 1, 2750),
(56, 2, 1, 700),
(57, 5, 1, 3500),
(57, 2, 1, 700),
(136, 8, 1, 3900),
(136, 4, 1, 3144),
(136, 2, 1, 700),
(137, 8, 1, 3900),
(137, 4, 1, 3144),
(137, 2, 1, 700),
(138, 6, 1, 3990),
(139, 3, 1, 1400),
(140, 5, 3, 3500),
(140, 3, 2, 1400),
(140, 1, 2, 1300),
(140, 4, 2, 3144),
(140, 7, 2, 2750),
(140, 8, 2, 3900),
(140, 2, 2, 700),
(140, 6, 2, 3990),
(141, 5, 2, 3500),
(141, 3, 2, 1400),
(141, 1, 2, 1300),
(141, 4, 2, 3144),
(141, 7, 2, 2750),
(141, 8, 2, 3900),
(141, 2, 2, 700),
(141, 6, 2, 3990),
(142, 2, 2, 700),
(142, 46, 2, 1200),
(142, 52, 2, 4000),
(143, 52, 1, 4000),
(144, 46, 1, 1200),
(144, 1, 1, 1300),
(144, 7, 1, 2750),
(145, 46, 1, 1200),
(145, 1, 1, 1300),
(145, 7, 1, 2750),
(146, 7, 1, 2750),
(146, 1, 1, 1300),
(146, 5, 1, 3500),
(146, 6, 1, 3990),
(147, 4, 1, 3144);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `title` varchar(256) COLLATE utf8mb4_polish_ci NOT NULL,
  `categoryId` int(11) NOT NULL,
  `description` varchar(4096) COLLATE utf8mb4_polish_ci NOT NULL,
  `price` float(10,2) NOT NULL,
  `titleImg` varchar(128) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`productId`, `title`, `categoryId`, `description`, `price`, `titleImg`) VALUES
(1, 'Redmi 10X Pro 5G 8/256GB', 2, '48px super telefon ekstra fajny', 1300.00, 'id1_1.png'),
(2, 'AMD RYZEN 2400G 3.6GHz VEGA 11', 4, 'Procesor ze zintegrowaną kartą graficzną Vega 11 \r\n4 RDZENIE 8 WĄTKÓW 3.6GHz', 720.00, 'id2_1.png'),
(3, 'Redmi Note 10S 6/128GB Fioletowy', 2, 'Redmi Note 10S teraz napędzany mocą Helio G95! Inteligentny aparat główny 64MP uchwyci wspaniałe scenerie. Odporna na zachlapania obudowa, piękny wyświetlacz oraz bardzo pojemna bateria 5000mAh.', 1400.00, 'id3_1.png'),
(4, 'LG 65″ 4K NanoCell DVB-T2', 3, 'Telewizor LG oferuje krystalicznie czysty obraz z technologią NanoCell', 3144.00, 'id4_1.png'),
(5, 'Microsoft Surface i5/8GB/512 Platinum', 1, '8GB Ramu, płaski laptop, dysk SSD m2 512GB, błyszczący led IPS, Windows 11', 3500.00, 'id5_1.png'),
(6, 'HP Pavilion 15', 1, 'Procesor i5-1130G\r\nPamięć Ram 32GB\r\nDysk SDD 512GB\r\nWindows 11', 3990.00, 'id6_1.png'),
(7, 'Samsung AU8002 Crystal UHD 4K Smart TV 55\"', 3, 'Smukły design, krystaliczne żywe kolory 60Hz, AndroidTV', 2750.00, 'id7_1.png'),
(8, 'LG 55” NanoCell 4K 2021', 3, 'Krystaliczny czysty obraz, Smart TV, osty i wyrazisty obraz', 3960.00, 'id8_1.png'),
(46, 'AMD RYZEN 2600', 4, 'Procesor drugiej generacji ZEN 2 pozwala na wydajną grę w najnowsze gry, zapewnia wspaniałą pracę w środowiskach deweloperskich oraz przy renderowaniu. ', 1200.00, 'id2_1.png'),
(52, 'MSI MEG Z590 GODLIKE ', 4, 'Płyta główna dla gamingowych komputerów ', 4000.00, 'MSI MEG Z590 GODLIKE .png'),
(55, 'MSI MEG X570 ACE', 4, 'Płyta główna do komputera dla graczy na procesorze Ryzen', 1999.00, 'MSI MEG X570 ACE.png');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products_details`
--

CREATE TABLE `products_details` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `displayNumber` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `products_details`
--

INSERT INTO `products_details` (`id`, `productId`, `displayNumber`, `name`, `description`) VALUES
(12, 5, 1, 'Procesor', 'i5 8100u'),
(13, 5, 3, 'Pamięć Ram', '8GB '),
(14, 5, 4, 'Dysk ', '512GB'),
(15, 5, 5, 'Rodzaj dysku', 'SSD'),
(16, 5, 2, 'Taktowanie procesora', '1,8GHz'),
(25, 6, 1, 'Procesor', 'Ryzen 5 3100u'),
(26, 6, 2, 'Taktowanie procesora ', '2,5GHz'),
(27, 6, 3, 'Ilość rdzeni', '4'),
(28, 6, 4, 'Ilość wątków', '8'),
(82, 8, 0, 'Rozmiar ekranu', '55`'),
(85, 1, 0, 'Pamięć RAM', '8'),
(86, 1, 1, 'Pamięć wewnętrzna', '256GB'),
(87, 1, 2, 'Bateria', 'Li-Po 5000mAh'),
(88, 1, 3, 'System operacyjny', 'Android 11'),
(89, 1, 4, 'Rozmiar ekranu', '6.00\''),
(91, 4, 0, 'Rozmiar ekranu', '65\''),
(92, 4, 1, 'Rozdzielczość ekranu', '3840 × 2160 '),
(98, 3, 0, 'Aparat', '13MPx'),
(99, 3, 1, 'Rozmiar ekranu', '6,5\''),
(100, 3, 2, 'Pamięć Ram', '6GB'),
(101, 3, 3, 'Pamięć wewnętrzna', '128GB'),
(102, 3, 4, 'Procesor', 'Helio G95'),
(103, 52, 0, 'Format', 'E-ATX'),
(104, 52, 1, 'Gniazdo procesora', 'Socket 1200'),
(105, 52, 2, 'Chipset', 'Intel Z590'),
(106, 52, 3, 'Architektura procesora', 'Comet-Lake Rocket-Lake'),
(107, 52, 4, 'Liczba banków pamięci', '4'),
(108, 52, 5, 'Maksymalna obsługiwana pamięć', '128GB'),
(137, 55, 0, 'Format', 'ATX'),
(138, 55, 1, 'Gniazdo procesora ', 'AM4'),
(139, 55, 2, 'Chipset ', 'AMD X570'),
(140, 55, 3, 'Ilość banków pamięci', '4'),
(141, 55, 4, 'Maksymalna obsługiwana pamięć', '128GB'),
(142, 55, 5, 'Łączność bezprzewodowa', 'Wi-fi, Bluetooth'),
(143, 55, 6, 'Układ audio', 'Realtek ALC 1220'),
(154, 2, 0, 'Rodzina procesorów', 'AMD Ryzen'),
(155, 2, 1, 'Gniazdo procesora ', 'AM4'),
(156, 2, 2, 'Taktowanie rdzenia', '3.6 GHz'),
(157, 2, 3, 'Liczba rdzeni', '4'),
(158, 2, 4, 'Liczba wątków', '8'),
(159, 2, 5, 'Zintegrowana grafika', 'Radeon RX Vega 11'),
(160, 2, 6, 'TDP', '65W'),
(161, 46, 0, 'Ilość rdzeni', '6'),
(162, 46, 1, 'Ilość wątków', '12'),
(163, 46, 2, 'Taktowanie procesora', '3,6GHZ'),
(164, 46, 3, 'TDP', '125W'),
(165, 46, 4, 'Zintegrowana grafika', 'Nie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `recommended_products`
--

CREATE TABLE `recommended_products` (
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `recommended_products`
--

INSERT INTO `recommended_products` (`productId`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL,
  `surname` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `password` varchar(1024) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_polish_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`userId`, `name`, `surname`, `password`, `email`, `isAdmin`) VALUES
(1, 'Jakub', 'Piotrkowski', '$2b$10$MqkcWv8.t6CfJwVW5nu2G.o.zb/rtNILC9qkmofRt/6KJEmrTYfme', 'kubator@wp.pl', 1),
(2, 'Bartek', 'Pawłowski', '$2b$10$NgbTtKs0lqaX4x4Crna6f.G7NV/nuxp3xI8mAC5TP/syEQlbUr82G', 'bartosz@gmail.com', 0),
(5, 'Piotrek', 'Witczak', '$2b$10$yQQtbeJ.BW2pjbjp.MXyluFgWyBJgMFsJq5UTtURAIcQD9MFwOvy2', 'piotrek@gmail.com', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_cart`
--

CREATE TABLE `user_cart` (
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productAmount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user_cart`
--

INSERT INTO `user_cart` (`userId`, `productId`, `productAmount`) VALUES
(5, 4, 1),
(1, 8, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indeksy dla tabeli `delivery_types`
--
ALTER TABLE `delivery_types`
  ADD PRIMARY KEY (`deliveryId`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `deliveryId` (`deliveryId`),
  ADD KEY `userId` (`userId`);

--
-- Indeksy dla tabeli `orders_product`
--
ALTER TABLE `orders_product`
  ADD KEY `orders_product_ibfk_1` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indeksy dla tabeli `products_details`
--
ALTER TABLE `products_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indeksy dla tabeli `recommended_products`
--
ALTER TABLE `recommended_products`
  ADD KEY `productId` (`productId`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indeksy dla tabeli `user_cart`
--
ALTER TABLE `user_cart`
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `delivery_types`
--
ALTER TABLE `delivery_types`
  MODIFY `deliveryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT dla tabeli `products_details`
--
ALTER TABLE `products_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`deliveryId`) REFERENCES `delivery_types` (`deliveryId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `orders_product`
--
ALTER TABLE `orders_product`
  ADD CONSTRAINT `orders_product_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_product_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Ograniczenia dla tabeli `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`);

--
-- Ograniczenia dla tabeli `products_details`
--
ALTER TABLE `products_details`
  ADD CONSTRAINT `products_details_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `recommended_products`
--
ALTER TABLE `recommended_products`
  ADD CONSTRAINT `recommended_products_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `user_cart`
--
ALTER TABLE `user_cart`
  ADD CONSTRAINT `user_cart_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_cart_ibfk_4` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
