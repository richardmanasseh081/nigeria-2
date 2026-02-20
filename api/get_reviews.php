<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$foodId = intval($_GET['foodId'] ?? 0);

if (!$foodId) {
    echo json_encode(['message' => 'Food ID required']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT r.rating, r.comment, r.created_at, u.full_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.food_id = ?
        ORDER BY r.created_at DESC
    ");
    $stmt->execute([$foodId]);
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculate average rating
    $totalRating = 0;
    foreach ($reviews as $review) {
        $totalRating += $review['rating'];
    }
    $averageRating = count($reviews) > 0 ? $totalRating / count($reviews) : 0;

    echo json_encode([
        'reviews' => $reviews,
        'averageRating' => round($averageRating, 1),
        'totalReviews' => count($reviews)
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>