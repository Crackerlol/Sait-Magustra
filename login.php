
<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "magistr_cult");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$username = $conn->real_escape_string($data["username"]);
$password = $data["password"];

$query = "SELECT password FROM users WHERE username = '$username'";
$result = $conn->query($query);

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row["password"])) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Неверный пароль"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Пользователь не найден"]);
}
$conn->close();
?>
