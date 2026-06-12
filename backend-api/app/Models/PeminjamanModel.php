<?php

namespace App\Models;

use CodeIgniter\Model;

class PeminjamanModel extends Model
{
    protected $table = 'peminjaman';
    protected $allowedFields = ['anggota_id', 'buku_id', 'tgl_pinjam', 'tgl_kembali', 'status'];
}