<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "config.php";

$category = $_GET['category'] ?? null;
$search = $_GET['search'] ?? null;

try {
    $query = "SELECT * FROM foods";
    $params = [];

    if ($category || $search) {
        $query .= " WHERE 1=1";
        if ($category) {
            $query .= " AND category = ?";
            $params[] = $category;
        }
        if ($search) {
            $query .= " AND (name LIKE ? OR description LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
    }

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $foods = $stmt->fetchAll();

    echo json_encode([
        "status" => "success",
        "data" => $foods
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
