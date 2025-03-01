<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if user exists
    $stmt = $conn->prepare("SELECT user_id, password_hash, user_type FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($user_id, $password_hash, $user_type);

    if ($stmt->fetch() && password_verify($password, $password_hash)) {
        // Set session variables
        $_SESSION['user_id'] = $user_id;
        $_SESSION['user_type'] = $user_type;

        // Redirect to dashboard (or home)
        header("Location: dashboard.php");
    } else {
        echo "Invalid email or password!";
    }
}
?>

    <form method="POST" action="login.php">
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form><?php
