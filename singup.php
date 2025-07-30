// signup.php
<?php
include "db.php";
$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$check = $conn->query("SELECT * FROM users WHERE email='$email'");
if ($check->num_rows > 0) {
    echo "Email already exists. Please login.";
} else {
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    echo ($conn->query($sql)) ? "Signup successful!" : "Signup failed: " . $conn->error;
}
?>