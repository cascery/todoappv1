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

    $sql = "SELECT * FROM todo WHERE list= '$listId'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $todos = array();
        while ($row = $result->fetch_assoc()) {
            $todos[] = [
                'id' => $row['id'],
                'context' => $row['context'],
                'completed' => $row['completed']
            ];
        }
        echo json_encode($todos); // Return the todos as JSON
    } else {
        echo json_encode(["error" => "No todos found for this list ID"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method or missing list_id parameter"]);
   
}

$conn->close();
?>
