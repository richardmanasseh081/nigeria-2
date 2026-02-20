<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$fullName = trim($data['fullName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$password = $data['password'] ?? '';

if (!$email) {
    echo json_encode(['message' => 'Missing email']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['message' => 'Invalid email format']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['message' => 'Password must be at least 6 characters']);
    exit;
}

if (strlen($fullName) < 2) {
    echo json_encode(['message' => 'Full name must be at least 2 characters']);
    exit;
}

try {
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['message' => 'Email already registered']);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, phone, password_hash) VALUES (?, ?, ?, ?)");
    $stmt->execute([$fullName, $email, $phone, $passwordHash]);
    $userId = $pdo->lastInsertId();

    echo json_encode([
        'user' => [
            'id' => $userId,
            'email' => $email,
            'name' => $fullName,
            'phone' => $phone
        ]
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>