<?php

$host    = "localhost";
$db      = "ecommerce";
$user    = "root";
$pass    = "";
$charset = "utf8mb4";

$dsn     = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false, // use real prepared statements
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    // Only send JSON error if this is a direct API request (not just an include)
    if (!defined("CONFIG_INCLUDED")) {
        header("Content-Type: application/json");
        echo json_encode([
            "status"  => "error",
            "message" => "DB connection failed: " . $e->getMessage()
        ]);
        exit;
    }
    throw $e; // re-throw so the calling file can handle it
}