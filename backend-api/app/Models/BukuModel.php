<?php

namespace App\Models;

use CodeIgniter\Model;

class BukuModel extends Model
{
    protected $table = 'buku';
    protected $allowedFields = ['judul', 'kategori_id', 'penulis_id', 'penerbit', 'stok', 'cover_url'];
}