<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/image/{name}', function ($name) {
    $extensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
    $filePath = null;

    foreach ($extensions as $ext) {
        $path = public_path("image/{$name}.{$ext}");
        if (file_exists($path)) {
            $filePath = $path;
            break;
        }
    }

    if (!$filePath) {
        abort(404, "Image not found");
    }

    $file = file_get_contents($filePath);
    $type = mime_content_type($filePath);

    return response($file, 200)->header('Content-Type', $type);
});
