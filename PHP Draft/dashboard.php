<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php"); // Redirect to login if not logged in
    exit;
}

include 'db.php';
$user_id = $_SESSION['user_id'];

// Get user info
$stmt = $conn->prepare("SELECT name, user_type FROM users WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($name, $user_type);
$stmt->fetch();

echo "<h1>Welcome, $name!</h1>";
echo "<p>User type: $user_type</p>";

if ($user_type == 'student') {
    // Display student-specific content
    echo "<a href='add_listing.php'>Add a Listing</a>";
} else {
    // Display organization-specific content
    echo "<a href='add_inventory.php'>Add Inventory</a>";
}
?>