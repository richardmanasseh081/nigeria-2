<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "config.php";

$foodId = $_GET['food_id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$foodId) {
        echo json_encode(["status" => "error", "message" => "Food ID required"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT r.*, u.full_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.food_id = ? ORDER BY r.created_at DESC");
        $stmt->execute([$foodId]);
        $reviews = $stmt->fetchAll();

        echo json_encode(["status" => "success", "data" => $reviews]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['user_id'] ?? null;
    $foodId = $data['food_id'] ?? null;
    $rating = $data['rating'] ?? null;
    $comment = $data['comment'] ?? "";
    $orderId = $data['order_id'] ?? null;

    if (!$userId || !$foodId || !$rating) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO reviews (user_id, food_id, order_id, rating, comment) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment)");
        $stmt->execute([$userId, $foodId, $orderId, $rating, $comment]);

        echo json_encode(["status" => "success", "message" => "Review submitted"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
