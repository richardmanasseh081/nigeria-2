<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "config.php";

$userId = $_GET['user_id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$userId) {
        echo json_encode(["status" => "error", "message" => "User ID required"]);
        exit;
    }

    try {
        // Fetch orders with their items
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $orders = $stmt->fetchAll();

        foreach ($orders as &$order) {
            $stmtItems = $pdo->prepare("SELECT oi.*, f.name, f.image_url FROM order_items oi JOIN foods f ON oi.food_id = f.id WHERE oi.order_id = ?");
            $stmtItems->execute([$order['id']]);
            $order['items'] = $stmtItems->fetchAll();
        }

        echo json_encode(["status" => "success", "data" => $orders]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['user_id'] ?? null;
    $totalAmount = $data['total_amount'] ?? null;
    $address = $data['delivery_address'] ?? null;
    $paymentMethod = $data['payment_method'] ?? 'Cash on Delivery';
    $items = $data['items'] ?? [];

    if (!$userId || !$totalAmount || empty($items)) {
        echo json_encode(["status" => "error", "message" => "Missing required order information"]);
        exit;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("INSERT INTO orders (user_id, total_amount, delivery_address, payment_method) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userId, $totalAmount, $address, $paymentMethod]);
        $orderId = $pdo->lastInsertId();

        $stmtItem = $pdo->prepare("INSERT INTO order_items (order_id, food_id, quantity, price) VALUES (?, ?, ?, ?)");
        foreach ($items as $item) {
            $stmtItem->execute([$orderId, $item['id'], $item['quantity'], $item['price']]);
        }

        // Optionally clear cart after order
        $stmtClearCart = $pdo->prepare("DELETE FROM cart WHERE user_id = ?");
        $stmtClearCart->execute([$userId]);

        $pdo->commit();

        echo json_encode([
            "status" => "success",
            "message" => "Order placed successfully",
            "order_id" => $orderId
        ]);
    } catch (PDOException $e) {
        $pdo->rollBack();
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
