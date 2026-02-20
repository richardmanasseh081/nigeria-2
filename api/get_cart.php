<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$userId = intval($_GET['userId'] ?? 0);

if (!$userId) {
    echo json_encode(['message' => 'User ID required']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT c.id, c.quantity, f.id as food_id, f.name, f.price, f.image_url as image
        FROM cart c
        JOIN foods f ON c.food_id = f.id
        WHERE c.user_id = ?
    ");
    $stmt->execute([$userId]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['cart' => $cartItems]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>