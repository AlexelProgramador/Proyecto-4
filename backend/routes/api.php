<?php

use App\Http\Controllers\Api\SolicitudController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\EtapaController;
use App\Http\Controllers\Api\BodegaController;
use App\Http\Controllers\Api\BotiquinController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\SolicitudBodegaController;
use App\Http\Controllers\Api\SolicitudBotiquinController;
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

Route::controller(AuthController::class)->group(function () {
    Route::post("/login", "login");
    Route::post("/checkSession", "checkSession");
});

// Controlador Usuario.
Route::controller(UsuarioController::class)->group(function () {
    Route::get("/usuarios", "index");
    Route::post("/usuario", "store");
    Route::put("/usuario/{idUsuario}", "update");
    Route::delete("/usuario/{idUsuario}", "destroy");
    Route::get("/usuario/{id}", "show");
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
// Revisar para usuarios
Route::controller(BodegaController::class)->group(function () {
    Route::get("/bodegas", "index");
    Route::post("/bodega", "store");
    Route::get("/bodega/{id}", "show");
    Route::put("/bodega/{id}", "update");
    Route::delete("/bodega/{id}", "destroy");
    Route::get("/bodega/{id}/pocoProducto", "pocoProductoBodega");
    Route::get("/bodega/{id}/borrar/{idProd}", "elimProd");
});

//Controlador Botiquin.
Route::controller(BotiquinController::class)->group(function () {
    Route::get("/botiquines", "index");
    Route::post("/botiquin", "store");
    Route::get("/botiquin/{id}", "show");
    Route::put("/botiquin/{id}", "update");
    Route::delete("/botiquin/{id}", "destroy");
    Route::get("/botiquin/{id}/pocoProducto", "pocoProductoBotiquin");
});

//Controlador Producto.
Route::controller(ProductoController::class)->group(function () {
    Route::get("/productos", "index");
    Route::post("/producto", "store");
    Route::get("/producto/{id}", "show");
    Route::put("/producto/{id}", "update");
    Route::put("/producto/{id}/desgloce", "updateDesgloce");
    Route::put("/producto/{id}/editDesgloce/{idDes}", "editDesgloce");
    Route::put("/producto/{id}/asignacion", "updateAsignacion");
    Route::delete("/producto/{id}", "destroy");
    Route::get("/productos/sinInventario", "pocoProducto");
    Route::get("/productos/venciminetoInventario", "vencimientoProducto");
});

Route::controller(SolicitudBodegaController::class)->group(function () {
    Route::get("/solicitudes_bodega", "index");
    Route::get("/solicitudes_bodega/{id}/bodega", "indexBodega");
    Route::get("/solicitudes_bodega/{id}/botiquin", "indexBotiquin");
    Route::post("/solicitud_bodega", "store");
    Route::get("/solicitud_bodega/{id}", "show");
    Route::put("/solicitud_bodega/{id}", "update");
    Route::put("/solicitud_bodega/{id}/aceptar", "aceptarSolicitud");
    Route::put("/solicitud_bodega/{id}/aceptarBotiquin", "aceptarSolicitudBotiquin");
    Route::put("/solicitud_bodega/{id}/rechazar", "rechazarSolicitud");
    Route::put("/solicitud_bodega/{id}/rechazarBotiquin", "rechazarSolicitudBotiquin");
    Route::delete("/solicitud_bodega/{id}", "destroy");
    Route::get("/solicitudes_bodega/contar/{id}", "solicitudPendiente");
    Route::get("/solicitudes_bodega/contarAdmin", "solicitudPendienteAdmin");
    Route::post("/solicitud_bodega/retiro", "retiro");
});

Route::controller(SolicitudBotiquinController::class)->group(function () {
    Route::get("/solicitudes_botiquin", "index");
    Route::post("/solicitud_botiquin", "store");
    Route::get("/solicitud_botiquin/{id}", "show");
    Route::put("/solicitud_botiquin/{id}", "update");
    Route::put("/solicitud_botiquin/{id}/aceptar", "aceptarSolicitud");

});
//-----------------------------------------------------------------