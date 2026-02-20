<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$orderId = intval($_GET['orderId'] ?? 0);

if (!$orderId) {
    echo json_encode(['message' => 'Order ID required']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT o.id, o.total_amount, o.status, o.delivery_address, o.payment_method, o.created_at, o.updated_at,
               f.name, oi.quantity, oi.price
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN foods f ON oi.food_id = f.id
        WHERE o.id = ?
    ");
    $stmt->execute([$orderId]);
    $orderDetails = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($orderDetails)) {
        echo json_encode(['message' => 'Order not found']);
        exit;
    }

    $order = [
        'id' => $orderDetails[0]['id'],
        'total_amount' => $orderDetails[0]['total_amount'],
        'status' => $orderDetails[0]['status'],
        'delivery_address' => $orderDetails[0]['delivery_address'],
        'payment_method' => $orderDetails[0]['payment_method'],
        'created_at' => $orderDetails[0]['created_at'],
        'updated_at' => $orderDetails[0]['updated_at'],
        'items' => array_map(function($item) {
            return [
                'name' => $item['name'],
                'quantity' => $item['quantity'],
                'price' => $item['price']
            ];
        }, $orderDetails)
    ];

    echo json_encode(['order' => $order]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>