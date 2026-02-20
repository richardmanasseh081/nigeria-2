<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = intval($data['userId'] ?? 0);
$foodId = intval($data['foodId'] ?? 0);
$orderId = intval($data['orderId'] ?? 0);
$rating = intval($data['rating'] ?? 0);
$comment = trim($data['comment'] ?? '');

if (!$userId || !$foodId || $rating < 1 || $rating > 5) {
    echo json_encode(['message' => 'Invalid data']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO reviews (user_id, food_id, order_id, rating, comment) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$userId, $foodId, $orderId ?: null, $rating, $comment]);

    echo json_encode(['message' => 'Review submitted']);
} catch (Exception $e) {
    if ($e->getCode() == 23000) { // Duplicate
        echo json_encode(['message' => 'You have already reviewed this item']);
    } else {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>