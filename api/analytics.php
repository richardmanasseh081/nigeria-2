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

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    echo json_encode(["status" => "error", "message" => "User ID required"]);
    exit;
}

try {
    // Total orders
    $stmt = $pdo->prepare("SELECT COUNT(*) as total_orders FROM orders WHERE user_id = ?");
    $stmt->execute([$userId]);
    $totalOrders = $stmt->fetch()['total_orders'];

    // Total spent
    $stmt = $pdo->prepare("SELECT SUM(total_amount) as total_spent FROM orders WHERE user_id = ? AND status = 'delivered'");
    $stmt->execute([$userId]);
    $totalSpent = $stmt->fetch()['total_spent'] ?? 0;

    // Favorite food (most ordered)
    $stmt = $pdo->prepare("SELECT f.name, COUNT(oi.food_id) as order_count 
                           FROM order_items oi 
                           JOIN orders o ON oi.order_id = o.id 
                           JOIN foods f ON oi.food_id = f.id 
                           WHERE o.user_id = ? 
                           GROUP BY oi.food_id 
                           ORDER BY order_count DESC 
                           LIMIT 1");
    $stmt->execute([$userId]);
    $favoriteFood = $stmt->fetch();

    echo json_encode([
        "status" => "success",
        "data" => [
            "total_orders" => $totalOrders,
            "total_spent" => $totalSpent,
            "favorite_food" => $favoriteFood ? $favoriteFood['name'] : "None"
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
