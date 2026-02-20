<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = intval($data['userId'] ?? 0);
$foodId = intval($data['foodId'] ?? 0);
$quantity = intval($data['quantity'] ?? 1);

if (!$userId || !$foodId || $quantity < 1) {
    echo json_encode(['message' => 'Invalid data']);
    exit;
}

try {
    // Check if food exists
    $stmt = $pdo->prepare("SELECT id FROM foods WHERE id = ?");
    $stmt->execute([$foodId]);
    if (!$stmt->fetch()) {
        echo json_encode(['message' => 'Food not found']);
        exit;
    }

    // Add or update cart
    $stmt = $pdo->prepare("INSERT INTO cart (user_id, food_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?");
    $stmt->execute([$userId, $foodId, $quantity, $quantity]);

    echo json_encode(['message' => 'Added to cart']);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>