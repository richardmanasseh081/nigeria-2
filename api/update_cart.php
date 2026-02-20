<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = intval($data['userId'] ?? 0);
$foodId = intval($data['foodId'] ?? 0);
$quantity = intval($data['quantity'] ?? 0);

if (!$userId || !$foodId || $quantity < 0) {
    echo json_encode(['message' => 'Invalid data']);
    exit;
}

try {
    if ($quantity === 0) {
        // Remove from cart
        $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = ? AND food_id = ?");
        $stmt->execute([$userId, $foodId]);
        echo json_encode(['message' => 'Removed from cart']);
    } else {
        // Update quantity
        $stmt = $pdo->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND food_id = ?");
        $stmt->execute([$quantity, $userId, $foodId]);
        echo json_encode(['message' => 'Cart updated']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>