<?php
header("Content-Type: application/json");

$host = "localhost";
$db   = "ecommerce";  // Using your existing database
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Use existing ecommerce database
    $pdo->exec("USE $db");

    // Read and execute SQL file
    $sqlFile = __DIR__ . "/../database_setup.sql";
    
    if (!file_exists($sqlFile)) {
        echo json_encode(["status" => "error", "message" => "SQL file not found"]);
        exit;
    }
    
    $sql = file_get_contents($sqlFile);
    $pdo->exec($sql);

    echo json_encode([
        "status" => "success", 
        "message" => "Tables added to '$db' database successfully!"
    ]);

} catch(PDOException $e) {
    echo json_encode([
        "status" => "error", 
        "message" => $e->getMessage()
    ]);
}