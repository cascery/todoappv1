<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'todo_app';

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['user_id']) && isset($_POST['title'])) {
    $userId = $_POST['user_id'];
    $title = $_POST['title'];

    // Perform sanitization and validation on $userId and $title if needed

    $sql = "INSERT INTO list (user, title) VALUES ('$userId', '$title')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "New list added successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => "Error adding new list: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request or missing parameters"]);
}

$conn->close();
?>
