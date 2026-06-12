<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class AuthController extends ResourceController
{
    public function login()
    {
        $model = new UserModel();
        $email = $this->request->getJSON()->email ?? '';
        $password = $this->request->getJSON()->password ?? '';

        $user = $model->where('email', $email)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Email atau password salah');
        }

        $token = bin2hex(random_bytes(32));
        $model->update($user['id'], ['token' => $token]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Login berhasil',
            'token'   => $token,
            'user'    => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']]
        ]);
    }

    public function logout()
    {
        $authHeader = service('request')->getHeaderLine('Authorization');
        $token = substr($authHeader, 7);
        $model = new UserModel();
        $user = $model->where('token', $token)->first();
        if ($user) {
            $model->update($user['id'], ['token' => null]);
        }
        return $this->respond(['status' => 200, 'message' => 'Logout berhasil']);
    }
}