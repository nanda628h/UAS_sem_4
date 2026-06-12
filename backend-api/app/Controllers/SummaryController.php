<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class SummaryController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $db = \Config\Database::connect();

        $buku       = $db->table('buku')->countAllResults();
        $kategori   = $db->table('kategori')->countAllResults();
        $anggota    = $db->table('anggota')->countAllResults();
        $peminjaman = $db->table('peminjaman')
                        ->where('status', 'dipinjam')
                        ->countAllResults();

        return $this->respond([
            'total_buku'       => $buku,
            'total_kategori'   => $kategori,
            'total_anggota'    => $anggota,
            'peminjaman_aktif' => $peminjaman,
        ]);
    }
}