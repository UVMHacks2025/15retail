<?php
include 'database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $user_type = $_POST['user_type'];

    $sql = "INSERT INTO Users(user_ID, name, email, password_hash, user_type) 
            VALUES ('$user_ID', '$name', '$email', '$password', '$user_type')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
<form method="post">
    <input type="text" name="user_ID" placeholder="ID" required>
    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <select name="user_type">
        <option value="student">Student</option>
        <option value="organization">Organization</option>
    </select>
    <button type="submit">Register</button>
</form>