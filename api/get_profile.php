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
    $stmt = $pdo->prepare("SELECT id, full_name, email, phone, created_at FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['message' => 'User not found']);
        exit;
    }

    echo json_encode(['user' => $user]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>