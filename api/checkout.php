<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = intval($data['userId'] ?? 0);

if (!$userId) {
    echo json_encode(['message' => 'User ID required']);
    exit;
}

try {
    // Get cart items
    $stmt = $pdo->prepare("
        SELECT c.food_id, c.quantity, f.price
        FROM cart c
        JOIN foods f ON c.food_id = f.id
        WHERE c.user_id = ?
    ");
    $stmt->execute([$userId]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($cartItems)) {
        echo json_encode(['message' => 'Cart is empty']);
        exit;
    }

    // Calculate total
    $total = 0;
    foreach ($cartItems as $item) {
        $total += $item['price'] * $item['quantity'];
    }

    // Create order
    $deliveryAddress = trim($data['deliveryAddress'] ?? '');
    $paymentMethod = trim($data['paymentMethod'] ?? 'cash');

    $stmt = $pdo->prepare("INSERT INTO orders (user_id, total_amount, delivery_address, payment_method) VALUES (?, ?, ?, ?)");
    $stmt->execute([$userId, $total, $deliveryAddress, $paymentMethod]);
    $orderId = $pdo->lastInsertId();

    // Add order items
    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, food_id, quantity, price) VALUES (?, ?, ?, ?)");
    foreach ($cartItems as $item) {
        $stmt->execute([$orderId, $item['food_id'], $item['quantity'], $item['price']]);
    }

    // Clear cart
    $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->execute([$userId]);

    echo json_encode(['message' => 'Order placed successfully', 'orderId' => $orderId]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>