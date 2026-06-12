<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Handle OPTIONS preflight
$routes->options('(:any)', function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', '*')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
        ->setStatusCode(200);
});

// Public
$routes->post('api/auth/login', 'AuthController::login');
$routes->get('api/summary', 'SummaryController::index');

// Protected (butuh token)
$routes->group('api', ['filter' => 'auth'], function($routes) {
    $routes->post('auth/logout', 'AuthController::logout');
    $routes->resource('buku',       ['controller' => 'BukuController']);
    $routes->resource('kategori',   ['controller' => 'KategoriController']);
    $routes->resource('penulis',    ['controller' => 'PenulisController']);
    $routes->resource('anggota',    ['controller' => 'AnggotaController']);
    $routes->resource('peminjaman', ['controller' => 'PeminjamanController']);
});