<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class PeminjamanController extends ResourceController
{
    protected $modelName = 'App\Models\PeminjamanModel';
    protected $format    = 'json';

    public function index()
    {
        $data = $this->model
            ->select('peminjaman.*, anggota.nama as nama_anggota, buku.judul as judul_buku')
            ->join('anggota', 'anggota.id = peminjaman.anggota_id', 'left')
            ->join('buku', 'buku.id = peminjaman.buku_id', 'left')
            ->findAll();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Peminjaman tidak ditemukan');
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        $this->model->insert($data);
        return $this->respondCreated(['message' => 'Peminjaman berhasil ditambahkan']);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        $this->model->update($id, $data);
        return $this->respond(['message' => 'Peminjaman berhasil diupdate']);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);
        return $this->respondDeleted(['message' => 'Peminjaman berhasil dihapus']);
    }
}