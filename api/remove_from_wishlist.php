<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$userId = intval($_GET['userId'] ?? 0);
$foodId = intval($_GET['foodId'] ?? 0);

if (!$userId || !$foodId) {
    echo json_encode(['message' => 'Invalid data']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM wishlist WHERE user_id = ? AND food_id = ?");
    $stmt->execute([$userId, $foodId]);

    echo json_encode(['message' => 'Removed from wishlist']);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>