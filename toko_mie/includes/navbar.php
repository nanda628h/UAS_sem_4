<?php 
$cart_count = isset($_SESSION['cart']) ? array_sum($_SESSION['cart'] ?? []) : 0;
?>
<nav class="navbar navbar-expand-lg navbar-dark bg-danger sticky-top">
    <div class="container">
        <a class="navbar-brand fw-bold fs-3" href="index.php">🍜 Toko Mie</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="products.php">Semua Mie</a></li>
            </ul>
            
            <div class="d-flex align-items-center gap-3">
                <a href="cart.php" class="text-white position-relative">
                    <i class="fas fa-shopping-cart fa-2x"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning" id="cart-count">
                        <?= $cart_count ?>
                    </span>
                </a>
                
                <?php if (is_logged_in()): ?>
                    <a href="profile.php" class="text-white"><?= htmlspecialchars($_SESSION['full_name'] ?? 'User') ?></a>
                    <a href="logout.php" class="btn btn-outline-light btn-sm">Logout</a>
                <?php else: ?>
                    <a href="login.php" class="btn btn-outline-light btn-sm">Login</a>
                    <a href="register.php" class="btn btn-light btn-sm">Daftar</a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</nav>