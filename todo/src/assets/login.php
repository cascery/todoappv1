<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Replace these with your database credentials
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'todo_app';

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

// Get POST data
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Check if email and password are not empty
if (empty($email) || empty($password)) {
    die(json_encode(["success" => false, "error" => "Email or password cannot be empty"]));
}

// Create the SQL query (traditional way, not using prepared statements)
$query = "SELECT * FROM user WHERE email = '{$email}' AND password = '{$password}'";
$result = $conn->query($query);

if ($result) {
    if ($result->num_rows > 0) {
        // Respond with success if a matching record is found
        echo json_encode(["success" => true]);
    } else {
        // Respond with error for no matching records
        echo json_encode(["success" => false, "error" => "Invalid email or password"]);
    }
} else {
    // Respond with error for SQL query failure
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
