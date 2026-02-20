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
        SELECT o.id, o.total_amount, o.status, o.delivery_address, o.payment_method, o.created_at,
               GROUP_CONCAT(CONCAT(f.name, ' (x', oi.quantity, ')') SEPARATOR ', ') as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN foods f ON oi.food_id = f.id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
    ");
    $stmt->execute([$userId]);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['orders' => $orders]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>