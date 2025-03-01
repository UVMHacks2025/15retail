<?php
include 'database.php';

$sql = "SELECT l.listing_id, l.title, l.description, l.price, l.status, u.name AS seller_name, u.user_type
        FROM listings l
        JOIN users u ON l.user_id = u.user_id
        WHERE l.status = 'available'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='listing'>";
        echo "<h3>" . htmlspecialchars($row['title']) . "</h3>";
        echo "<p>" . htmlspecialchars($row['description']) . "</p>";
        echo "<p><strong>Price:</strong> $" . htmlspecialchars($row['price']) . "</p>";
        echo "<p><strong>Seller:</strong> " . htmlspecialchars($row['seller_name']) . "</p>";
        echo "<p><strong>Status:</strong> " . htmlspecialchars($row['status']) . "</p>";
        echo "<a href='view_listing.php?id=" . $row['listing_id'] . "'>View Details</a>";
        echo "</div>";
    }
} else {
    echo "No listings available.";
}
?><?php
