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

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$fullName = trim($data["fullName"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$password = $data["password"] ?? "";

// Validate
if(!$fullName || !$email || !$phone || !$password){
    echo json_encode(["status"=>"error","message"=>"Missing fields"]);
    exit;
}

// Check email
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if($stmt->fetch()){
    echo json_encode(["status"=>"error","message"=>"Email already registered"]);
    exit;
}

// Hash password
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insert
try {
    $stmt = $pdo->prepare("INSERT INTO users(full_name,email,phone,password_hash) VALUES(?,?,?,?)");
    $stmt->execute([$fullName, $email, $phone, $hash]);
    $userId = $pdo->lastInsertId();

    echo json_encode([
        "status"=>"success",
        "user"=>[
            "id"=>$userId,
            "fullName"=>$fullName,
            "email"=>$email,
            "phone"=>$phone
        ]
    ]);
} catch(PDOException $e){
    echo json_encode([
        "status"=>"error",
        "message"=>"Database error"
    ]);
}