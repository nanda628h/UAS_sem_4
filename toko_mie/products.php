<?php 
require_once 'config.php';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

// Ambil semua produk
$stmt = $pdo->query("SELECT p.*, c.name as category_name 
                     FROM products p 
                     JOIN categories c ON p.category_id = c.id 
                     ORDER BY p.id DESC");
$products = $stmt->fetchAll();

// Best Sellers (untuk index.php)
if (isset($_GET['action']) && $_GET['action'] === 'best') {
    $best = array_slice($products, 0, 4);
    echo '<div class="row">';
    foreach ($best as $p) {
        echo '
        <div class="col-md-3 mb-4">
            <div class="card card-product h-100">
                <img src="' . htmlspecialchars($p['image']) . '" class="card-img-top product-img" alt="' . htmlspecialchars($p['name']) . '" style="height:200px; object-fit:cover;">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">' . htmlspecialchars($p['name']) . '</h6>
                    <small class="text-muted">' . htmlspecialchars($p['category_name']) . '</small>
                    <div class="mt-auto">
                        <div class="price">Rp ' . number_format($p['price'], 0, ',', '.') . '</div>
                        <button onclick="addToCart(' . $p['id'] . ')" class="btn btn-danger btn-sm w-100 mt-2">
                            <i class="fas fa-cart-plus"></i> Tambah
                        </button>
                    </div>
                </div>
            </div>
        </div>';
    }
    echo '</div>';
    exit;
}
?>

<div class="container py-5">
    <h2 class="mb-4">🍜 Semua Produk Mie Instan</h2>
    
    <div class="row">
        <?php foreach ($products as $p): ?>
        <div class="col-md-3 mb-4">
            <div class="card card-product h-100">
                <img src="<?= htmlspecialchars($p['image']) ?>" 
                     class="card-img-top product-img" 
                     alt="<?= htmlspecialchars($p['name']) ?>" 
                     style="height:220px; object-fit:cover;">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title"><?= htmlspecialchars($p['name']) ?></h6>
                    <small class="text-muted"><?= htmlspecialchars($p['category_name']) ?></small>
                    
                    <div class="mt-auto">
                        <div class="price">Rp <?= number_format($p['price'], 0, ',', '.') ?></div>
                        <div class="text-warning small"><?= str_repeat('★', round($p['rating'])) ?></div>
                        <button onclick="addToCart(<?= $p['id'] ?>)" class="btn btn-danger btn-sm w-100 mt-2">
                            <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>