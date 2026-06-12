<?php

namespace App\Models;

use CodeIgniter\Model;

class AnggotaModel extends Model
{
    protected $table = 'anggota';
    protected $allowedFields = ['nama', 'email', 'no_hp', 'alamat'];
}