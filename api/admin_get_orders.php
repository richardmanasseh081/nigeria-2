<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

try {
    $stmt = $pdo->query("
        SELECT o.id, o.total_amount, o.status, o.created_at, u.full_name, u.email
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    ");
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['orders' => $orders]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>