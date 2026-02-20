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
        SELECT w.id, f.id as food_id, f.name, f.price, f.category, f.description, f.image_url as image
        FROM wishlist w
        JOIN foods f ON w.food_id = f.id
        WHERE w.user_id = ?
        ORDER BY w.added_at DESC
    ");
    $stmt->execute([$userId]);
    $wishlist = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['wishlist' => $wishlist]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>