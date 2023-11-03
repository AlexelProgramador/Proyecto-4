<?php

use App\Http\Controllers\Api\SolicitudController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\EtapaController;
use App\Http\Controllers\Api\BodegaController;
use App\Http\Controllers\Api\ProductoController;

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


//-------------------------- Rutas SGI ----------------------------
//Controlador Bodega.
Route::controller(BodegaController::class)->group(function () {
    Route::get("/bodegas", "index");
    Route::post("/bodega", "store");
    Route::get("/bodega/{id}/edit", "edit");
    Route::put("/bodega/{id}/edit", "update");
    Route::delete("/bodega/{id}", "destroy");
});

//Controlador Producto.
Route::controller(ProductoController::class)->group(function () {
    Route::get("/productos", "index");
    Route::post("/producto", "store");
    Route::get("/producto/{id}", "show");
    Route::put("/producto/{id}", "update");
    Route::delete("/producto/{id}", "destroy");
});

//-----------------------------------------------------------------