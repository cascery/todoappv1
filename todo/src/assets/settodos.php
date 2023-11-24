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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['list_id']) && isset($_POST['task'])) {
    $listId = $_POST['list_id'];
    $task = $_POST['task'];

    $sql = "INSERT INTO todo (list, context, completed) VALUES ('$listId', '$task', 0)";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "New task added successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request or missing parameters"]);
}

$conn->close();
?>
