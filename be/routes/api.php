<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaptopController;

Route::post('recommendation', [LaptopController::class, 'getRecommendation']);
Route::apiResource('laptops', LaptopController::class);