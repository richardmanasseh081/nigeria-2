<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "config.php";

$userId = $_GET['user_id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$userId) {
        echo json_encode(["status" => "error", "message" => "User ID required"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT w.*, f.name, f.price, f.image_url FROM wishlist w JOIN foods f ON w.food_id = f.id WHERE w.user_id = ?");
        $stmt->execute([$userId]);
        $items = $stmt->fetchAll();

        echo json_encode(["status" => "success", "data" => $items]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['user_id'] ?? null;
    $foodId = $data['food_id'] ?? null;

    if (!$userId || !$foodId) {
        echo json_encode(["status" => "error", "message" => "Missing fields"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT IGNORE INTO wishlist (user_id, food_id) VALUES (?, ?)");
        $stmt->execute([$userId, $foodId]);

        echo json_encode(["status" => "success", "message" => "Wishlist updated"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['user_id'] ?? null;
    $foodId = $data['food_id'] ?? null;

    if (!$userId || !$foodId) {
        echo json_encode(["status" => "error", "message" => "Missing fields"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM wishlist WHERE user_id = ? AND food_id = ?");
        $stmt->execute([$userId, $foodId]);

        echo json_encode(["status" => "success", "message" => "Item removed from wishlist"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
