<?php
include 'database.php';
$result = $conn->query("SELECT * FROM listings WHERE status='available'");
?>
    <!DOCTYPE html>
    <html>
<head><title>Marketplace</title></head>
<body>
<h2>Available Listings</h2>
<?php while ($row = $result->fetch_assoc()) { ?>
    <div>
        <h3><?= $row['title'] ?></h3>
        <p><?= $row['description'] ?></p>
        <p>Price: $<?= $row['price'] ?></p>
        <button onclick="buyItem(<?= $row['listing_id'] ?>)">Buy</button>
    </div>
<?php } ?>
<script>
    function buyItem(id) {
        fetch('buy.php', {
            method: 'POST',
            body: JSON.stringify({ listing_id: id })
        }).then(res => res.text()).then(data => alert(data));
    }
</script>
</body>
</html>
