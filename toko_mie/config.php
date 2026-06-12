<?php
// config.php - Konfigurasi Dasar Toko Mie

session_start();

// Setting dasar
define('BASE_URL', 'http://localhost/toko_mie/');

// Koneksi ke Database (nama database = toko_mie)
try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=toko_mie;charset=utf8mb4",
        "root",
        "",
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    die("❌ Koneksi database gagal!<br><br>
        Pastikan:<br>
        1. XAMPP MySQL sudah dijalankan<br>
        2. Database bernama <b>toko_mie</b> sudah dibuat<br><br>
        Error: " . $e->getMessage());
}

// CSRF Token untuk keamanan
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

function csrf_token() {
    return $_SESSION['csrf_token'];
}

function is_logged_in() {
    return isset($_SESSION['user_id']);
}

function is_admin() {
    return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
}

function redirect($url) {
    header("Location: $url");
    exit;
}
?>