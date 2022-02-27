-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 27 Lut 2022, 20:12
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
  `delivery_cost` float NOT NULL,
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

INSERT INTO `orders` (`id`, `user_id`, `date`, `status`, `delivery_type_id`, `delivery_cost`, `name`, `surname`, `town`, `postal_code`, `street`, `phone`) VALUES
(40, 1, '2022-02-27 16:28:29', 'zakończono', 1, 25, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(41, 1, '2022-02-27 17:44:50', 'zakończono', 1, 25, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(42, 1, '2022-02-27 17:49:00', 'zakończono', 1, 25, 'Piotr', 'Zys', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(43, 1, '2022-02-27 17:49:44', 'zakończono', 2, 12, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(44, 1, '2022-02-27 17:49:58', 'anulowano', 1, 25, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(45, 1, '2022-02-27 17:51:47', 'zakończono', 1, 25, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789'),
(50, 1, '2022-02-27 19:33:17', 'wysłane', 1, 25, 'Piotr', 'Truskawkiewicz', 'Łódź', '91-321', 'Piotrkowska 22', '123456789');

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
(40, 2, 2, 700),
(40, 4, 1, 3144),
(41, 1, 1, 1300),
(42, 1, 1, 1300),
(43, 1, 1, 1300),
(43, 3, 1, 1400),
(44, 1, 1, 1300),
(45, 2, 1, 700),
(46, 2, 1, 700),
(47, 2, 1, 700),
(48, 2, 1, 700),
(49, 2, 1, 700),
(50, 4, 2, 3144);

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
(1, 'telefony', 'Redmi 10X Pro 5G 8/256GB', '48px super telefon ekstra fajny', 1300.00, 'id1_1.jpg'),
(2, 'podzespoły komputerowe', 'AMD RYZEN 2400G 3.6GHz VEGA 11', 'Procesor ze zintegrowaną kartą graficzną Vega 11 \r\n4 RDZENIE 8 WĄTKÓW 3.6GHz', 700.00, 'id2_1.jpg'),
(3, 'telefony', 'Redmi Note 10S 6/128GB Fioletowy', 'Redmi Note 10S teraz napędzany mocą Helio G95! Inteligentny aparat główny 64MP uchwyci wspaniałe scenerie. Odporna na zachlapania obudowa, piękny wyświetlacz oraz bardzo pojemna bateria 5000mAh.', 1400.00, 'id3_1.jpg'),
(4, 'telewizory', 'LG 65″ 4K NanoCell DVB-T2', 'Telewizor LG oferuje krystalicznie czysty obraz z technologią NanoCell', 3144.00, 'id4_1.jpg');

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
(1, 4, 2);

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
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
