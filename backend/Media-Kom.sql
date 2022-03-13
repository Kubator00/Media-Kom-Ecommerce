-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 13 Mar 2022, 17:18
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
-- Baza danych: `sklep`
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
-- Struktura tabeli dla tabeli `delivery_types`
--

CREATE TABLE `delivery_types` (
  `id` int(11) NOT NULL,
  `name` varchar(256) COLLATE utf8mb4_polish_ci NOT NULL,
  `price` float NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `delivery_types`
--

INSERT INTO `delivery_types` (`id`, `name`, `price`, `available`) VALUES
(1, 'Kurier DPD', 25, 1),
(2, 'List Polecony', 12, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL,
  `delivery_type_id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `surname` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `town` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `postal_code` varchar(7) COLLATE utf8mb4_polish_ci NOT NULL,
  `street` varchar(40) COLLATE utf8mb4_polish_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `date`, `status`, `delivery_type_id`, `name`, `surname`, `town`, `postal_code`, `street`, `phone`) VALUES
(41, 1, '2022-02-27 17:44:50', 'zakończono', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(42, 1, '2022-02-27 17:49:00', 'zakończono', 1, 'Piotr', 'Zys', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(43, 1, '2022-02-27 17:49:44', 'zakończono', 2, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(44, 1, '2022-02-27 17:49:58', 'anulowano', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(45, 1, '2022-02-27 17:51:47', 'zakończono', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(50, 1, '2022-02-27 19:33:17', 'wysłane', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(51, 1, '2022-03-03 16:56:54', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(52, 1, '2022-03-03 20:42:14', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(53, 1, '2022-03-03 20:51:44', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(54, 1, '2022-03-03 21:13:15', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(55, 1, '2022-03-03 22:08:07', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(56, 1, '2022-03-04 13:10:47', 'zakończono', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(57, 1, '2022-03-04 13:41:22', 'anulowano', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(116, 1, '2022-03-12 16:39:58', 'w przygotowaniu', 1, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders_product`
--

CREATE TABLE `orders_product` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_amount` int(11) NOT NULL,
  `product_price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `orders_product`
--

INSERT INTO `orders_product` (`order_id`, `product_id`, `product_amount`, `product_price`) VALUES
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
(116, 2, 3, 700),
(116, 4, 1, 3144),
(116, 7, 3, 2750),
(116, 3, 3, 1400),
(116, 1, 3, 1300),
(116, 5, 3, 3500),
(116, 6, 3, 3990);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category` varchar(64) COLLATE utf8mb4_polish_ci NOT NULL,
  `title` varchar(256) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` varchar(4096) COLLATE utf8mb4_polish_ci NOT NULL,
  `price` float(10,2) NOT NULL,
  `title_img` varchar(128) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `category`, `title`, `description`, `price`, `title_img`) VALUES
(1, 'telefony', 'Redmi 10X Pro 5G 8/256GB', '48px super telefon ekstra fajny', 1300.00, 'id1_1.png'),
(2, 'podzespoły komputerowe', 'AMD RYZEN 2400G 3.6GHz VEGA 11', 'Procesor ze zintegrowaną kartą graficzną Vega 11 \r\n4 RDZENIE 8 WĄTKÓW 3.6GHz', 700.00, 'id2_1.png'),
(3, 'telefony', 'Redmi Note 10S 6/128GB Fioletowy', 'Redmi Note 10S teraz napędzany mocą Helio G95! Inteligentny aparat główny 64MP uchwyci wspaniałe scenerie. Odporna na zachlapania obudowa, piękny wyświetlacz oraz bardzo pojemna bateria 5000mAh.', 1400.00, 'id3_1.png'),
(4, 'telewizory', 'LG 65″ 4K NanoCell DVB-T2', 'Telewizor LG oferuje krystalicznie czysty obraz z technologią NanoCell', 3144.00, 'id4_1.png'),
(5, 'laptopy', 'Microsoft Surface i5/8GB/512 Platinum', '8GB Ramu, płaski laptop, dysk SSD m2 512GB, błyszczący led IPS, Windows 11', 3500.00, 'id5_1.png'),
(6, 'laptopy', 'HP Pavilion 15', 'Procesor i5-1130G\r\nPamięć Ram 32GB\r\nDysk SDD 512GB\r\nWindows 11', 3990.00, 'id6_1.png'),
(7, 'telewizory', 'Samsung AU8002 Crystal UHD 4K Smart TV 55\"', 'Smukły design, krystaliczne żywe kolory 60Hz, AndroidTV', 2750.00, 'id7_1.png'),
(8, 'telewizory', 'LG 55” NanoCell 4K 2021', 'Krystaliczny czysty obraz, Smart TV, osty i wyrazisty obraz', 3900.00, 'id8_1.png');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `recommended_products`
--

CREATE TABLE `recommended_products` (
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `recommended_products`
--

INSERT INTO `recommended_products` (`product_id`) VALUES
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
  `id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL,
  `password` varchar(1024) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_polish_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `isAdmin`) VALUES
(1, 'Kubator', '$2b$10$tXUHn8x6b8BmH4ofCvnVkeDo5Uuth11goYgfHA6UYdYaLRVHfGMWi', 'kubator@gmail.com', 1),
(6, 'Bartek', '$2b$10$5fcqGHfvHcafBRdegtAVJ.p9WZVCDEt0AP6xnV7u9t4AhvYGjxM0i', 'barteq@gmail.com', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_cart`
--

CREATE TABLE `user_cart` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user_cart`
--

INSERT INTO `user_cart` (`user_id`, `product_id`, `product_amount`) VALUES
(1, 2, 1),
(6, 5, 5),
(1, 4, 1),
(1, 7, 1),
(1, 5, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `delivery_types`
--
ALTER TABLE `delivery_types`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `delivery_type_id` (`delivery_type_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `orders_product`
--
ALTER TABLE `orders_product`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `recommended_products`
--
ALTER TABLE `recommended_products`
  ADD KEY `product_id` (`product_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user_cart`
--
ALTER TABLE `user_cart`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `delivery_types`
--
ALTER TABLE `delivery_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`delivery_type_id`) REFERENCES `delivery_types` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ograniczenia dla tabeli `orders_product`
--
ALTER TABLE `orders_product`
  ADD CONSTRAINT `orders_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Ograniczenia dla tabeli `recommended_products`
--
ALTER TABLE `recommended_products`
  ADD CONSTRAINT `recommended_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `user_cart`
--
ALTER TABLE `user_cart`
  ADD CONSTRAINT `user_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
