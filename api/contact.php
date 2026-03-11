<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "config.php";

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$subject = trim($data["subject"] ?? "");
$message = trim($data["message"] ?? "");

// Validate fields
if(!$name || !$email || !$subject || !$message){
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit;
}

try {
    // Insert into database
    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$name, $email, $subject, $message]);

    // Send email notification
    $to = "support@naijakitchen.com"; // <-- CHANGE this to your email
    $email_subject = "New Contact Message: $subject";

    $email_body = "You received a new message:\n\n".
                  "Name: $name\n".
                  "Email: $email\n".
                  "Subject: $subject\n\n".
                  "Message:\n$message";

    @mail($to, $email_subject, $email_body);

    echo json_encode([
        "status" => "success",
        "message" => "Message sent successfully"
    ]);

} catch(PDOException $e){
    echo json_encode([
        "status" => "error",
        "message" => "Failed to send message"
    ]);
}