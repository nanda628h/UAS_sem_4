# Lab7Web - Praktikum PHP Framework (CodeIgniter 4)

Tugas ini merupakan bagian dari Praktikum Pemrograman Web 2 yang berfokus pada pengenalan Framework CodeIgniter 4, konsep MVC (Model-View-Controller), dan penggunaan sistem template (Layouting).

## Informasi Mahasiswa
* **Nama:** Muhammad Said Abimanyu
* **NIM:** 312410145
* **Kelas:** I241A
* **Mata Kuliah:** Pemrograman Web 2

---

## Langkah-langkah Praktikum

### 1. Persiapan dan Instalasi
* Mengaktifkan ekstensi PHP yang diperlukan pada `php.ini` (intl, json, mysqlnd, xml).
* Menginstal CodeIgniter 4 melalui Composer atau manual.
* Mengubah nama file `env` menjadi `.env` dan mengatur `CI_ENVIRONMENT = development`.

### 2. Membuat Controller
Membuat Controller baru bernama `Page.php` di folder `app/Controllers/` untuk mengatur navigasi halaman (Home, Artikel, About, dan Kontak).

### 3. Membuat Layout Template
Membagi tampilan menjadi dua bagian utama agar konsisten:
* `app/Views/template/header.php`: Berisi bagian kepala HTML dan navigasi.
* `app/Views/template/footer.php`: Berisi bagian sidebar dan kaki halaman.

### 4. Membuat View Konten
Membuat file view untuk masing-masing halaman yang memanggil template header dan footer:
* `home.php`
* `about.php`
* `contact.php`
* `artikel.php`

### 5. Konfigurasi Routing
Mengatur rute URL di `app/Config/Routes.php` agar mengarah ke Controller `Page`.

### 6. Styling (CSS)
Menambahkan file `style.css` pada folder `public/` dengan tema **Warna Biru** dan tata letak **Full Screen** (Responsive Layout).

---

## Hasil Tampilan (Screenshot)

> **Catatan:** Ganti teks di bawah ini dengan gambar screenshot dari browser Anda.

### Halaman Home
![Halaman Home](screenshot/home.png)

### Halaman About
![Halaman About](screenshot/about.png)

### Halaman Artikel
![Halaman Artikel](screenshot/artikel.png)

### Halaman Kontak
![Halaman Kontak](screenshot/contact.png)

---

## Cara Menjalankan Proyek
1. Clone repository ini.
2. Pastikan PHP dan Composer sudah terinstal.
3. Jalankan perintah berikut di terminal:
   ```bash
   php spark serve