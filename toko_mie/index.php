<?php 
require_once 'config.php'; 
require_once 'includes/header.php'; 
require_once 'includes/navbar.php'; 
?>

<div class="container py-5">
    <div class="text-center mb-5">
        <h1 class="display-4 fw-bold">Toko Mie</h1>
        <p class="lead">Mie Instan Indonesia • Lengkap • Murah • Enak</p>
        <a href="products.php" class="btn btn-danger btn-lg px-5">Lihat Semua Produk</a>
    </div>

    <h2 class="mb-4">Produk Terlaris</h2>
    <div class="row" id="best-sellers">
        <!-- Akan diisi otomatis nanti -->
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>

<script>
fetch('products.php?action=best')
    .then(response => response.text())
    .then(html => {
        document.getElementById('best-sellers').innerHTML = html;
    });
</script>