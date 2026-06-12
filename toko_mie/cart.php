<?php 
require_once 'config.php';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// Tambah ke keranjang via AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'add') {
    $product_id = (int)$_POST['product_id'];
    
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    
    $_SESSION['cart'][$product_id] = ($_SESSION['cart'][$product_id] ?? 0) + 1;
    
    echo json_encode(['success' => true, 'message' => 'Mie berhasil ditambahkan ke keranjang! 🍜']);
    exit;
}

// Hitung jumlah item di keranjang (untuk navbar)
if ($action === 'count') {
    $count = isset($_SESSION['cart']) ? array_sum($_SESSION['cart']) : 0;
    echo json_encode(['count' => $count]);
    exit;
}

// Tampilan halaman Keranjang
$items = [];
$total = 0;

if (!empty($_SESSION['cart'])) {
    $ids = array_keys($_SESSION['cart']);
    $placeholders = str_repeat('?,', count($ids) - 1) . '?';
    
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id IN ($placeholders)");
    $stmt->execute($ids);
    $products = $stmt->fetchAll();
    
    foreach ($products as $p) {
        $qty = $_SESSION['cart'][$p['id']];
        $subtotal = $p['price'] * $qty;
        $total += $subtotal;
        
        $items[] = array_merge($p, ['qty' => $qty, 'subtotal' => $subtotal]);
    }
}
?>

<div class="container py-5">
    <h2 class="mb-4">🛒 Keranjang Belanja</h2>

    <?php if (empty($items)): ?>
        <div class="text-center py-5">
            <h4>Keranjang kamu kosong</h4>
            <a href="products.php" class="btn btn-danger mt-3">Belanja Sekarang</a>
        </div>
    <?php else: ?>
        <table class="table table-bordered">
            <thead class="table-danger">
                <tr>
                    <th>Produk</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($items as $item): ?>
                <tr>
                    <td><?= htmlspecialchars($item['name']) ?></td>
                    <td>Rp <?= number_format($item['price'], 0, ',', '.') ?></td>
                    <td><?= $item['qty'] ?></td>
                    <td>Rp <?= number_format($item['subtotal'], 0, ',', '.') ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <div class="text-end">
            <h4>Total: <strong>Rp <?= number_format($total, 0, ',', '.') ?></strong></h4>
            <a href="checkout.php" class="btn btn-success btn-lg mt-3">Lanjut ke Checkout →</a>
        </div>
    <?php endif; ?>
</div>

<?php require_once 'includes/footer.php'; ?>