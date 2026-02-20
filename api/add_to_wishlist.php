<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = intval($data['userId'] ?? 0);
$foodId = intval($data['foodId'] ?? 0);

if (!$userId || !$foodId) {
    echo json_encode(['message' => 'Invalid data']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO wishlist (user_id, food_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE added_at = CURRENT_TIMESTAMP");
    $stmt->execute([$userId, $foodId]);

    echo json_encode(['message' => 'Added to wishlist']);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>