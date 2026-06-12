<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// Cari baris ini:
// $routes->get('/', 'Home::index'); 

// Ubah menjadi ini:
$routes->get('/', 'Page::index');
$routes->get('/artikel', 'Page::artikel');
$routes->get('/about', 'Page::about');
$routes->get('/contact', 'Page::contact');