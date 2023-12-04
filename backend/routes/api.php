<?php

use App\Http\Controllers\Api\SolicitudController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\EtapaController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AApiPdfController;

use App\Http\Controllers\Api\PdfController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Controlador Autenticacion.
Route::controller(AuthController::class)->group(function () {
    Route::post("/login", "login");
    Route::post("/checkSession", "checkSession");
});

// Controlador Usuario.
Route::controller(UsuarioController::class)->group(function () {
    Route::get("/usuarios", "index");
    Route::post("/usuario", "store");
});

// Controlador Etapa.
Route::controller(EtapaController::class)->group(function () {
    Route::get("/etapas", "index");
    Route::post("/crearEtapa", "crearEtapa");
    Route::post("/verEtapa", "verEtapa");
    Route::put("/rechazarEtapa", "rechazarEtapa");
    Route::put("/avanzarEtapa", "avanzarEtapa");
    Route::delete("/eliminarEtapa", "eliminarEtapa");

});

Route::group(['prefix' => 'pdf', 'as' => 'pdf.'], function () {
    Route::get('/{filename}', [AApiPdfController::class, 'show'])->name('show');
});
