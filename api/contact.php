<?php
// Handle preflight CORS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ─── Load PHPMailer ───────────────────────────────────────────────────────────
// Make sure you have PHPMailer in your project.
// Download from: https://github.com/PHPMailer/PHPMailer
// Place the src/ folder at: api/PHPMailer/src/
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . "/PHPMailer/src/Exception.php";
require_once __DIR__ . "/PHPMailer/src/PHPMailer.php";
require_once __DIR__ . "/PHPMailer/src/SMTP.php";

// ─── Load DB config ───────────────────────────────────────────────────────────
require_once __DIR__ . "/config.php"; // must define $pdo (PDO instance)

// ─── Read & validate input ────────────────────────────────────────────────────
$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid request data"]);
    exit;
}

$name    = trim($data["name"]    ?? "");
$email   = trim($data["email"]   ?? "");
$subject = trim($data["subject"] ?? "");
$message = trim($data["message"] ?? "");

if (!$name || !$email || !$subject || !$message) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email address"]);
    exit;
}

// ─── Save to database ─────────────────────────────────────────────────────────
try {
    $stmt = $pdo->prepare(
        "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$name, $email, $subject, $message]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    exit;
}

// ─── Gmail SMTP config ────────────────────────────────────────────────────────
// IMPORTANT: Use an App Password, NOT your real Gmail password.
// Steps to get one:
//   1. Go to https://myaccount.google.com/security
//   2. Enable 2-Step Verification
//   3. Search "App passwords" → create one for "Mail"
//   4. Paste the 16-character password below

define("GMAIL_USER", "richardmanasseh081@gmail.com");   // <-- your Gmail address
define("GMAIL_PASS", "dngn arda fino fihx");     // <-- your 16-char App Password
define("NOTIFY_TO",  "richardmanasseh081@gmail.com"); // <-- where to receive messages

// ─── Send email via Gmail SMTP ────────────────────────────────────────────────
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPAuth   = true;
    $mail->Username   = GMAIL_USER;
    $mail->Password   = GMAIL_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom(GMAIL_USER, "NaijaKitchen Contact Form");
    $mail->addAddress(NOTIFY_TO, "NaijaKitchen Support");
    $mail->addReplyTo($email, $name); // reply goes back to the sender

    // Content
    $mail->isHTML(true);
    $mail->Subject = "Website Contact: $subject";
    $mail->Body    = "
        <div style='font-family: Arial, sans-serif; max-width: 600px;'>
            <h2 style='color: #16a34a;'>New Contact Message — NaijaKitchen</h2>
            <table style='width:100%; border-collapse:collapse;'>
                <tr><td style='padding:8px; font-weight:bold; color:#374151;'>Name:</td>
                    <td style='padding:8px; color:#111827;'>$name</td></tr>
                <tr style='background:#f9fafb;'>
                    <td style='padding:8px; font-weight:bold; color:#374151;'>Email:</td>
                    <td style='padding:8px; color:#111827;'>$email</td></tr>
                <tr><td style='padding:8px; font-weight:bold; color:#374151;'>Subject:</td>
                    <td style='padding:8px; color:#111827;'>$subject</td></tr>
            </table>
            <h3 style='color:#374151; margin-top:20px;'>Message:</h3>
            <div style='background:#f3f4f6; padding:16px; border-radius:8px; color:#111827; white-space:pre-wrap;'>$message</div>
            <p style='color:#9ca3af; font-size:12px; margin-top:20px;'>
                Sent from NaijaKitchen contact form at " . date("Y-m-d H:i:s") . "
            </p>
        </div>
    ";
    $mail->AltBody = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

    $mail->send();

    echo json_encode(["status" => "success", "message" => "Message sent successfully"]);

} catch (Exception $e) {
    // Message was saved to DB but email failed — still tell the user, log the error
    error_log("PHPMailer error: " . $mail->ErrorInfo);
    echo json_encode([
        "status"  => "error",
        "message" => "Message saved but email failed: " . $mail->ErrorInfo
    ]);
}