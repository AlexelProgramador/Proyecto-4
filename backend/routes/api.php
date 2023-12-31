<?php


use App\Http\Controllers\Api\BodegaController;
use App\Http\Controllers\Api\BotiquinController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\SolicitudBodegaController;
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
//-------------------------- Rutas SSC ----------------------------
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
    Route::post("/crearSolicitud", "store");
    Route::post("/solicitudInfo", "solicitudInfo");
    Route::put("/solicitud/{idUsuario}", "update");
    Route::delete("/solicitud", "destroy");
});

// Controlador Etapa.
Route::controller(EtapaController::class)->group(function () {
    Route::get("/etapas", "index");
    Route::post("/crearEtapa", "crearEtapa");
    Route::post("/verEtapa", "verEtapa");
    Route::put("/avanzarEtapa", "avanzarEtapa");

    Route::put("/etapa/{idUsuario}/{idEtapa}", "update");
    Route::delete("/etapa", "destroy");
});

//-------------------------- Rutas SGI ----------------------------
//Controlador Bodega.
Route::controller(BodegaController::class)->group(function () {
    Route::get("/bodegas", "index");
    Route::post("/bodega", "store");
    Route::get("/bodega/{id}", "show");
    Route::put("/bodega/{id}", "update");
    Route::delete("/bodega/{id}", "destroy");
});

//Controlador Botiquin.
Route::controller(BotiquinController::class)->group(function () {
    Route::get("/botiquines", "index");
    Route::post("/botiquin", "store");
    Route::get("/botiquin/{id}", "show");
    Route::put("/botiquin/{id}", "update");
    Route::delete("/botiquin/{id}", "destroy");
});

//Controlador Producto.
Route::controller(ProductoController::class)->group(function () {
    Route::get("/productos", "index");
    Route::post("/producto", "store");
    Route::get("/producto/{id}", "show");
    Route::put("/producto/{id}", "update");
    Route::put("/producto/{id}/desgloce", "updateDesgloce");
    Route::put("/producto/{id}/asignacion", "updateAsignacion");
    Route::delete("/producto/{id}", "destroy");
});

Route::controller(SolicitudBodegaController::class)->group(function () {
    Route::get("/solicitudes_bodega", "index");
    Route::post("/solicitud_bodega", "store");
    Route::get("/solicitud_bodega/{id}", "show");
    Route::put("/solicitud_bodega/{id}", "update");
    Route::put("/solicitud_bodega/{id}/aceptar", "aceptarSolicitud");
    Route::put("/solicitud_bodega/{id}/rechazar", "rechazarSolicitud");
    Route::delete("/solicitud_bodega/{id}", "destroy");
});
//-----------------------------------------------------------------