<?php

use App\Http\Controllers\Api\SolicitudController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\EtapaController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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
});

// Controlador Usuario.
Route::controller(UsuarioController::class)->group(function () {
    Route::get("/usuarios", "index");
    Route::post("/usuario", "store");
    Route::put("/usuario/{idUsuario}", "update");
    Route::delete("/usuario/{idUsuario}", "destroy");
});

// Controlador Solicitud.
Route::controller(SolicitudController::class)->group(function () {
    Route::get("/solicitudes", "index");
    Route::post("/solicitud/{idUsuario}", "store");
    Route::put("/solicitud/{idUsuario}", "update");
    Route::delete("/solicitud", "destroy");
});

// Controlador Etapa.
Route::controller(EtapaController::class)->group(function () {
    Route::get("/etapas", "index");
    Route::post("/etapa/{idUsuario}/{nroSolicitud}", "store");
    Route::put("/etapa/{idUsuario}/{idEtapa}", "update");
    Route::delete("/etapa", "destroy");
});
