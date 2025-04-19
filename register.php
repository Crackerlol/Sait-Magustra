
<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "magistr_cult");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$username = $conn->real_escape_string($data["username"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT);

$query = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
if ($conn->query($query)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Пользователь уже существует"]);
}
$conn->close();
?>
