<?php

namespace App\Controllers;

class Page extends BaseController
{
    public function index()
    {
        return view('home', [
            'title' => 'Halaman Home',
            'content' => 'Ini adalah halaman home yang menjelaskan isi situs ini.'
        ]);
    }

    public function artikel()
    {
        return view('artikel', [
            'title' => 'Halaman Artikel',
            'content' => 'Ini adalah halaman artikel. Daftar artikel terbaru akan muncul di sini.'
        ]);
    }

    public function about()
    {
        return view('about', [
            'title' => 'Halaman About',
            'content' => 'Ini adalah halaman tentang kami (About Us).'
        ]);
    }

    public function contact()
    {
        return view('contact', [
            'title' => 'Halaman Kontak',
            'content' => 'Hubungi kami melalui email atau nomor telepon yang tersedia.'
        ]);
    }
}