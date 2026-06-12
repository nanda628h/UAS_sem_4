<?php
// setup.php - Setup Database Toko Mie

echo "<h1>🚀 Setup Toko Mie Sedang Berjalan...</h1>";

try {
    // Koneksi ke MySQL
    $pdo = new PDO("mysql:host=localhost;charset=utf8mb4", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Buat database jika belum ada
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `toko_mie` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ Database <b>toko_mie</b> siap.<br>";

    // Pilih database
    $pdo->exec("USE `toko_mie`");

    // Jalankan SQL dari file database.sql
    $sql = file_get_contents(__DIR__ . '/database.sql');
    $pdo->exec($sql);

    echo "<h2 style='color:green'>✅ Setup Berhasil 100%!</h2>";
    echo "<p>Database dan data mie instan sudah dimasukkan.</p>";
    echo "<hr>";
    echo "<h3>Login Admin:</h3>";
    echo "<p><b>Email:</b> admin@toko_mie.com<br>";
    echo "<b>Password:</b> admin123</p>";
    echo "<br>";
    echo "<a href='index.php' style='font-size:20px; padding:10px 20px; background:#000; color:white; text-decoration:none;'>Buka Website Toko Mie →</a>";

} catch (PDOException $e) {
    die("<h2 style='color:red'>❌ Error Setup:</h2>" . $e->getMessage());
}
?>