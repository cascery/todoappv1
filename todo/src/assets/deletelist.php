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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['list_id'])) {
    $listId = $_POST['list_id'];

    $sqlDeleteTodos = "DELETE FROM todo WHERE list = '$listId'";
    if ($conn->query($sqlDeleteTodos) !== TRUE) {
        echo json_encode(["success" => false, "error" => "Error deleting todos: " . $conn->error]);
        $conn->close();
        exit();
    }

    // Now, delete the list
    $sqlDeleteList = "DELETE FROM list WHERE id = '$listId'";
    if ($conn->query($sqlDeleteList) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Error deleting list: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request"]);
}

$conn->close();
?>
