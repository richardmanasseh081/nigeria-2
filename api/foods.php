<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$category = trim($_GET['category'] ?? '');

try {
    $query = "SELECT id, name, price, category, description, image_url as image FROM foods";
    $params = [];

    if ($category) {
        $query .= " WHERE category = ?";
        $params[] = $category;
    }

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['products' => $foods]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>