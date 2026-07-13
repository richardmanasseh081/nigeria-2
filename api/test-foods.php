<?php
header("Content-Type: application/json");
require_once "config.php";

try {
    $stmt = $pdo->query("SELECT * FROM foods");
    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "count" => count($foods),
        "data" => $foods
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}