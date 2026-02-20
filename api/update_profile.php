<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = intval($data['userId'] ?? 0);
$fullName = trim($data['fullName'] ?? '');
$phone = trim($data['phone'] ?? '');

if (!$userId || strlen($fullName) < 2) {
    echo json_encode(['message' => 'Invalid data']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE users SET full_name = ?, phone = ? WHERE id = ?");
    $stmt->execute([$fullName, $phone, $userId]);

    echo json_encode(['message' => 'Profile updated']);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>