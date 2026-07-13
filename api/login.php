<?php
// ✅ CORS FIRST
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit; 
}

require_once "config.php";

// Read JSON
$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

// Validate
if(!$email || !$password){
    echo json_encode([
        "status" => "error",
        "message" => "Missing fields"
    ]);
    exit;
}

// Find user
$stmt = $pdo->prepare("SELECT id, full_name, email, phone, password_hash FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$user){
    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
    exit;
}

// Verify password
if(!password_verify($password, $user["password_hash"])){
    echo json_encode([
        "status" => "error",
        "message" => "Incorrect password"
    ]);
    exit;
}

// Success
echo json_encode([
    "status" => "success",
    "user" => [
        "id" => $user["id"],
        "fullName" => $user["full_name"],
        "email" => $user["email"],
        "phone" => $user["phone"] ?? ""
    ]
]);