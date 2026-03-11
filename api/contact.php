<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1); // show errors for debugging
error_reporting(E_ALL);

require_once "config.php";

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$subject = trim($data["subject"] ?? "");
$message = trim($data["message"] ?? "");

// Validate required fields
if (!$name || !$email || !$subject || !$message) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

// Insert into database
try {
    $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $subject, $message]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    exit;
}

// Send email
$to = "support@naijakitchen.com"; // <-- change this to your actual email
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$emailMessage = "You received a new message from your website contact form:\n\n";
$emailMessage .= "Name: $name\n";
$emailMessage .= "Email: $email\n";
$emailMessage .= "Subject: $subject\n";
$emailMessage .= "Message:\n$message\n";

if (!mail($to, "Website Contact: $subject", $emailMessage, $headers)) {
    echo json_encode(["status" => "error", "message" => "Failed to send email"]);
    exit;
}

// Success
echo json_encode(["status" => "success", "message" => "Message sent successfully"]);