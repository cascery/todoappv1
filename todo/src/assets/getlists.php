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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['user_id'])) {
    $user_id = intval($_POST['user_id']); 

    $sql = "SELECT * FROM list WHERE user = $user_id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $lists = array();
        while ($row = $result->fetch_assoc()) {
            $lists[] = [
                'id' => $row['id'],
                'title' => $row['title'],
               
            ];
        }
        echo json_encode($lists); // Return the titles as JSON
    } else {
        echo json_encode(["error" => "No lists found for this user"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method or missing user_id parameter"]);
    echo json_encode ($_SERVER['REQUEST_METHOD']);
}

$conn->close();
?>
