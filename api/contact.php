<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . "/PHPMailer/src/Exception.php";
require_once __DIR__ . "/PHPMailer/src/PHPMailer.php";
require_once __DIR__ . "/PHPMailer/src/SMTP.php";
require_once __DIR__ . "/config.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$name    = trim($data["name"]    ?? "");
$email   = trim($data["email"]   ?? "");
$subject = trim($data["subject"] ?? "");
$message = trim($data["message"] ?? "");

if (!$name || !$email || !$subject || !$message) {
    echo json_encode(["status" => "error", "message" => "All fields required"]);
    exit;
}

// Save to database
$stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
$stmt->execute([$name, $email, $subject, $message]);

// Send email
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPAuth   = true;
    $mail->Username   = "richardmanasseh081@gmail.com";
    $mail->Password   = "rgal ciyi eckl kzmm"; // Your app password
    
    // TEMPORARY: Disable SSL verification for localhost XAMPP only
    // REMOVE THESE 5 LINES when you deploy to live server!
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom("richardmanasseh081@gmail.com", "NaijaKitchen");
    $mail->addAddress("richardmanasseh081@gmail.com");
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "Contact: $subject";
    $mail->Body    = "<b>Name:</b> $name<br><b>Email:</b> $email<br><b>Subject:</b> $subject<br><b>Message:</b><br>$message";
    
    $mail->send();
    echo json_encode(["status" => "success", "message" => "Message sent! Check your email."]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Email failed: " . $mail->ErrorInfo]);
}