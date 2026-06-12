<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class BukuController extends ResourceController
{
    protected $modelName = 'App\Models\BukuModel';
    protected $format    = 'json';

    public function index()
    {
        $data = $this->model
            ->select('buku.*, kategori.nama_kategori, penulis.nama_penulis')
            ->join('kategori', 'kategori.id = buku.kategori_id', 'left')
            ->join('penulis', 'penulis.id = buku.penulis_id', 'left')
            ->findAll();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Buku tidak ditemukan');
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        $this->model->insert($data);
        return $this->respondCreated(['message' => 'Buku berhasil ditambahkan']);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        $this->model->update($id, $data);
        return $this->respond(['message' => 'Buku berhasil diupdate']);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);
        return $this->respondDeleted(['message' => 'Buku berhasil dihapus']);
    }
}