-- Database Toko Mie - Mie Instan Indonesia

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    address TEXT NULL,
    phone VARCHAR(20) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT NULL,
    price DECIMAL(12,2) NOT NULL,
    stock INT NOT NULL DEFAULT 100,
    image VARCHAR(255) NOT NULL,
    rating DECIMAL(3,1) DEFAULT 5.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    invoice_number VARCHAR(20) UNIQUE NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'completed') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Data Dummy

-- User Admin
INSERT IGNORE INTO users (full_name, email, password, role) 
VALUES ('Admin Toko Mie', 'admin@toko_mie.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Kategori Mie Instan
INSERT IGNORE INTO categories (name, slug, description) VALUES
('Mie Goreng', 'mie-goreng', 'Mie goreng favorit masyarakat Indonesia'),
('Mie Kuah', 'mie-kuah', 'Mie instan berkuah'),
('Mie Cup', 'mie-cup', 'Mie cup siap saji'),
('Mie Premium', 'mie-premium', 'Mie instan premium');

-- Produk Mie Instan
INSERT IGNORE INTO products (category_id, name, slug, description, price, stock, image, rating) VALUES
(1, 'Indomie Goreng', 'indomie-goreng', 'Mie goreng legendaris dengan bumbu khas', 3200, 500, 'https://picsum.photos/id/20/600/400', 5.0),
(1, 'Indomie Rendang', 'indomie-rendang', 'Rasa rendang daging yang kaya rempah', 3500, 250, 'https://picsum.photos/id/201/600/400', 4.9),
(1, 'Indomie Soto Ayam', 'indomie-soto', 'Mie goreng rasa soto ayam', 3200, 400, 'https://picsum.photos/id/292/600/400', 4.8),
(2, 'Indomie Kuah Kaldu Ayam', 'indomie-kuah-ayam', 'Mie kuah dengan kaldu gurih', 3200, 350, 'https://picsum.photos/id/431/600/400', 4.7),
(3, 'Pop Mie Ayam Bawang', 'popmie-ayam', 'Mie cup ayam bawang praktis', 6500, 200, 'https://picsum.photos/id/870/600/400', 4.9),
(4, 'Mie Sedap Gourmet Rendang', 'miesedap-gourmet', 'Mie premium rasa rendang', 4500, 120, 'https://picsum.photos/id/133/600/400', 4.8);